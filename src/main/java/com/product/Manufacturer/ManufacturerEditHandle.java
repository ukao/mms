package com.product.Manufacturer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ManufacturerService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class ManufacturerEditHandle extends AbstractRestResultHandle {

	private ManufacturerService manufacturerService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		Manufacturer bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, Manufacturer.class);
			if(bean.isModify())
			{
				manufacturerService.modify(bean);
			}
			else if(bean.isDelete() )
			{
				manufacturerService.delete(bean);
			}
			else
			{
				manufacturerService.add(bean);
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

	public void setManufacturerService(ManufacturerService manufacturerService) {
		this.manufacturerService = manufacturerService;
	}

	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
