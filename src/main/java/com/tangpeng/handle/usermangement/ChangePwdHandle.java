package com.tangpeng.handle.usermangement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tangpeng.auth.User;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.service.iface.SecurityService;
import com.tangpeng.utils.I18nService;

public class ChangePwdHandle extends AbstractRestResultHandle {

	private SecurityService securityService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		ResultBean bean = new ResultBean();
		try 
		{
			User oldUser = (User) req.getSession().getAttribute(User.SESSION_ID);
			User fromWeb = this.createBaseBean(req, User.class);
			//查看输入的旧密码是否正确
			if(!oldUser.getPassword().equals(fromWeb.getOld_password()))
			{
				bean.setDesc(i18nService.getLabel("changepwd.password"));
				return bean;
			}
			fromWeb.setUserName(oldUser.getUserName());
			
			securityService.changePwd(fromWeb);
			
			bean.setDesc(i18nService.getLabel("common.operation.sucess"));
			bean.setResult(ResultBean.SUCCESS);
		} 
		catch (Exception e) 
		{
			bean.setDesc(e.getMessage());
		}
		return bean;
	}

	
	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}


	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}
	

}
