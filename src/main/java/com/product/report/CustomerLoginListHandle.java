package com.product.report;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ReportQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class CustomerLoginListHandle extends AbstractRestListHandle {


	private ReportQueryService reportQueryService;
	
	
	@Override
	public PageBean<CustomerLogin> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		CustomerLogin condition;
		try 
		{
			condition = getCondition(req,CustomerLogin.class);
		} 
		catch (Exception e) 
		{
			condition = new CustomerLogin();
		}
		
		Pair<List<CustomerLogin>,Integer> pair = reportQueryService.queryCustomLoginDetail(condition, startRow, endRow);
		PageBean<CustomerLogin> page = new PageBean<CustomerLogin>();
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

