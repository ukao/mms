package com.tangpeng.handle.usermangement;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.auth.Right;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.service.iface.SecurityService;


/**
 * 获取用户权限(实时上是角色权限)
 * @author tangpeng
 *
 */
public class UserRightHandle extends AbstractRestListHandle {

	
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(UserRightHandle.class);
	
	private SecurityService securityService;
	
	@Override
	public PageBean<Right> responsePageByJson(HttpServletRequest req, HttpServletResponse resp) {
		
		int userId = Integer.parseInt(req.getParameter("userId"));
		PageBean<Right> page = new PageBean<Right>();		
		
		List<Right> list = securityService.getRightByRole(userId);

		page.setData(list);
		page.setStartRow(0);
		page.setEndRow(list.size());
		page.setTotalRow(list.size());
		return page;
	}


	public void setSecurityService(SecurityService securityService) 
	{
		this.securityService = securityService;
	}

	
}
