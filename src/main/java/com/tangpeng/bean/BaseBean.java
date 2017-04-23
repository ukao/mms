package com.tangpeng.bean;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jettison.json.JSONString;

import com.tangpeng.utils.RestDataUtils;

/**
 * json格式的基础bean对象
 * @author tangpeng
 *
 */
public class BaseBean implements JSONString{
	
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Override
	public String toJSONString() {
		String str = "";
		try {
			 str = "{"+RestDataUtils.getDeclaredFields(this)+"}";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return str;
	}
	
	/**
	 * 
	 * @param time
	 * @return
	 */
	protected String timeFormat(Timestamp time)
	{
		return sdf.format(new Date(time.getTime()));
	}
}
