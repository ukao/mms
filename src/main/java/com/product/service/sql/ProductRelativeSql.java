package com.product.service.sql;

public interface ProductRelativeSql {
	
	/**
	 * 需要查询sdk厂商名称
	 */
	String QUERY = "select "
			+ "a.id,"
			+ "a.name,"
			+ "extraction_category,"
			+ "extraction_num,"
			+ "concat(c.name,'(',c.version,')') as sdk_name,"
			+ "concat(b.name,'(',b.version,')') as product_name,"
			+ "d.name as channel_name,"
			+ "product_id,"
			+ "channel_id,"
			+ "sdk_id,"
			+ "rate,"
			+ "a.description,"
			+ "a.file_relative_path,"
			+ "a.file_upload_time from "
			+ " T_PRODUCT_RELATIVE a,T_PRODUCT b,T_SDK c,T_CHANNEL d "
			+ " where "
			+ "a.product_id = b.id and "
			+ "a.channel_id = d.id and "
			+ "a.sdk_id = c.id ";
	/**
	 * 单表查询
	 */
	String QUERY_PRODUCT_RELATIVE = "select id,name,m_id,version,description from T_SDK where 1=1 ";
		
	String CONDITION_PRODUCT_ID = " and a.product_id = ? ";
	
	String CONDITION_EXTRACTION_CATEGORY = " and a.extraction_category = ? ";
	
	String CONDITION_CHANNEL_ID = " and a.channel_id = ? ";
	
	String CONDITION_NAME_EQUIP = " and a.name=?";
	
	String CONDITION_NAME_LIKE = " and ( a.name like ? or b.name like ? )";
	
	String CONDITION_ID_EQUIP = " and a.id=?";
	
	String QUERY_COUNT = "select count(1) from t_product_relative a,T_PRODUCT b where a.product_id = b.id ";
	
	String ADD = "insert into T_PRODUCT_RELATIVE(name,product_id,channel_id,sdk_id,extraction_category,extraction_num,description) values(?,?,?,?,?,?,?)";
	
	String MODIFY = "update T_PRODUCT_RELATIVE set name=?,product_id=?,channel_id=?,sdk_id=?,extraction_category=?,extraction_num=?,description=? where id=?";
	
	String MODIFY_FILE = "update T_PRODUCT_RELATIVE set file_relative_path=?,file_upload_time=? where id=?";
	
	String DELETE = "delete from T_PRODUCT_RELATIVE where id=?";
	
//	String PAGE = " OFFSET ? ROWS FETCH NEXT ? ROWS ONLY ";
}
