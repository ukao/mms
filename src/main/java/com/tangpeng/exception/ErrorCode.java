package com.tangpeng.exception;

/**
 * ������
 * @author tangpeng
 */
public interface ErrorCode 
{
	/**
	 * �û�����
	 * �û����Ѵ���
	 */
	int USER_MANAGEMENT_DUPIICATE = 20101;
	
	/**
	 * ��ȡ���ݿ����ӳ���
	 */
	int DB_GETCONNECTION_ERROR = 10101;
	
	/**
	 * ���ݿ��������
	 */
	int DB_OPERAOTR_ERROR = 10102;
	
	int WEB_BEAN_TRANSFORM_ERROR = 10201;
}
