package com.tangpeng.servlet;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.tangpeng.auth.User;


/**
 * 安全认证过滤器
 * @author tangpeng
 */
public class SecurityFilter implements Filter {

	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpSession session  = ((HttpServletRequest)request).getSession();
		User user = (User) session.getAttribute(User.SESSION_ID);
		if( user != null )
		{
			chain.doFilter(request, response);
		}
		else
		{
//			user = new User("admin","admin","");
//		user.setRoleId(0);
//	((HttpServletRequest)request).getSession().setAttribute(User.SESSION_ID,user);
//			chain.doFilter(request, response);
//			request.getRequestDispatcher("/loginPage.html").forward(request, response);
//			((HttpServletResponse)response).sendRedirect("/loginPage.html");
//			chain.doFilter(request, response);
		}
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

}
