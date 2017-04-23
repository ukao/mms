package com.product.product;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ChannelService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class ChannelEditHandle extends AbstractRestResultHandle {

	private ChannelService channelService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		Channel bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, Channel.class);
			if(bean.isModify())
			{
				channelService.modify(bean);
			}
			else if(bean.isDelete() )
			{
				channelService.delete(bean);
			}
			else
			{
				channelService.add(bean);
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


	public void setChannelService(ChannelService channelService) {
		this.channelService = channelService;
	}

	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
