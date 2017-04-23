package com.tangpeng.handle.usermangement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tangpeng.auth.User;
import com.tangpeng.handle.AbstractRestNormalHandle;

public class UserInfoHandle extends AbstractRestNormalHandle {

	
	@Override
	public String responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		//��ȡ����
		User user = (User) req.getSession().getAttribute(User.SESSION_ID);
		
		return user.toJSONString();
	}
}

