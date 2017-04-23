package com.product.statistic;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.StatisticQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class ActiveStaListHandle extends AbstractRestListHandle {


	private StatisticQueryService statisticQueryService;
	
	
	@Override
	public PageBean<ActiveSta> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		ActiveSta condition = null;
		try 
		{
			condition = this.getCondition(req, ActiveSta.class);
		} 
		catch (Exception e) 
		{
			condition= new ActiveSta();
		}
		Pair<Integer,Integer> row = this.getStartRow(req);
		
		int startRow = row.fst;
		int endRow = row.snd;
		
		Pair<List<ActiveSta>,Integer> pair = statisticQueryService.queryActiveSta(condition, startRow, endRow);
		PageBean<ActiveSta> page = new PageBean<ActiveSta>();
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

