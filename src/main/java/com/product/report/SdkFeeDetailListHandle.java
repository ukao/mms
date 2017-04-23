package com.product.report;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ReportQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class SdkFeeDetailListHandle extends AbstractRestListHandle {


	private ReportQueryService reportQueryService;
	
	
	@Override
	public PageBean<SdkFeeDetail> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		SdkFeeDetail condition;
		try 
		{
			condition = getCondition(req,SdkFeeDetail.class);
		} 
		catch (Exception e) 
		{
			condition = new SdkFeeDetail();
		}
		
		Pair<List<SdkFeeDetail>,Integer> pair = reportQueryService.querySdkFeeDetail(condition, startRow, endRow);
		PageBean<SdkFeeDetail> page = new PageBean<SdkFeeDetail>();
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

