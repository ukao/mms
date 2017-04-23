package com.tangpeng.handle.usermangement;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tangpeng.auth.User;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.iface.SecurityService;

public class UserListHandle extends AbstractRestListHandle {
	
	private SecurityService securityService;
	
	
	
	@Override
	public PageBean<User> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		//获取参数
		int startRow = Integer.parseInt(req.getParameter("_startRow"));
		int endRow =  Integer.parseInt(req.getParameter("_endRow"));
		
		Pair<List<User>,Integer>  pair= securityService.getUserList(getCondition(req), startRow, endRow);
		PageBean<User> page = new PageBean<User>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}
	
	protected User getCondition(HttpServletRequest req)
	{
		User user = new User();
		String keyword = req.getParameter("keyword");
		if( keyword == null )
		{
			keyword = req.getParameter("userName");	
		}
		user.setUserName(keyword);
		String roleId = req.getParameter("roleId");
		if( roleId!= null )
		{
			user.setRoleId(Integer.parseInt(roleId));
		}
		String roleIds = req.getParameter("roleIds");
		if( roleIds!= null )
		{
			user.setRoleIds(roleIds);
		}
		return user;
	}

	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

}

