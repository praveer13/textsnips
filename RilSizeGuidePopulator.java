/**
 *
 */
package com.ril.fnl.facades.populators;

import de.hybris.platform.category.model.CategoryModel;
import de.hybris.platform.commercefacades.product.data.ProductData;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.core.model.product.ProductModel;
import de.hybris.platform.servicelayer.config.ConfigurationService;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;
import de.hybris.platform.util.Config;


import org.json.JSONArray;
	
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.ril.fnl.classification.service.RilFnlStyleTypeService;
import com.ril.fnl.core.model.FnlColorVariantModel;
import com.ril.fnl.core.model.FnlProductModel;
import com.ril.fnl.core.model.FnlSizeVariantModel;
import com.ril.fnl.facades.product.data.FnlColorVariantData;


/**
 * @author Ravi.Gaur
 *
 */
public class RilSizeGuidePopulator implements Populator<ProductModel, ProductData>
{
	private static final Logger LOG = Logger.getLogger(RilSizeGuidePopulator.class);
	@Autowired
	private ConfigurationService configurationService;
	private static final String LEVEL3 = "3";

	private static final String BRICK_CODE_JEANS = "830216001";
	private static final String BRICK_STYLE_TYPE = "brickstyletype";
	private static final String BRICK_FIT_TYPE = "brickfittype";
	private static final String BRICK_FIT = "brickfit";

	@Autowired
	RilFnlStyleTypeService defaultRilFnlStyleTypeService;

