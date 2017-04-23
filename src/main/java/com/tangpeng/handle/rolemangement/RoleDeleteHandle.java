package com.tangpeng.handle.rolemangement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tangpeng.bean.ResultBean;
import com.tangpeng.exception.GarageException;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.service.iface.SecurityService;
import com.tangpeng.utils.I18nService;

public class RoleDeleteHandle extends AbstractRestResultHandle {

	private SecurityService securityService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		String roleId = req.getParameter("roleId");
		ResultBean bean = new ResultBean();
		try 
		{
			securityService.deleteRole(Integer.parseInt(roleId));
			bean.setDesc(i18nService.getLabel("common.operation.sucess"));
			bean.setResult(ResultBean.SUCCESS);
		} 
		catch (GarageException e) 
		{
			bean.setDesc(e.getDisplayDesc());
		}
		return bean;
	}

	public void setSecurityService(SecurityService securityService) 
	{
		this.securityService = securityService;
	}

	public void setI18nService(I18nService i18nService) 
	{
		this.i18nService = i18nService;
	}
	
	

}
