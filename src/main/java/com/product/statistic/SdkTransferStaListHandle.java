package com.product.statistic;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.StatisticQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class SdkTransferStaListHandle extends AbstractRestListHandle {


	private StatisticQueryService statisticQueryService;
	
	
	@Override
	public PageBean<SdkTransferSta> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		SdkTransferSta condition = null;
		try 
		{
			condition = this.getCondition(req, SdkTransferSta.class);
		} 
		catch (Exception e) 
		{
			condition= new SdkTransferSta();
		}
		Pair<Integer,Integer> row = this.getStartRow(req);
		
		int startRow = row.fst;
		int endRow = row.snd;
		
		Pair<List<SdkTransferSta>,Integer> pair = statisticQueryService.querySdkTransferSta(condition, startRow, endRow);
		PageBean<SdkTransferSta> page = new PageBean<SdkTransferSta>();
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

