package com.product.statistic;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.StatisticQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class LocalFeeStaListHandle extends AbstractRestListHandle {


	private StatisticQueryService statisticQueryService;
	
	
	@Override
	public PageBean<LocalFeeSta> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		LocalFeeSta condition = null;
		try 
		{
			condition = this.getCondition(req, LocalFeeSta.class);
		} 
		catch (Exception e) 
		{
			condition= new LocalFeeSta();
		}
		Pair<Integer,Integer> row = this.getStartRow(req);
		
		int startRow = row.fst;
		int endRow = row.snd;
		
		Pair<List<LocalFeeSta>,Integer> pair = statisticQueryService.queryLocalFeeSta(condition, startRow, endRow);
		PageBean<LocalFeeSta> page = new PageBean<LocalFeeSta>();
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

