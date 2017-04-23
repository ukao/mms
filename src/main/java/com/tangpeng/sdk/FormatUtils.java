package com.tangpeng.sdk;

import java.text.DecimalFormat;

import org.springframework.util.StringUtils;

public class FormatUtils 
{
	
	public static DecimalFormat PRICE_FORMAT = new DecimalFormat("0.00");
	
	/**
	 * 
	 * @param num µ¥Î»£º·Ö
	 * @return
	 */
	public static String priceFormat(String num)
	{
		if(StringUtils.isEmpty(num))
		{
			return "";
		}
		
		try
		{
			return PRICE_FORMAT.format(Float.parseFloat(num)/100.0);
		}
		catch(Exception e)
		{
			return "";
		}
	}
	
	public static String priceFormat(int num)
	{
		return PRICE_FORMAT.format(num/100.0);
	}
	
}
