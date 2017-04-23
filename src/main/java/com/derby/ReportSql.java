package com.derby;

public interface ReportSql 
{
	String active="create table CUSTOMER_INFO  ("+
		   "ID                   INTEGER  primary key,"+
		   "IMEI                 VARCHAR(15),"+
		   "MODEL                VARCHAR(16),"+
		   "LOGIN_IP             VARCHAR(16)                    not null,"+
		   "CUSTOMER_ID              VARCHAR(64)                    not null,"+
		   "APP_ID               VARCHAR(16)                    not null,"+
		   "APP_NAME            VARCHAR(32)                    not null,"+
		   "APP_VERSION          VARCHAR(16),"+
		   "ANDROID_VERSION      VARCHAR(16),"+
		   "ACTIVE_TIME          VARCHAR(20)                    not null"+
		   ")";

	String online="create table CUSTOMER_LOGIN_LOG_INFO  ("+
			   "ID                   INTEGER primary key,"+
			   "IMEI                 VARCHAR(15),"+
			   "LOGIN_IP             VARCHAR(16)                    not null,"+
			   "CUSTOMER_ID              VARCHAR(64)                    not null,"+
			   "APP_ID               VARCHAR(16)                    not null,"+
			   "APP_NAME            VARCHAR(32)                    not null,"+
			   "APP_VERSION          VARCHAR(16),"+
			   "LOGIN_TIME           VARCHAR(20)                    not null,"+
			   "LOGOUT_TIME         VARCHAR(20)                    not null,"+
			   "ONLINE_TIME          VARCHAR(16)"+
			   ")";
	String sdkFee="create table SDK_FEE_DETAIL  ("+
			   "ID                   INTEGER    primary key,"+
			   "ORDER_ID             VARCHAR2(32)                    not null,"+
			   "PRICE                INTEGER                         not null,"+
			   "STATUS               INTEGER                         not null,"+
			   "OPERATOR             CHAR(1),"+
			   "SIGNER               VARCHAR(64),"+
			   "APP_KEY              VARCHAR(32)                    not null,"+
			   "APP_ID               VARCHAR(16),"+
			   "SDK_PARAM            VARCHAR(16),"+
			   "SYNC_TIME            VARCHAR(32)                    not null"+
			   ")";
	String localFee = "create table LOCAL_FEE_DETAIL  ("+
			   "ID                   INTEGER primary key,"+
			   "IMEI                 VARCHAR(15),"+
			   "LOGIN_IP             VARCHAR(16)                    not null,"+
			   "CUSTOMER_ID              VARCHAR(64)                    not null,"+
			   "APP_ID               VARCHAR(16),"+
			   "FEE_NODE             CHAR(1)                         not null,"+
			   "PRICE                INTEGER                         not null,"+
			   "STATUS               INTEGER                         not null,"+
			   "FEE_TIME             VARCHAR(16)                    not null"+
			   ")";

	String sdkFeestatistic="create table SDK_FEE_STA  ("+
			   "ID                   INTEGER    primary key,"+
			   "SUCCESS_FEE       INTEGER                         not null,"+//成功金额
			   "FAILED_FEE        CHAR(1),"+//失败金额
			   "SUCCESS_COUNT INTEGER,"+ //成功次数
			   "FAILED_COUNT INTEGER,"+//失败次数
			   "APP_ID               VARCHAR(16),"+
			   "sta_date            VARCHAR(8),"+//统计日期
			   "sta_month varchar(6)"+
			   ")";
	


	String localFeestatistic="create table LOCAL_FEE_STA  ("+
			   "ID                   INTEGER    primary key,"+
			   "SUCCESS_FEE       INTEGER                         not null,"+//成功金额
			   "FAILED_FEE        CHAR(1),"+//失败金额
			   "SUCCESS_COUNT INTEGER,"+ //成功次数
			   "FAILED_COUNT INTEGER,"+//失败次数
			   "APP_ID               VARCHAR(16),"+
			   
			   "sta_date            VARCHAR(8)                    not null"+//统计日期
			   ")";
}
