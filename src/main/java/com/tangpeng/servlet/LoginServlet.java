package com.tangpeng.servlet;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.auth.User;
import com.tangpeng.bean.BeanFactory;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.exception.ErrorCode;
import com.tangpeng.exception.GarageException;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.service.iface.SecurityService;
import com.tangpeng.utils.I18nService;
import com.tangpeng.utils.RandomValidateCode;

/**
 * 登录servlet
 * @author tangpeng
 */
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 3861979868139651767L;

	private static final Logger logger = LoggerFactory.getLogger(AbstractRestResultHandle.class);
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		this.doGet(req, resp);
	}
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{
		User user;
		User userDS;
		ResultBean result= new ResultBean();
		try 
		{
			SecurityService securityService = BeanFactory.getBean(SecurityService.class);
			I18nService i18nService = BeanFactory.getBean(I18nService.class);
			user = this.createBaseBean(req, User.class);

			if(!user.getValidatorCode().equalsIgnoreCase((String)req.getSession().getAttribute(RandomValidateCode.RANDOMCODEKEY)))
			{
				result.setDesc(i18nService.getLabel("login.validator"));
			}
			else
			{
				userDS = securityService.getUser(user.getUserName());	
				if( userDS == null )
				{
					result.setDesc(i18nService.getLabel("login.user"));
				}
				else if(!user.getPassword().equals(userDS.getPassword() ))
				{
					result.setDesc(i18nService.getLabel("login.password"));
				}
				else
				{
					req.getSession().setAttribute(User.SESSION_ID,userDS);
					result.setResult(ResultBean.SUCCESS);
					result.setDesc("");
				}
			}
			
		}
		catch(Exception e)
		{
			result.setDesc(e.getMessage());
		}
		
		ServletOutputStream out = resp.getOutputStream();
		String str = "{\"response\":{\"result\":\"" + result.getResult()
				+ "\",\"desc\":\"" + result.getDesc().replaceAll("\"", "\\\"")
				+ "\"}}";
		// 必须用write byte的方式
		out.write(str.getBytes("utf-8"));
		out.close();
	}
	
	
	
	/**
	 * 根据获取的post请求转换为BaseBean对象
	 * 适用于没有复杂变量的情况，即fields里面没有list、map以及其他bean对象
	 * @throws Exception
	 * @throws InstantiationException
	 */
	protected <T> T createBaseBean(HttpServletRequest request,
			Class<T> cs) throws GarageException {
		T t = null;
		try {
			t = cs.newInstance();
			Method[] methods = cs.getMethods();
			JSONObject jsonObject = new JSONObject(getPostParameter(request));
			@SuppressWarnings("rawtypes")
			Iterator i = jsonObject.keys();
			while (i.hasNext()) {
				String s = (String) i.next();
				for (Method method : methods) {
					if (method.getName().equalsIgnoreCase("set" + s)) {
						Class<?> paraType = method.getParameterTypes()[0];
						if( String.class.equals( paraType ) )
						{
							method.invoke(t, jsonObject.getString(s));	
						}
						else if(Integer.class.equals(paraType))
						{
							method.invoke(t, jsonObject.getInt(s));
						}
						
					}
				}
			}
		}
		catch (Exception e) 
		{
			logger.warn(e.getMessage(),e);
			throw new GarageException(ErrorCode.WEB_BEAN_TRANSFORM_ERROR,e);
		}
		return t;
	}
	

	/**
	 * 获取参数
	 * @param request
	 * @return
	 * @throws IOException
	 */
	protected String getPostParameter(HttpServletRequest request)
			throws IOException {
		BufferedInputStream buf = null;
		int iContentLen = request.getContentLength();
		byte sContent[] = new byte[iContentLen];
		String sContent2 = null;
		try {
			buf = new BufferedInputStream(request.getInputStream());
			buf.read(sContent, 0, sContent.length);
			sContent2 = new String(sContent, 0, iContentLen, "UTF-8");
			// 获取的字符需要解码
			sContent2 = URLDecoder.decode(sContent2, "UTF-8");
		} catch (IOException e) {
			throw new IOException("Parse data error!", e);
		} finally {
			try {
				buf.close();
			} catch (IOException e) {

			}
		}
		return sContent2;
	}
	

	/**
	 * 
	 * @param <T>
	 * @param request
	 * @param cs
	 * @return
	 * @throws GarageException
	 */
	protected <T> T createForm(HttpServletRequest request,
			Class<T> cs) throws GarageException {
		T t = null;
		try {
			t = cs.newInstance();
			Method[] methods = cs.getMethods();
			String contents = getPostParameter(request);
			String[] fields = contents.split("&");
			
			for(String field:fields ) 
			{
				String[] keyValue = field.split("=");
				for (Method method : methods) 
				{
					if (method.getName().equalsIgnoreCase("set" + keyValue[0])) 
					{
						method.invoke(t, keyValue[1]);
						break;
					}
				}
			}
		}
		catch (Exception e) 
		{
			logger.warn(e.getMessage(),e);
			throw new GarageException(ErrorCode.WEB_BEAN_TRANSFORM_ERROR,e);
		}
		return t;
	}

}
