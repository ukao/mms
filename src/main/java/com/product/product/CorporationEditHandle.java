package com.product.product;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.CorporationService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class CorporationEditHandle extends AbstractRestResultHandle {

	private CorporationService corporationService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		Corporation bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, Corporation.class);
			if(bean.isModify())
			{
				corporationService.modify(bean);
			}
			else if(bean.isDelete() )
			{
				corporationService.delete(bean);
			}
			else
			{
				corporationService.add(bean);
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


	

	public void setCorporationService(CorporationService corporationService) {
		this.corporationService = corporationService;
	}




	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
