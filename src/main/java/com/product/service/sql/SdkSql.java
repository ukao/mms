package com.product.service.sql;

public interface SdkSql {
	
	/**
	 * 需要查询sdk厂商名称
	 */
	String QUERY = "select t_sdk.id,t_sdk.name,t_manufacturer.name as m_name,orginal_file_name,"
			+ "m_id,version,t_sdk.description,file_relative_path,"
			+ "file_upload_time,rate from T_SDK,T_MANUFACTURER "
			+ " where T_SDK.m_id=T_MANUFACTURER.id ";
	/**
	 * 单表查询
	 */
	String QUERY_SDK = "select id,name,m_id,version,description from T_SDK where 1=1 ";
		
	String CONDITION_NAME = " and t_sdk.name like ? ";
	
	String CONDITION_NAME_EQUIP = " and t_sdk.name=?";
	
	String CONDITION_ID_EQUIP = " and t_sdk.id=?";
	
	String CONDITION_VERSION_EQUIP = " and t_sdk.version=? ";
	
	String CONDITION_M_ID = " and m_id=? ";
	
	String QUERY_COUNT = "select count(1) from T_SDK where 1=1 ";
	
	String ADD = "insert into T_SDK(name,m_id,version,description,rate) values(?,?,?,?,?)";
	
	String MODIFY = "update T_SDK set name=?,m_id=?,version=?,description=?,rate=? where id=?";
	
	String MODIFY_FILE = "update T_SDK set file_relative_path=?,file_upload_time=?,orginal_file_name=? where id=?";
	
	String DELETE_SDK = "delete from T_SDK where id=?";
	
	String PAGE = " OFFSET ? ROWS FETCH NEXT ? ROWS ONLY ";
}
