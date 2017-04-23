package com.tangpeng.handle.rolemangement;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.auth.Right;
import com.tangpeng.auth.Role;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.service.iface.SecurityService;


/**
 * 获取角色的权限
 * 操作角色只能是超级用户
 * @author tangpeng
 *
 */
public class RoleRightHandle extends AbstractRestListHandle {

	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(RoleRightHandle.class);
	
	private SecurityService securityService;
	
	@Override
	public PageBean<Right> responsePageByJson(HttpServletRequest req, HttpServletResponse resp) {
		
		//获取当前角色
		String roleIdStr = req.getParameter("roleId");
		//如果没有，那么
		int roleId = Role.ADMIN;
		
		PageBean<Right> page = new PageBean<Right>();
		
		if( roleIdStr != null )
		{
			roleId = Integer.parseInt(roleIdStr);
		}
		
		List<Right> list = securityService.getRightByRole(roleId);

		page.setData(list);
		page.setStartRow(0);
		page.setEndRow(list.size());
		page.setTotalRow(list.size());
		return page;
	}


	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

	
}
