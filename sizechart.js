$( document ).ready(function() {
	response='{"brickCode":"830316016","errorDesc":"","sizeChart":[{"MEASUREMENT_TYPE":"Body measurements","AUS_COUNTRY":"6","IN_COUNTRY":"XS","BRICK_NAME":"Shirts","HOW_TO_MEASURE_IMAGEURL_1":"/sizeguide/Topwear.jpg","PRIORITY":"1","BRICK_CODE":"830316016","UK_COUNTRY":"6","TOOLTIP_TITLE":"Garment Measurement","US_COUNTRY":"2 ","EU_COUNTRY":"34","Waist_attribute":"24","BRAND_CODE":"FIG","BRAND_NAME":"Fig","BRAND_LOGO":"/_ui/brand-logo/rio.jpg","Bust_attribute":"32","GENDER":"Women","MEASUREMENT_UNIT":"0","Size_HEADER":"Size","APPLICATION_NAME":"RILFNL-AJIO","SIZE_NAME":"XS","DEFAULT_OTHER_COUNTRY_COMPARISON":"Yes","TIPS":"If you dont find an exact match, go for the next large size"},{"MEASUREMENT_TYPE":"Body measurements","AUS_COUNTRY":"8","IN_COUNTRY":"S","BRICK_NAME":"Shirts","HOW_TO_MEASURE_IMAGEURL_1":"/sizeguide/Topwear.jpg","PRIORITY":"2","BRICK_CODE":"830316016","UK_COUNTRY":"8","TOOLTIP_TITLE":"Garment Measurement","US_COUNTRY":"4 ","EU_COUNTRY":"36","Waist_attribute":"26","BRAND_CODE":"FIG","BRAND_NAME":"Fig","BRAND_LOGO":"/_ui/brand-logo/rio.jpg","Bust_attribute":"34","GENDER":"Women","MEASUREMENT_UNIT":"0","Size_HEADER":"Size","APPLICATION_NAME":"RILFNL-AJIO","SIZE_NAME":"S","DEFAULT_OTHER_COUNTRY_COMPARISON":"Yes","TIPS":"If you dont find an exact match, go for the next large size"},{"MEASUREMENT_TYPE":"Body measurements","AUS_COUNTRY":"10","IN_COUNTRY":"M","BRICK_NAME":"Shirts","HOW_TO_MEASURE_IMAGEURL_1":"/sizeguide/Topwear.jpg","PRIORITY":"3","BRICK_CODE":"830316016","UK_COUNTRY":"10","TOOLTIP_TITLE":"Garment Measurement","US_COUNTRY":"6 ","EU_COUNTRY":"38","Waist_attribute":"28","BRAND_CODE":"FIG","BRAND_NAME":"Fig","BRAND_LOGO":"/_ui/brand-logo/rio.jpg","Bust_attribute":"36","GENDER":"Women","MEASUREMENT_UNIT":"0","Size_HEADER":"Size","APPLICATION_NAME":"RILFNL-AJIO","SIZE_NAME":"M","DEFAULT_OTHER_COUNTRY_COMPARISON":"Yes","TIPS":"If you dont find an exact match, go for the next large size"},{"MEASUREMENT_TYPE":"Body measurements","AUS_COUNTRY":"12","IN_COUNTRY":"L","BRICK_NAME":"Shirts","HOW_TO_MEASURE_IMAGEURL_1":"/sizeguide/Topwear.jpg","PRIORITY":"4","BRICK_CODE":"830316016","UK_COUNTRY":"12","TOOLTIP_TITLE":"Garment Measurement","US_COUNTRY":"8 ","EU_COUNTRY":"40","Waist_attribute":"30","BRAND_CODE":"FIG","BRAND_NAME":"Fig","BRAND_LOGO":"/_ui/brand-logo/rio.jpg","Bust_attribute":"38","GENDER":"Women","MEASUREMENT_UNIT":"0","Size_HEADER":"Size","APPLICATION_NAME":"RILFNL-AJIO","SIZE_NAME":"L","DEFAULT_OTHER_COUNTRY_COMPARISON":"Yes","TIPS":"If you dont find an exact match, go for the next large size"},{"MEASUREMENT_TYPE":"Body measurements","AUS_COUNTRY":"14","IN_COUNTRY":"XL","BRICK_NAME":"Shirts","HOW_TO_MEASURE_IMAGEURL_1":"/sizeguide/Topwear.jpg","PRIORITY":"5","BRICK_CODE":"830316016","UK_COUNTRY":"14","TOOLTIP_TITLE":"Garment Measurement","US_COUNTRY":"10","EU_COUNTRY":"42","Waist_attribute":"32","BRAND_CODE":"FIG","BRAND_NAME":"Fig","BRAND_LOGO":"/_ui/brand-logo/rio.jpg","Bust_attribute":"40","GENDER":"Women","MEASUREMENT_UNIT":"0","Size_HEADER":"Size","APPLICATION_NAME":"RILFNL-AJIO","SIZE_NAME":"XL","DEFAULT_OTHER_COUNTRY_COMPARISON":"Yes","TIPS":"If you dont find an exact match, go for the next large size"},{"MEASUREMENT_TYPE":"Body measurements","AUS_COUNTRY":"16","IN_COUNTRY":"2XL","BRICK_NAME":"Shirts","HOW_TO_MEASURE_IMAGEURL_1":"/sizeguide/Topwear.jpg","PRIORITY":"6","BRICK_CODE":"830316016","UK_COUNTRY":"16","TOOLTIP_TITLE":"Garment Measurement","US_COUNTRY":"12","EU_COUNTRY":"44","Waist_attribute":"34","BRAND_CODE":"FIG","BRAND_NAME":"Fig","BRAND_LOGO":"/_ui/brand-logo/rio.jpg","Bust_attribute":"43","GENDER":"Women","MEASUREMENT_UNIT":"0","Size_HEADER":"Size","APPLICATION_NAME":"RILFNL-AJIO","SIZE_NAME":"2XL","DEFAULT_OTHER_COUNTRY_COMPARISON":"Yes","TIPS":"If you dont find an exact match, go for the next large size"}],"errorList":[],"fittingType":"","message":"GET_SIZE_CHART_SUCCESS","map":null,"applicationName":"RILFNL-AJIO","brandCode":"FIG","vendorCode":""}';
	var data = JSON.parse(response);
	console.log(data);
	var table = $("<table />");
	$("#sizecharttable").append(table);
	table.addClass("ui celled padded table");
	var tablehead = $("<thead/>");
	var tablebody = $("<tbody/>");
	var headrow = $("<tr/>");
	table.append(tablehead);
	table.append(tablebody);
	tablehead.append(headrow);
	var headerArray = [];

	$.each(data.sizeChart, function(index,sc){
		var currbodyrow = $("<tr/>");
		tablebody.append(currbodyrow);
		if(index == 0){		
			if(sc.hasOwnProperty("Size_HEADER")){
				headerArray.push("SIZE_NAME");
			}
			Object.keys(sc).forEach(
				function(e){
					if(e.toUpperCase().indexOf("_ATTRIBUTE")>=0){
					headerArray.push(e);
				}}
			);
		}
		headerArray.forEach(function(header,ind){
			if(index == 0){
				headrow.append($("<th/>").text(header.split("_")[0]));
			}
			currbodyrow.append($("<td/>").text(sc[header]));

		});

	});
});