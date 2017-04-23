package com.tangpeng.handle;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * http��������
 * ʵ��������ǵ�ʵ�����̴߳�����״̬���ģʽ��
 * @author tangpeng
 *
 */
public interface RequestHandle {

	/**
	 * ����ͻ�������
	 * @param req
	 * @param resp
	 */
	void doService(HttpServletRequest req,HttpServletResponse resp) throws ServletException, IOException;
	
}
