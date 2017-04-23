package com.tangpeng.handle.rolemangement;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tangpeng.auth.Role;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.iface.SecurityService;

public class RoleListHandle extends AbstractRestListHandle {


	private SecurityService securityService;
	
	
	@Override
	public PageBean<Role> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		String keyword = req.getParameter("keyword");
		int startRow = Integer.parseInt(req.getParameter("_startRow"));
		int endRow =  Integer.parseInt(req.getParameter("_endRow"));
		
		Pair<List<Role>,Integer> pair = securityService.getRoleList(keyword, startRow, endRow);
		PageBean<Role> page = new PageBean<Role>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

}

