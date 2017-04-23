package com.derby;

/**
 * ��ʼ���ű���ֻ����һ��
 * @author tangpeng
 *
 */
public interface InitSql {

	String dropUser = "drop table T_USER";
	String dropRole = "drop table T_ROLE";
	String dropUserRole = "drop table T_USER_ROLE";
	String dropManufacturer = "drop table T_MANUFACTURER";
	String dropSdk = "drop table T_SDK";
	String dropProduct = "drop table T_PRODUCT";
	String dropCorporation = "drop table T_CORPORATION";
	String dropChannel = "drop table T_CHANNEL";
	String dropProductRelative = "drop table T_PRODUCT_RELATIVE";
	
	/**
	 * ������ɫ��
	 */
	String createRole = 
	"create table T_ROLE(" +
	" roleId integer  GENERATED BY DEFAULT AS IDENTITY primary key," +
	" roleName varchar(100) " +
	" ) ";
	
	/**
	 * �����û���
	 */
	String createUser = 
			"create table T_USER(" +
			" userName varchar(100) primary key,"+
			" fullName varchar(100) ,"+
			" password varchar(100) "+
			")";
	
	/**
	 * ������ɫ�û���Ӧ��
	 */
	String createUserRole = 
			"create table T_USER_ROLE( " +
			" userName varchar(100)," +
			" roleId integer "+
			" ) ";
	
	/**
	 * ����
	 */
	String createRight = 
			"create table T_RIGHT(" +
			"opId varchar(100) primary key," +
			"parentId varchar(100)," +
			"name varchar(200), "+
			"actionNo integer, " +
			"type integer " +//���� menu����operation 1 2
			")";
	
	String createRoleRight = 
			"create table T_ROLE_RIGHT( " +
			" roleId integer," +
			" opId  varchar(100) "+
			" ) ";
	
	
	String createManufacturer = 
			"create table T_MANUFACTURER("
			+ "id integer not null generated always as identity(start with 1,increment by 1) primary key,"
			+ "name varchar(50),"
			+ "description varchar(200),"
			+ "edit_time timestamp"
			+ ")";
	
	String createSdk = 
			"create table T_SDK("
			+ "id integer not null generated always as identity(start with 1,increment by 1) primary key,"
			+ "m_id integer,"//SDK��˾ID
			+ "name varchar(50),"
			+ "version varchar(20),"
			+ "description varchar(200),"
			+ "file_relative_path varchar(200),"
			+ "file_upload_time timestamp"
			+ ")";
	
	String createProduct = 
			"create table T_PRODUCT("
			+ "id integer not null generated always as identity(start with 1,increment by 1) primary key,"
			+ "corporation_id integer,"		//��˾id
			+ "name varchar(50),"
			+ "description varchar(200),"
			+ "APP_KEY varchar(50),"
			+ "APP_CHANNEL varchar(50),"
			+ "file_relative_path varchar(200),"
			+ "file_upload_time timestamp"
			+ ")";
	
	String createCustomerLoginInfo =
			"create table T_CUSTOMER_LOGIN_INFO  ("
			+ "ID               INTEGER primary key,"
			+ "IMEI                 varchar(15) not null,"
			+ "MODEL                varchar(16),"
			+ "LOGIN_IP             VARCHAR(16) not null,"
			+ "APP_NAME             VARCHAR(32) not null,"
			+ "APP_VERSION        	VARCHAR(16),"
			+ "ANDROID_VERSION      VARCHAR(16),"
			+ "LOGIN_TIME           VARCHAR(20) not null,"
			+ "LOGOUT_TIME          VARCHAR(20) not null,"
			+ "ONLINE_TIME          VARCHAR(16)"
			+ ")";
	
	String createCorporation = 
			"create table T_CORPORATION("
			+ "id integer not null generated always as identity(start with 1,increment by 1) primary key,"
			+ "name varchar(50),"
			+ "description varchar(200),"
			+ "edit_time timestamp"
			+ ")";
	
	String createChannel = 
			"create table T_Channel("
			+ "id integer not null generated always as identity(start with 1,increment by 1) primary key,"
			+ "name varchar(50),"
			+ "description varchar(200),"
			+ "edit_time timestamp"
			+ ")";
	
	String createProductRelative = 
			"create table T_PRODUCT_RELATIVE("
			+ "id integer not null generated always as identity(start with 1,increment by 1) primary key,"
//			+ "corporation_id integer,"//��˾id
			+ "product_id integer,"//��Ʒid
			+ "channel_id integer,"//����
			+ "sdk_id integer,"//sdk id
			+ "rate NUMERIC(4,2),"//�������������
//			+ "inner_function varchar(100),"//
//			+ "fee_node varchar(50),"
			+ "name varchar(50),"//�������������
			+ "description varchar(200),"//����
			+ "file_relative_path varchar(200),"//�����������ϴ��������ļ�
			+ "file_upload_time timestamp"
			+ ")";
}