	/*
	 * (non-Javadoc)
	 * 
	 * @see de.hybris.platform.converters.Populator#populate(java.lang.Object, java.lang.Object)
	 */
	@SuppressWarnings("deprecation")
	@Override
	public void populate(final ProductModel source, final ProductData target) throws ConversionException
	{
		String brandCode = null;
		String brickCode = null;
		ProductModel fnlColorVariantModel1 = source;
		if (fnlColorVariantModel1 instanceof FnlSizeVariantModel)
		{
			fnlColorVariantModel1 = ((FnlSizeVariantModel) fnlColorVariantModel1).getBaseProduct();
		}

		final Collection<CategoryModel> supercategories = fnlColorVariantModel1.getSupercategories();
		final String sizeGuideUrlMustRequired = Config.getParameter("rilfnl.sizeGuideUrl.mustRequired") != null ? Config
				.getParameter("rilfnl.sizeGuideUrl.mustRequired") : "false";
		boolean isSizeGuideDesktopPopulated = false;
		final FnlColorVariantData colorVariantdata = target.getFnlColorVariantData();
		//TODO null check and other things
		if (colorVariantdata != null && source instanceof FnlColorVariantModel)
		{
			final List<CategoryModel> categoryList = new ArrayList(supercategories);
			if (categoryList.size() > 0 && !categoryList.isEmpty())
			{

				for (final CategoryModel cat : categoryList)
				{
					if (cat.getLevel().equals(LEVEL3))
					{
						if ((null != cat.getIsMerchCategory()) && (cat.getIsMerchCategory().booleanValue()))
						{
							brickCode = cat.getCode();
						}
					}
					if ((cat.getIsBrand() != null) && (cat.getIsBrand().booleanValue()))
					{
						brandCode = cat.getCode();
					}

				}
			}


			if (!StringUtils.isEmpty(brandCode) && !StringUtils.isEmpty(brickCode))
			{
				String sizeGuideUrl = null;
				FnlColorVariantModel fnlColorVariantModel = (FnlColorVariantModel) source;
				try
				{
					if (Config.getParameter("rilfnl.sizeGuideDesktop.enabled") != null
							&& Config.getParameter("rilfnl.sizeGuideDesktop.enabled").equals("true"))
					{
						final String baseUrl = configurationService.getConfiguration().getString("rilfnl.sizeGuideDesktop.baseUrl");
						String sizeChartUrl = null;
						String sizeGuide = null;
						String vendorCode = " ";
						String fitStyleType = " ";
						if (brickCode.equals(BRICK_CODE_JEANS))
						{
							final String styleData = defaultRilFnlStyleTypeService.getFitStyleType(
									fnlColorVariantModel.getBaseProduct(), BRICK_STYLE_TYPE);
							if (!StringUtils.isEmpty(styleData))
							{
								fitStyleType = styleData;
							}
						}
						else
						{
							final String fitData = defaultRilFnlStyleTypeService.getFitStyleType(fnlColorVariantModel.getBaseProduct(),
									BRICK_FIT);
							if (!StringUtils.isEmpty(fitData))
							{
								fitStyleType = fitData;
							}
							else
							{
								final String fitTypeData = defaultRilFnlStyleTypeService.getFitStyleType(
										fnlColorVariantModel.getBaseProduct(), BRICK_FIT_TYPE);
								if (!StringUtils.isEmpty(fitTypeData))
								{
									fitStyleType = fitTypeData;
								}
							}
						}
						if (fnlColorVariantModel instanceof FnlSizeVariantModel)
						{
							final FnlSizeVariantModel fnlSizeVariantModel = (FnlSizeVariantModel) fnlColorVariantModel;
							fnlColorVariantModel = (FnlColorVariantModel) fnlSizeVariantModel.getBaseProduct();
						}
						if (((FnlProductModel) fnlColorVariantModel.getBaseProduct()).getSizeGuideVendorCode() != null)
						{
							vendorCode = ((FnlProductModel) fnlColorVariantModel.getBaseProduct()).getSizeGuideVendorCode();
						}
						sizeChartUrl = Config.getParameter("rilfnl.sizeGuideDesktop.path")
								+ configurationService.getConfiguration().getString("rilfnl.sizeGuideDesktop.applicationName")
								+ URLEncoder.encode(brickCode, "UTF-8").replaceAll("\\+", "%20") + "/"
								+ URLEncoder.encode(brandCode, "UTF-8").replaceAll("\\+", "%20") + "/"
								+ URLEncoder.encode(vendorCode, "UTF-8").replaceAll("\\+", "%20") + "/"
								+ URLEncoder.encode(fitStyleType, "UTF-8").replaceAll("\\+", "%20") + "/";
						LOG.debug("Url for Desktop size guide is : " + baseUrl + sizeChartUrl);
						final URL url = new URL(baseUrl + sizeChartUrl);
						final HttpURLConnection huc = (HttpURLConnection) url.openConnection();
						huc.setReadTimeout(configurationService.getConfiguration().getInt("Creditnote.readTimeout.millis"));
						huc.setConnectTimeout(configurationService.getConfiguration().getInt("Creditnote.connectionTimeout.millis"));
						final BufferedReader br = new BufferedReader(new InputStreamReader((huc.getInputStream())));
						String output;
						while ((output = br.readLine()) != null)
						{
							if (sizeGuide != null)
							{
								sizeGuide = sizeGuide + output;
							}
							else
							{
								sizeGuide = output;
							}
						}
						if (sizeGuide != null)
						{
							try
							{
								final JSONObject jsonObj = new JSONObject(sizeGuide);
								final JSONArray sizeChartArr = (JSONArray) jsonObj.get("sizeChart");
								final JSONArray sizeToolTipArr = new JSONArray();
								List<String> keyAttribute = null;
								if (sizeChartArr.length() > 0)
								{
									isSizeGuideDesktopPopulated = true;
								}
								for (int i = 0; i < sizeChartArr.length(); i++)
								{
									final JSONObject jsonobject = sizeChartArr.getJSONObject(i);
									final String measurementType = jsonobject.has("MEASUREMENT_TYPE") ? jsonobject
											.getString("MEASUREMENT_TYPE") : "";
									final String sizeName = jsonobject.has("SIZE_NAME") ? jsonobject.getString("SIZE_NAME") : "";
									final String gender = jsonobject.has("GENDER") ? jsonobject.getString("GENDER") : "";
									final LinkedHashMap<String, String> jsonOrderedMap = new LinkedHashMap<String, String>();

									final JSONObject newJsonObject = new JSONObject(jsonOrderedMap);
									newJsonObject.put("MEASUREMENT_TYPE", measurementType).put("SIZE_NAME", sizeName)
											.put("GENDER", gender);

									if (jsonobject.has("DESCRIPTION"))
									{
										newJsonObject.put("DESCRIPTION", jsonobject.getString("DESCRIPTION"));
									}
									if (jsonobject.has("MEASUREMENT_UNIT"))
									{
										newJsonObject.put("MEASUREMENT_UNIT", jsonobject.getString("MEASUREMENT_UNIT"));
									}
									if (jsonobject.has("TOOLTIP_TITLE"))
									{
										newJsonObject.put("TOOLTIP_TITLE", jsonobject.getString("TOOLTIP_TITLE"));
									}
									if (jsonobject.has("Show_Tool_Tip"))
									{
										newJsonObject.put("Show_Tool_Tip", jsonobject.getString("Show_Tool_Tip"));
									}
									else
									{
										newJsonObject.put("Show_Tool_Tip", "2");
									}
									final Iterator jsonKeys = jsonobject.keys();
									final Map<Integer, String> map = new HashMap<Integer, String>();

									if (keyAttribute == null)
									{
										keyAttribute = new ArrayList<String>();

										while (jsonKeys.hasNext())
										{
											final String key = (String) jsonKeys.next();
											if (key.endsWith("_attribute"))
											{

												map.put(sizeGuide.indexOf(key), key);
											}
										}
										if (!map.isEmpty())
										{
											final Set<Integer> set = map.keySet();
											final List<Integer> list = new ArrayList(set);
											Collections.sort(list);
											for (final Integer key : list)
											{
												keyAttribute.add(map.get(key));
											}
										}

										for (final String key : keyAttribute)
										{
											newJsonObject.put(key, jsonobject.getString(key));
										}
									}

									else
									{
										for (final String key : keyAttribute)
										{
											newJsonObject.put(key, jsonobject.getString(key));
										}
									}

									sizeToolTipArr.put(newJsonObject);
								}
								keyAttribute = null;
								final String sizetoolTipString = sizeToolTipArr.toString();
								colorVariantdata.setSizeToolTip(sizetoolTipString);

								if (url != null && sizeChartArr.length() > 0)
								{
									colorVariantdata.setSizeGuideServiceUrl("/sg/app?sizeChartUrl="
											+ URLEncoder.encode(brickCode, "UTF-8").replaceAll("\\+", "%20") + "/"
											+ URLEncoder.encode(brandCode, "UTF-8").replaceAll("\\+", "%20") + "/"
											+ URLEncoder.encode(vendorCode, "UTF-8").replaceAll("\\+", "%20") + "/"
											+ URLEncoder.encode(fitStyleType, "UTF-8").replaceAll("\\+", "%20") + "/");
								}
							}
							catch (final Exception e)
							{
								LOG.error("exception getting while reading size guide json response" + e);
							}
							colorVariantdata.setSizeGuideDesktop(sizeGuide);
						}
					}
					if (!isSizeGuideDesktopPopulated || "true".equals(sizeGuideUrlMustRequired))
					{
						if (fnlColorVariantModel instanceof FnlSizeVariantModel)
						{
							final FnlSizeVariantModel fnlSizeVariantModel = (FnlSizeVariantModel) fnlColorVariantModel;
							fnlColorVariantModel = (FnlColorVariantModel) fnlSizeVariantModel.getBaseProduct();
						}
						sizeGuideUrl = Config.getParameter("sizeGuideUrl.baseUrl")
								+ URLEncoder.encode(brandCode, "UTF-8").replaceAll("\\+", "%20") + "_" + brickCode + ".jpg";
						if (((FnlProductModel) fnlColorVariantModel.getBaseProduct()).getVendorCode() != null)
						{
							sizeGuideUrl = Config.getParameter("sizeGuideUrl.baseUrl")
									+ URLEncoder.encode(brandCode, "UTF-8").replaceAll("\\+", "%20") + "_" + brickCode + "_"
									+ ((FnlProductModel) fnlColorVariantModel.getBaseProduct()).getVendorCode() + ".jpg";
						}
						final boolean sizeGuidePresent = this.getSizeGuide(sizeGuideUrl);
						if (sizeGuidePresent)
						{
							colorVariantdata.setSizeGuideUrl(sizeGuideUrl);
						}
					}
				}
				catch (final UnsupportedEncodingException e)
				{
					LOG.error(e.getMessage());
				}
				catch (final MalformedURLException e)
				{
					LOG.error(e.getMessage());
				}
				catch (final SocketTimeoutException e)
				{
					LOG.error("exception getting size guide details " + e);
				}
				catch (final IOException e)
				{
					LOG.error(e.getMessage());
				}
			}
		}
		target.setFnlColorVariantData(colorVariantdata);
	}

