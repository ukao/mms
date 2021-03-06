package com.product.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ConfigService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class FeeNodeStrategyEditHandle extends AbstractRestResultHandle {

	private ConfigService configService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		FeeNode bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, FeeNode.class);
			if(bean.isModify())
			{
				configService.modifyFeeNodeStrategy(bean);
			}
			else if(bean.isDelete() )
			{
				configService.deleteFeeNodeStrategy(bean);
			}
			else
			{
				configService.addFeeNodeStrategy(bean);
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

	
	public void setConfigService(ConfigService configService) {
		this.configService = configService;
	}


	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
