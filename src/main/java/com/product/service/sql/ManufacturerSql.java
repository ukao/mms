package com.product.service.sql;

public interface  ManufacturerSql{

	String QUERY = "select id,name,description from T_MANUFACTURER where 1=1 ";
	
	String CONDITION_NAME = " and name like ? ";
	
	String CONDITION_NAME_EQUIP = " and name=?";
	
	String QUERY_COUNT = "select count(1) from T_MANUFACTURER where 1=1 ";
	
	String ADD = "insert into T_MANUFACTURER(name,description) values(?,?)";
	
	String MODIFY = "update T_MANUFACTURER set name=?,description=? where id=?";
	
	String DELETE_M = "delete from T_MANUFACTURER where id=?";
	
	String DELETE_SDK = "delete from T_SDK where m_id=?";
	
	String PAGE = " OFFSET ? ROWS FETCH NEXT ? ROWS ONLY ";
}
