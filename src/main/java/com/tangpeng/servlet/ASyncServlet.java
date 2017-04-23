/**
 * 
 */
package com.tangpeng.servlet;

import java.io.IOException;

import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * “Ï≤Ωservlet
 * @author tangpeng
 */
public class ASyncServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2076616593272563109L;


	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		this.doGet(req, resp);
	}
	

	@Override
	public void doGet(HttpServletRequest req, final HttpServletResponse resp) throws ServletException, IOException 
	{
		final AsyncContext context = req.startAsync();
		req.startAsync();
		context.start(new Runnable() {
			
			@Override
			public void run() 
			{
				try 
				{
					Thread.sleep(60000);
				} 
				catch (InterruptedException e) 
				{
					e.printStackTrace();
				}
				try {
					resp.getWriter().print("test");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				context.complete();
			}
		});
	}
}
