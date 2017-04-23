package com.product.Manufacturer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.SdkService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class SdkEditHandle extends AbstractRestResultHandle {

	private SdkService sdkService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		Sdk bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, Sdk.class);
			if(bean.isModify())
			{
				sdkService.modify(bean);
			}
			else if(bean.isDelete() )
			{
				//先删除数据库成功后再删除文件
				sdkService.delete(bean);
			}
			else
			{
				sdkService.add(bean);
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


	
	public void setSdkService(SdkService sdkService) {
		this.sdkService = sdkService;
	}



	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
