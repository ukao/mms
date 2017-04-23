package com.tangpeng.handle.usermangement;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.auth.Right;
import com.tangpeng.auth.User;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.service.iface.SecurityService;

public class UserMenuTreeHandle extends AbstractRestListHandle {

	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(UserMenuTreeHandle.class);
	
	
	/**
	 * 安全服务
	 */
	private SecurityService securityService;
	
	@Override
	public PageBean<Right> responsePageByJson(HttpServletRequest req, HttpServletResponse resp) {

		
		User user = (User)req.getSession().getAttribute(User.SESSION_ID);
		PageBean<Right> page = new PageBean<Right>();		
		List<Right> menuList = securityService.getMenuTree(user.getRoleId());
		int size = menuList.size();
		page.setData(menuList);
		page.setStartRow(0);
		page.setEndRow(size);
		page.setTotalRow(size);
		return page;
	}


	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

	
}
