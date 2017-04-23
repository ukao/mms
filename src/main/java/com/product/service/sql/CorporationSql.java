package com.product.service.sql;

public interface CorporationSql {

	String QUERY = "select id,name,description from T_CORPORATION where 1=1 ";
	
	String CONDITION_NAME = " and name like ? ";
	
	String CONDITION_NAME_EQUIP = " and name=?";
	
	String QUERY_COUNT = "select count(1) from T_CORPORATION where 1=1 ";
	
	String ADD = "insert into T_CORPORATION(name,description) values(?,?)";
	
	String MODIFY = "update T_CORPORATION set name=?,description=? where id=?";
	
	String DELETE_P_R = "delete from T_PRODUCT_RELATIVE where product_id in (select id from T_PRODUCT where corporation_id=?)";
	
	String DELETE_P = "delete from T_PRODUCT where corporation_id=?";
	
	String DELETE = "delete from T_CORPORATION where id=?";
	
	String PAGE = " OFFSET ? ROWS FETCH NEXT ? ROWS ONLY ";
	
	String QUERY_RELATIVE = "select * from T_PRODUCT_RELATIVE where channel_id=?";
}
