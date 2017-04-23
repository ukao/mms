package com.tangpeng.handle;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * http请求处理器
 * 实现类必须是单实例多线程处理，无状态设计模式。
 * @author tangpeng
 *
 */
public interface RequestHandle {

	/**
	 * 处理客户端请求
	 * @param req
	 * @param resp
	 */
	void doService(HttpServletRequest req,HttpServletResponse resp) throws ServletException, IOException;
	
}
