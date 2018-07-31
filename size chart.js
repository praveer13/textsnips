$(document).ready(function() {
			
			
			var sizeDataString = $("#sizeGuideData").val();
			
			if(sizeDataString!="" && sizeDataString!= undefined){
				var jsonData = JSON.parse($("#sizeGuideData").val());
					if(jsonData.sizeChart.length >0){
						$(".fnl-pdp-sizetip").each(function(index,data){
												
							
					
							var targetSize= $(this).text().toUpperCase();
							var attrCounter = 0;
							var targetId = $(this).attr('id').split("_")[1];
							var prodDesc ='';
							var spDesc = "";
							var tooltipHeading = "";
							var tooltipFlag = false;
			                var unitAttr = '"';
			                
							$.each(jsonData.sizeChart,function(index,sizeDataObj){
								if(((sizeDataObj.SIZE_NAME).toUpperCase()== targetSize)&&((!sizeDataObj.hasOwnProperty("Show_Tool_Tip"))||(sizeDataObj.hasOwnProperty("Show_Tool_Tip") && sizeDataObj.Show_Tool_Tip.toUpperCase()!="NO"))){
									$.each(jsonData.sizeChart[index],function(indexData,dataVal){
										if(jsonData.sizeChart[index].hasOwnProperty("MEASUREMENT_UNIT")){
			                     		   if(jsonData.sizeChart[index].MEASUREMENT_UNIT == 0){
			                     			   unitAttr ="";
			                     		   }else if(jsonData.sizeChart[index].MEASUREMENT_UNIT == 1){
			                     			   unitAttr = " cm";
			                     		   }
			                     	    }
										if(indexData.toUpperCase().indexOf("_ATTRIBUTE")>=0 && attrCounter<=1){
											attrCounter++;
											prodDesc=prodDesc.concat(indexData.split('_')[0]+'-'+dataVal+unitAttr+'  |  ');
										}
										if(indexData.toUpperCase()=="DESCRIPTION"){
											spDesc = dataVal.toLowerCase();
										}
										if(indexData.toUpperCase() == "TOOLTIP_TITLE"){
		                              	   	 tooltipFlag = true;
		                                     tooltipHeading = dataVal+"&nbsp;("+targetSize+")";
		                                 }
		                                 else if(indexData.toUpperCase()=="MEASUREMENT_TYPE" && tooltipFlag == false){
											tooltipHeading = dataVal+"&nbsp;("+targetSize+")";
										}
									});
								//	$("#abc_"+targetId).popover();
									prodDesc=prodDesc.substring(0,prodDesc.lastIndexOf("|"));
									$("#abc_"+targetId).attr("data-content","<div class='fnl-sizeguide-popover'><div class='fnl-tooltipheading'>"+tooltipHeading+"</div><div class='fnl-pdp-popoverCont'>"+prodDesc+"</div><div class='fnl-pdp-popoverInfo'>"+spDesc+"</div></div><div class='fnl-pdp-sizepopover fnl-popupclose'></div><div class='clearfix'></div>");
								//	$(".pdp-sizedetial").html("<span class='fnl-pdp-sizetype'>"+tooltipHeading+": </span><span class='fnl-pdp-sizeCont'>"+prodDesc+"</span>");
									return;
								}
							
								
							});		
						});
							
				$(".fnl-pdp-sizeAlign,.sizeChartPopup_2").removeClass("hide");
				var jsonData = JSON.parse($("#sizeGuideData").val())
			var fittingFlag = false;
			var headerColumnString= '';	var headerIntlConvCol="";	var headerBrandCompCol="";
			
			var columnString=""; var intlConvCol=""; var brandCompCol="";var bch_NotCreated = true; var bch_Started = false;

				if(jsonData.sizeChart[0] != undefined && jsonData.sizeChart[0].SPECIAL_DESC != "" && jsonData.sizeChart[0].SPECIAL_DESC != undefined){
					$(".fnl-brickDesc").append(jsonData.sizeChart[0].SPECIAL_DESC).removeClass('hide');
					}
				if(jsonData.sizeChart[0] != undefined && jsonData.sizeChart[0].TIPS != "" && jsonData.sizeChart[0].TIPS != undefined){
				$(".fnl-brickTipz").append(jsonData.sizeChart[0].TIPS).removeClass('hide');
				}
				
				if(jsonData.sizeChart[0] != undefined && jsonData.sizeChart[0].hasOwnProperty("MEASUREMENT_TYPE")){
					$("#measurements_type").prepend(jsonData.sizeChart[0].MEASUREMENT_TYPE);
				}
				if(jsonData.sizeChart[0]!=undefined && jsonData.sizeChart[0].hasOwnProperty("MEASUREMENT_TYPE") && jsonData.sizeChart[0].MEASUREMENT_TYPE.split(" ")[0].toUpperCase()=="FOOT"){
					$("#measurements_type .sizeChartMeasureUnit").text("cm")
				}
				if(jsonData.sizeChart[0]!=undefined && jsonData.sizeChart[0].hasOwnProperty("FITTING_TYPE")){
					 fittingFlag = true;
					$("#measurements_type .sizeChartFitType").prepend("&nbsp;"+jsonData.sizeChart[0].FITTING_TYPE+"&nbsp;|&nbsp;")
				}

				if(jsonData.sizeChart[0] != undefined && jsonData.sizeChart[0].hasOwnProperty("HOW_TO_MEASURE_IMAGEURL_1")){
					$(".fnl-sizechart-sizechart-htm").attr("src",jsonData.sizeChart[0].HOW_TO_MEASURE_IMAGEURL_1);
				}
				if(jsonData.sizeChart[0] != undefined && jsonData.sizeChart[0].hasOwnProperty("BRAND_LOGO")){
					$(".fnl-brand-logo").attr("src",jsonData.sizeChart[0].BRAND_LOGO);
				}
				else if (jsonData.sizeChart[0] != undefined && jsonData.sizeChart[0].hasOwnProperty("BRAND_NAME") && jsonData.sizeChart[0].BRAND_NAME!=""){
					$(".fnl-brand-logo").replaceWith("<div class='fnl-sizechart-brandname'>"+jsonData.sizeChart[0].BRAND_NAME+"</div>")
				}
				if(jsonData.sizeChart[0]!=undefined && jsonData.sizeChart[0].hasOwnProperty("MEASUREMENT_UNIT")){                        
                    if(jsonData.sizeChart[0].MEASUREMENT_UNIT == 0){
                   	 if(fittingFlag == false){
                   		 $("#measurements_type span").text("");
                   	 }else{
                   		 $("#measurements_type .sizeChartMeasureUnit").text("");
                   	 }
                   	
            		}else if(jsonData.sizeChart[0].MEASUREMENT_UNIT == 1){
            			 $("#measurements_type .sizeChartMeasureUnit").text("cm");
            		}
                }
				$.each(jsonData.sizeChart,function(index,dataObj){
					var headerRowString = '';
					var rowString="";
					
					var headerIntlConvRow = '';
					var intlConvRow="";
					
					var headerBrandCompRow = '';
					var brandCompRow="";
					
					var columnCount = "0";
					
					
						headerColumnString="<tr>";headerIntlConvCol="<tr>";headerBrandCompCol="<tr>";
						intlConvCol="<tr>";columnString="<tr>";brandCompCol="<tr>";
						
						$.each(jsonData.sizeChart[index],function(jsonKey,jsonVal){
							
							
							if(index==0){
								if(columnCount==0){	
									if(jsonData.sizeChart[index].hasOwnProperty("Size_HEADER")){
										headerRowString="<th>"+jsonData.sizeChart[index].Size_HEADER+"</th>";
										
										if(!isNaN(jsonData.sizeChart[index].SIZE_NAME)){
											var conversionVal = Math.round((jsonData.sizeChart[index].SIZE_NAME)*3.937)/10;
											rowString ="<td data-conversion='"+conversionVal+"'>"+jsonData.sizeChart[index].SIZE_NAME+"</td>";
										}
										else{
											rowString ="<td>"+jsonData.sizeChart[index].SIZE_NAME+"</td>";
										}
									}
									if(jsonData.sizeChart[index].hasOwnProperty("AJIO_COUNTRY")){
										headerIntlConvRow="<th>AJIO</th>";
										intlConvRow ="<td>"+jsonData.sizeChart[index].AJIO_COUNTRY+"</td>"	
									}
									columnCount++;
								}
								else if(columnCount>0){
									if (jsonKey.toUpperCase().indexOf("_ATTRIBUTE")>=0){
										headerRowString=headerRowString.concat("<th>"+jsonKey.split("_")[0]+"</th>");
										if(!isNaN(jsonVal)){
											var conversionVal = Math.round((jsonVal)*3.937)/10;
											rowString =rowString.concat("<td data-conversion='"+conversionVal+"'>"+jsonVal+"</td>");
										}
										else{
											rowString =rowString.concat("<td>"+jsonVal+"</td>");
										}
										
									}
									if (jsonKey.toUpperCase().indexOf("_COUNTRY")>=0 && jsonKey.toUpperCase()!="AJIO_COUNTRY" && jsonKey.toUpperCase()!="DEFAULT_OTHER_COUNTRY_COMPARISON"){
										headerIntlConvRow=headerIntlConvRow.concat("<th>"+jsonKey.split("_")[0]+"</th>");
										intlConvRow =intlConvRow.concat("<td>"+jsonVal+"</td>");
									}
								}
							}
							else{
								
								if(columnCount==0){	
									if(jsonData.sizeChart[index].hasOwnProperty("Size_HEADER")){
										if(!isNaN(jsonData.sizeChart[index].SIZE_NAME)){
											var conversionVal = Math.round((jsonData.sizeChart[index].SIZE_NAME)*3.937)/10;
											rowString ="<td data-conversion='"+conversionVal+"'>"+jsonData.sizeChart[index].SIZE_NAME+"</td>";
										}
										else{
											rowString ="<td>"+jsonData.sizeChart[index].SIZE_NAME+"</td>";
										}
									}
									if(jsonData.sizeChart[index].hasOwnProperty("AJIO_COUNTRY")){
										intlConvRow ="<td>"+jsonData.sizeChart[index].AJIO_COUNTRY+"</td>"	
									}
									columnCount++;
								}
								else if(columnCount>0){
									if (jsonKey.toUpperCase().indexOf("_ATTRIBUTE")>=0){
										if(!isNaN(jsonVal)){
											var conversionVal = Math.round((jsonVal)*3.937)/10;
											rowString =rowString.concat("<td data-conversion='"+conversionVal+"'>"+jsonVal+"</td>");
										}
										else{
											rowString =rowString.concat("<td>"+jsonVal+"</td>");
										}
									}
									if (jsonKey.toUpperCase().indexOf("_COUNTRY")>=0 && jsonKey.toUpperCase()!="AJIO_COUNTRY" && jsonKey.toUpperCase()!="DEFAULT_OTHER_COUNTRY_COMPARISON"){
										intlConvRow =intlConvRow.concat("<td>"+jsonVal+"</td>");
									}
								}
							}
								
							//BrandSizeComaparision
							if (jsonKey.toUpperCase().indexOf("_BRAND")>=0 &&  jsonData.sizeChart[index].GENDER.split("")[0].toUpperCase()=="M" ){
								if(bch_NotCreated){
									headerBrandCompRow=headerBrandCompRow.concat("<th>"+jsonKey.split("_")[0]+"</th>");
									bch_Started = true;
								}
								brandCompRow =brandCompRow.concat("<td>"+jsonVal+"</td>");
							}
						});
						
						if(bch_Started){
							bch_NotCreated=false;
						}
						
						if(index==0){
							headerColumnString=headerColumnString.concat(headerRowString+"</tr>");
							columnString = columnString.concat(rowString+"</tr>");
							
							headerIntlConvCol=headerIntlConvCol.concat(headerIntlConvRow+"</tr>");
							intlConvCol = intlConvCol.concat(intlConvRow+"</tr>");
							
							$(".sizeChart1 #table1").append(headerColumnString).append(columnString);
							$(".sizeChart1 #table2").append(headerIntlConvCol).append(intlConvCol);
							
							if(bch_Started){
							headerBrandCompCol=headerBrandCompCol.concat(headerBrandCompRow+"</tr>");
							brandCompCol = brandCompCol.concat(brandCompRow+"</tr>");
								if(headerBrandCompRow!=""){
									$(".sizeChart1 #table3").append(headerBrandCompCol);
								}
								if(brandCompRow!=""){
									$(".sizeChart1 #table3").append(brandCompCol);
								}
								
							}
						}
						else{
							columnString = columnString.concat(rowString+"</tr>");
							intlConvCol = intlConvCol.concat(intlConvRow+"</tr>");
													
							$(".sizeChart1 #table1").append(columnString);
							$(".sizeChart1 #table2").append(intlConvCol);
							
							if(bch_Started){
							headerBrandCompCol=headerBrandCompCol.concat(headerBrandCompRow+"</tr>");	
							brandCompCol = brandCompCol.concat(brandCompRow+"</tr>");
								if(headerBrandCompRow!=""){
									$(".sizeChart1 #table3").append(headerBrandCompCol);
									$("#brandCompTitle").removeClass("hide");
								}
								if(brandCompRow!=""){
									$(".sizeChart1 #table3").append(brandCompCol);
									$("#brandCompTitle").removeClass("hide");
								}
							}

						}
		
					
						
				});
					if($("#table2").find("tr:first").is(":empty")){$(".fnl-popup-sizeguidechartpanel").find("a[href='#tb2']").parents("li").addClass("hide");}
				}
				else{
					if($(document).find("div").hasClass("sizeChartPopup_1")){
					$(".sizeChartPopup_1,.fnl-pdp-sizeAlign").removeClass("hide");
					}
				
				}
			}
			else{
				if($(document).find("div").hasClass("sizeChartPopup_1")){
					$(".sizeChartPopup_1,.fnl-pdp-sizeAlign").removeClass("hide");
					}
				}
		
			$(document).on("click",".fnl-pdp-sizepopover",function(e){
				$(".popover").popover("hide");
				e.stopImmediatePropagation();
				
			});	
		
			$(window).scroll(function(){
				$(".popover").popover("hide");
			});
			
		});
