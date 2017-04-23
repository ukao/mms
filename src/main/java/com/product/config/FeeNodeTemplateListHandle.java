package com.product.config;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ConfigService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class FeeNodeTemplateListHandle extends AbstractRestListHandle {


	private ConfigService configService;
	
	
	@Override
	public PageBean<FeeNode> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		FeeNode condition;
		try 
		{
			condition = this.getCondition(req, FeeNode.class);
		}
		catch (Exception e) 
		{
			condition = new FeeNode();
		}
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		
		Pair<List<FeeNode>,Integer> pair = configService.getFeeNodeTemplateList(condition, startRow, endRow);
		PageBean<FeeNode> page = new PageBean<FeeNode>();
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

