package com.tangpeng.handle.rolemangement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.service.iface.SecurityService;

public class RoleModifyHandle extends AbstractRestResultHandle {

	private SecurityService securityService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		RoleAddForm bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, RoleAddForm.class);
			String[] opList = bean.getOpList().split(",");
			securityService.modifyRole(Integer.parseInt(bean.getRoleId()), opList);
			resultBean.setDesc("SUCESS");
			resultBean.setResult(ResultBean.SUCCESS);
		}
		catch (Exception e)
		{
			resultBean.setDesc(e.getMessage());
			resultBean.setResult(ResultBean.FAILED);
		}
		return resultBean;
	}

	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}
	
	

}
