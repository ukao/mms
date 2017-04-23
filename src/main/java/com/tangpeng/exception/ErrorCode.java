package com.tangpeng.exception;

/**
 * 错误码
 * @author tangpeng
 */
public interface ErrorCode 
{
	/**
	 * 用户管理
	 * 用户名已存在
	 */
	int USER_MANAGEMENT_DUPIICATE = 20101;
	
	/**
	 * 获取数据库连接出错
	 */
	int DB_GETCONNECTION_ERROR = 10101;
	
	/**
	 * 数据库操作出错
	 */
	int DB_OPERAOTR_ERROR = 10102;
	
	int WEB_BEAN_TRANSFORM_ERROR = 10201;
}
