package com.tangpeng.service.sql;

/**
 * һЩsql���
 * @author tangpeng
 */
public interface SecuritySql 
{
	/**
	 * �����û���Ϣ
	 */
	String SQL_INSERT_T_USER = "insert into T_USER(userName,fullName,password) values(?,?,?)";
	
	String SQL_INSERT_T_USER_ROLE = "insert into T_USER_ROLE(userName,roleId) values(?,?)";
}
