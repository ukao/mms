package com.tangpeng.handle;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 普通的数据处理器
 * @author tangpeng
 */
public abstract class AbstractRestNormalHandle  implements RequestHandle{
	@Override
	public void doService(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException 
	{
		String str = this.responsePageByJson(req,resp);
		ServletOutputStream  out = resp.getOutputStream();
		//必须用write byte的方式
		out.write(str.getBytes("utf-8"));
		out.close();
	}

	/**
	 * 响应
	 * @param req
	 * @param resp
	 * @return
	 */
	public abstract String  responsePageByJson(HttpServletRequest req, HttpServletResponse resp);
}
