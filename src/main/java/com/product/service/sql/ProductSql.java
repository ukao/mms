package com.product.service.sql;

public interface ProductSql {
	
	/**
	 * 
	 */
	String QUERY = "select "
			+ "T_PRODUCT.id,"
			+ "T_PRODUCT.name,"
			+ "orginal_file_name,"
			+ "corporation_id,"
			+ "version,"
			+ "T_CORPORATION.name as corporation_name,"
			+ "T_CORPORATION.description,"
			+ "app_key,app_channel,file_relative_path,"
			+ "file_upload_time from T_PRODUCT, T_CORPORATION where"
			+ " T_PRODUCT.corporation_id=T_CORPORATION.id ";
		
	String CONDITION_NAME = " and T_PRODUCT.name like ? ";
	
	String CONDITION_NAME_EQUIP = " and T_PRODUCT.name=?";
	
	String CONDITION_VERSION_EQUIP = " and T_PRODUCT.version=?";
	
	String CONDITION_ID_EQUIP = " and T_PRODUCT.id=?";
	
	
	String QUERY_COUNT = "select count(1) from T_PRODUCT where 1=1 ";
	
	String ADD = "insert into T_PRODUCT(name,description,app_key,app_channel,corporation_id,version) values(?,?,?,?,?,?)";
	
	String MODIFY = "update T_PRODUCT set name=?,description=?,app_key=?,app_channel=?,corporation_id=?,version=? where id=?";
	
	String MODIFY_FILE = "update T_PRODUCT set file_relative_path=?,file_upload_time=?,orginal_file_name=? where id=?";
	
	String DELETE = "delete from T_PRODUCT where id=?";
	
	String PAGE = " OFFSET ? ROWS FETCH NEXT ? ROWS ONLY ";
}
