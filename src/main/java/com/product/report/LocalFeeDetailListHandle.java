package com.product.report;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ReportQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class LocalFeeDetailListHandle extends AbstractRestListHandle {


	private ReportQueryService reportQueryService;
	
	
	@Override
	public PageBean<LocalFeeDetail> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;

		LocalFeeDetail condition;
		try 
		{
			condition = getCondition(req,LocalFeeDetail.class);
		} 
		catch (Exception e) 
		{
			condition = new LocalFeeDetail();
		}
		
		Pair<List<LocalFeeDetail>,Integer> pair = reportQueryService.queryLocalFeeDetail(condition, startRow, endRow);
		PageBean<LocalFeeDetail> page = new PageBean<LocalFeeDetail>();
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

