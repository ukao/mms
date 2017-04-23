package com.product.report;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ReportQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class ChannelDetailListHandle extends AbstractRestListHandle {


	private ReportQueryService reportQueryService;
	
	
	@Override
	public PageBean<ChannelDetail> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		//获取界面传入的条件
		ChannelDetail condition ;
		try 
		{
			condition = getCondition(req,ChannelDetail.class);
		} 
		catch (Exception e) 
		{
			condition = new ChannelDetail();
		}
		
		
		Pair<List<ChannelDetail>,Integer> pair = reportQueryService.queryChannelDetail(condition, startRow, endRow);
		PageBean<ChannelDetail> page = new PageBean<ChannelDetail>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}

	

	public void setReportQueryService(ReportQueryService reportQueryService) 
	{
		this.reportQueryService = reportQueryService;
	}


	
	
}

