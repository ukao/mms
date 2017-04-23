package com.product.service.sql;

public interface ChannelSql {

	String QUERY = "select id,name,description,username from T_CHANNEL where 1=1 ";
	
	String CONDITION_NAME = " and name like ? ";
	
	String CONDITION_NAME_EQUIP = " and name=?";
	
	String CONDITION_USERNAME_EQUIP = " and username=?";
	
	String QUERY_COUNT = "select count(1) from T_CHANNEL where 1=1 ";
	
	String ADD = "insert into T_CHANNEL(name,description,username) values(?,?,?)";
	
	String MODIFY = "update T_CHANNEL set name=?,description=?,username=? where id=?";
	
	String DELETE = "delete from T_CHANNEL where id=?";
	
//	String PAGE = " OFFSET ? ROWS FETCH NEXT ? ROWS ONLY ";
	
	String QUERY_RELATIVE = "select * from T_PRODUCT_RELATIVE where channel_id=?";
}
