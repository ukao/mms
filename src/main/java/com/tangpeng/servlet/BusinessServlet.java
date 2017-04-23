package com.tangpeng.servlet;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.bean.BeanFactory;
import com.tangpeng.handle.RequestHandle;

/**
 * 业务servlet
 * 单实例多线程，服务器启动时初始化
 * @author tangpeng
 */
public class BusinessServlet extends HttpServlet {

	private static final long serialVersionUID = -7906985049640504566L;
	private static final Logger logger = LoggerFactory.getLogger(BusinessServlet.class);
	Map<String,RequestHandle> servletMapping;

	@SuppressWarnings("unchecked")
	@Override
	public void init(ServletConfig config) throws ServletException
	{
		super.init(config);
		try 
		{
			servletMapping = (Map<String, RequestHandle>) BeanFactory.getBean("ServletMapping");
		} catch (Exception e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		this.doGet(req, resp);
	}
	
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		String url = req.getRequestURL().toString();
		String sufferUrl = url.replaceFirst("(.*business)(/.*)","$2");
		//轮询配置的url
		for (String value : servletMapping.keySet()) 
		{
			if( sufferUrl.startsWith(value))
			{
				//获取handle
				RequestHandle handle = servletMapping.get(value);
				try 
				{
					//处理
					handle.doService(req, resp);
					break;
				}
				catch (Exception e) 
				{
					logger.error("",e);
				}
			}
		}
	}

}
