package com.product.config;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ConfigService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class SdkConfigListHandle extends AbstractRestListHandle {


	private ConfigService configService;
	
	
	@Override
	public PageBean<SdkConfig> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		SdkConfig condition;
		try 
		{
			condition = this.getCondition(req, SdkConfig.class);
		}
		catch (Exception e) 
		{
			condition = new SdkConfig();
		}
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		
		Pair<List<SdkConfig>,Integer> pair = configService.getSdkConfigList(condition, startRow, endRow);
		PageBean<SdkConfig> page = new PageBean<SdkConfig>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setConfigService(ConfigService configService) {
		this.configService = configService;
	}
	
	

	
}