	/**
	 * @return boolean
	 */

	private boolean getSizeGuide(final String sizeGuideUrl)
	{
		String _sizeGuideUrl = null;
		try
		{
			LOG.debug("getSizeGuide method starts: ");
			final String baseUrl = configurationService.getConfiguration().getString("baseUrlForSizeGuide");
			_sizeGuideUrl = baseUrl + sizeGuideUrl;
			LOG.debug("Url for size guide is : " + baseUrl + sizeGuideUrl);
			final URL url = new URL(_sizeGuideUrl);
			final HttpURLConnection huc = (HttpURLConnection) url.openConnection();
			final int responseCode = huc.getResponseCode();
			LOG.debug("response code is : " + responseCode);
			if (responseCode == 200)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		catch (final UnknownHostException uhe)
		{
			LOG.info("UnknownHostException while calling image : " + _sizeGuideUrl + " " + uhe.getMessage());
		}
		catch (final FileNotFoundException fnfe)
		{
			LOG.info("FileNotFoundException while calling image : " + _sizeGuideUrl + " " + fnfe.getMessage());
		}
		catch (final Exception e)
		{
			LOG.info("Exception while calling image : " + _sizeGuideUrl + " " + e.getMessage());
			//LOG.info("Exception while calling " + _sizeGuideUrl);
		}
		return false;


	}
}
