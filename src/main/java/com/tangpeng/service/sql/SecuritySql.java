package com.tangpeng.service.sql;

/**
 * 一些sql语句
 * @author tangpeng
 */
public interface SecuritySql 
{
	/**
	 * 插入用户信息
	 */
	String SQL_INSERT_T_USER = "insert into T_USER(userName,fullName,password) values(?,?,?)";
	
	String SQL_INSERT_T_USER_ROLE = "insert into T_USER_ROLE(userName,roleId) values(?,?)";
}
