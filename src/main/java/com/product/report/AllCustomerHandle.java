package com.product.report;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ReportQueryService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;

public class AllCustomerHandle extends AbstractRestResultHandle {


	private ReportQueryService reportQueryService;
	
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		ResultBean bean = new ResultBean();
		bean.setResult(ResultBean.SUCCESS);
		bean.setDesc(reportQueryService.getAllActivedCustomer()+"");
		return bean;
	}
	

	public void setReportQueryService(ReportQueryService reportQueryService) 
	{
		this.reportQueryService = reportQueryService;
	}
	

}

