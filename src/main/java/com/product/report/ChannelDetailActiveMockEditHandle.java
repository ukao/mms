package com.product.report;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ReportQueryService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class ChannelDetailActiveMockEditHandle extends AbstractRestResultHandle {

	private ReportQueryService reportQueryService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		ChannelDetail bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, ChannelDetail.class);
			if(bean.isModify())
			{
				reportQueryService.modifyChannelDetailActiveMock(bean);
			}
			else if(bean.isDelete() )
			{
				reportQueryService.deleteChannelDetailActiveMock(bean);
			}
			else
			{
				reportQueryService.addChannelDetailActiveMock(bean);
			}
				
			resultBean.setDesc(i18nService.getLabel("common.operation.sucess"));
			resultBean.setResult(ResultBean.SUCCESS);
		}
		catch (Exception e)
		{
			resultBean.setDesc(i18nService.getLabel("common.operation.failed")
					+"\\n"+e.getMessage());
		}
		return resultBean;
	}



	public void setReportQueryService(ReportQueryService reportQueryService) {
		this.reportQueryService = reportQueryService;
	}



	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
