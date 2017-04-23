package com.product.config;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ConfigService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class ProductConfigListHandle extends AbstractRestListHandle {


	private ConfigService configService;
	
	
	@Override
	public PageBean<ProductConfig> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		ProductConfig condition;
		try 
		{
			condition = this.getCondition(req, ProductConfig.class);
		}
		catch (Exception e) 
		{
			condition = new ProductConfig();
		}
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		
		Pair<List<ProductConfig>,Integer> pair = configService.getProductConfigList(condition, startRow, endRow);
		PageBean<ProductConfig> page = new PageBean<ProductConfig>();
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

