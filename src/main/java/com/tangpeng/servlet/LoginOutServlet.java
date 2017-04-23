package com.tangpeng.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tangpeng.auth.User;

/**
 * µÇÂ¼servlet
 * @author tangpeng
 */
public class LoginOutServlet extends HttpServlet {

	private static final long serialVersionUID = 3861979868139651767L;

	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		this.doGet(req, resp);
	}
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		req.getSession().removeAttribute(User.SESSION_ID);
		resp.sendRedirect("/loginPage.html");
	}
	
	
	
}
