package com.product.statistic;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.StatisticQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class SdkFeeStaListHandle extends AbstractRestListHandle {


	private StatisticQueryService statisticQueryService;
	
	
	@Override
	public PageBean<SdkFeeSta> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		SdkFeeSta condition = null;
		try 
		{
			condition = this.getCondition(req, SdkFeeSta.class);
		} 
		catch (Exception e) 
		{
			condition= new SdkFeeSta();
		}
		Pair<Integer,Integer> row = this.getStartRow(req);
		
		int startRow = row.fst;
		int endRow = row.snd;
		
		Pair<List<SdkFeeSta>,Integer> pair = statisticQueryService.querySdkFeeSta(condition, startRow, endRow);
		PageBean<SdkFeeSta> page = new PageBean<SdkFeeSta>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setStatisticQueryService(StatisticQueryService statisticQueryService) 
	{
		this.statisticQueryService = statisticQueryService;
	}


	
	
}

