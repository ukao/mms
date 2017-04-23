package com.product.report;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ReportQueryService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class CustomerInfoListHandle extends AbstractRestListHandle {


	private ReportQueryService reportQueryService;
	
	
	@Override
	public PageBean<CustomerInfo> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		CustomerInfo condition ;
		try 
		{
			condition = getCondition(req,CustomerInfo.class);
		} 
		catch (Exception e) 
		{
			condition = new CustomerInfo();
		}
		
		
		Pair<List<CustomerInfo>,Integer> pair = reportQueryService.queryCustomInfoDetail(condition, startRow, endRow);
		ExtPageBean page = new ExtPageBean(reportQueryService.getAllActivedCustomer());
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
	

	
	private class ExtPageBean extends PageBean<CustomerInfo>
	{
		private int totalCustomer = 0;
		
		public ExtPageBean(int totalCustomer)
		{
			this.totalCustomer = totalCustomer;
		}
		
		@Override
		protected String getExtJson() {
			return "totalCustomerCount:"+totalCustomer+",";
		}
	}
	
}

