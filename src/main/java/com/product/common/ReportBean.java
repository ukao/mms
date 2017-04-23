package com.product.common;

import org.springframework.util.StringUtils;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

public class ReportBean extends BaseBean {
	

	@JsonField
	private String sta_date;
	@JsonField
	private String month;

	public String getSta_date() {
		return sta_date;
	}
	public void setSta_date(String sta_date) {
		this.sta_date = sta_date;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getBeginDate()
	{
		String[] str;
		if( sta_date != null  )
		{
			str = sta_date.split(";");
			if( str.length != 0 && !StringUtils.isEmpty(str[0]))
			{
				return str[0];
			}
		}
		return null;
	}

	public String getEndDate()
	{
		String[] str;
		if( sta_date != null )
		{
			str = sta_date.split(";");
			if(str.length == 2)
			{
				return str[1];
			}
		}
		return null;
	}
}
