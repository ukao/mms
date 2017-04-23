CREATE DATABASE MMS DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use mms;
drop table T_USER;
drop table T_ROLE;
drop table T_USER_ROLE;
drop table T_ROLE_RIGHT;
drop table T_RIGHT;
drop table T_MANUFACTURER;
drop table T_SDK;
drop table T_PRODUCT;
drop table T_CORPORATION;
drop table T_CHANNEL;
drop table T_PRODUCT_RELATIVE;
drop table SDK_FEE_DETAIL ;
drop table SDK_TRANSFER_STA;

create table T_ROLE
( 
roleId integer  AUTO_INCREMENT primary key, 
roleName varchar(100)  
);

create table T_USER( 
userName varchar(100) primary key, 
fullName varchar(100) , 
password varchar(100) 
);

create table T_USER_ROLE(  
userName varchar(100), 
roleId integer  
);

create table T_RIGHT(opId varchar(100) primary key,
parentId varchar(100),name varchar(200), 
actionNo integer, 
type integer 
);

create table T_ROLE_RIGHT(  
roleId integer, 
opId  varchar(100)  
);

create table T_MANUFACTURER(
id integer AUTO_INCREMENT primary key,
name varchar(50),
description varchar(200),
edit_time timestamp
);

create table T_SDK(
id integer not null AUTO_INCREMENT primary key,
m_id integer,
name varchar(50),
version varchar(20),
rate NUMERIC(4,2),
description varchar(200),
file_relative_path varchar(200),
orginal_file_name varchar(50),
file_upload_time timestamp
);


create table T_CORPORATION(
id integer AUTO_INCREMENT primary key,
name varchar(50),
description varchar(200),
edit_time timestamp
);

create table T_Channel(
id integer AUTO_INCREMENT primary key,
name varchar(50),
userName varchar(100), 
description varchar(200),
edit_time timestamp
);

create table T_PRODUCT(
id integer AUTO_INCREMENT primary key,
corporation_id integer,
version varchar(50),
name varchar(50),
description varchar(200),
APP_KEY varchar(50),
APP_CHANNEL varchar(50),
file_relative_path varchar(200),
orginal_file_name varchar(50),
file_upload_time timestamp
);

create table T_PRODUCT_RELATIVE(
id integer AUTO_INCREMENT primary key,
product_id integer,
channel_id integer,
sdk_id integer,
extraction_category char(1),
extraction_num varchar(20),
name varchar(32),
description varchar(200),
file_relative_path varchar(200),
orginal_file_name varchar(50),
file_upload_time timestamp
);
CREATE INDEX T_PRODUCT_RELATIVE_INDEX_NAME ON T_PRODUCT_RELATIVE (name);
CREATE INDEX T_PRODUCT_RELATIVE_INDEX_PRODUCT_ID ON T_PRODUCT_RELATIVE (product_id);


create table CUSTOMER_INFO  (
id integer AUTO_INCREMENT primary key,
IMEI                 VARCHAR(15),
MODEL                VARCHAR(16),
LOGIN_IP             VARCHAR(16),
CUSTOMER_ID          VARCHAR(64) ,
PRODUCT               VARCHAR(32),/*t_product_relative -->>name */
ANDROID_VERSION      VARCHAR(16),
ACTIVE_TIME          timestamp
);
CREATE INDEX CUSTOMER_INFO_INDEX_PRODUCT ON CUSTOMER_INFO (PRODUCT);
CREATE INDEX CUSTOMER_INFO_INDEX_ACTIVE_TIME ON CUSTOMER_INFO (ACTIVE_TIME);

create table CUSTOMER_LOGIN_LOG_INFO  (
id integer AUTO_INCREMENT primary key,
IMEI                 VARCHAR(15),
LOGIN_IP             VARCHAR(16),
CUSTOMER_ID          VARCHAR(64),
PRODUCT              VARCHAR(32),
LOGIN_TIME			timestamp,
LOGOUT_TIME         timestamp,
ONLINE_TIME         VARCHAR(16)
);

CREATE INDEX CUSTOMER_LOGIN_LOG_INFO_INDEX_PRODUCT ON CUSTOMER_LOGIN_LOG_INFO (PRODUCT);
CREATE INDEX CUSTOMER_LOGIN_LOG_INFO_INDEX_LOGIN_TIME ON CUSTOMER_LOGIN_LOG_INFO (LOGIN_TIME);

create table SDK_FEE_DETAIL  (
id integer AUTO_INCREMENT primary key,
ORDER_ID             VARCHAR(32) ,
PRICE                INTEGER ,
STATUS               INTEGER ,
OPERATOR             CHAR(1),
SIGNER               VARCHAR(64),
APP_KEY              VARCHAR(32) ,
PRODUCT               VARCHAR(32),
SDK_PARAM            VARCHAR(16),
SYNC_TIME            timestamp
);
CREATE INDEX SDK_FEE_DETAIL_INDEX_PRODUCT ON SDK_FEE_DETAIL (PRODUCT);
CREATE INDEX SDK_FEE_DETAIL_INDEX_ACTIVE_TIME ON SDK_FEE_DETAIL (SYNC_TIME);


create table LOCAL_FEE_DETAIL  (
id integer AUTO_INCREMENT primary key,
IMEI                 VARCHAR(15),
LOGIN_IP             VARCHAR(16),
CUSTOMER_ID              VARCHAR(64) ,
PRODUCT               VARCHAR(32),
FEE_NODE             VARCHAR(32),
PRICE                INTEGER ,
STATUS               INTEGER ,
FEE_TIME             timestamp);
CREATE INDEX LOCAL_FEE_DETAIL_INDEX_PRODUCT ON LOCAL_FEE_DETAIL (PRODUCT);
CREATE INDEX LOCAL_FEE_DETAIL_INDEX_ACTIVE_TIME ON LOCAL_FEE_DETAIL (FEE_TIME);

create table SDK_FEE_STA  (
id integer AUTO_INCREMENT primary key,
SUCCESS_FEE       INTEGER,
FAILED_FEE        INTEGER,
SUCCESS_COUNT INTEGER,
FAILED_COUNT INTEGER,
PRODUCT               VARCHAR(32),
sta_date            VARCHAR(10));
CREATE INDEX SDK_FEE_STA_INDEX_PRODUCT ON SDK_FEE_STA (PRODUCT);
CREATE INDEX SDK_FEE_STA_INDEX_ACTIVE_TIME ON SDK_FEE_STA (sta_date);


create table LOCAL_FEE_STA  (
id integer AUTO_INCREMENT primary key,
SUCCESS_FEE       INTEGER,
FAILED_FEE        INTEGER,
SUCCESS_COUNT INTEGER,
FAILED_COUNT INTEGER,
PRODUCT               VARCHAR(32),
FEE_NODE             VARCHAR(32),
sta_date            VARCHAR(10) );
CREATE INDEX LOCAL_FEE_STA_INDEX_PRODUCT ON LOCAL_FEE_STA (PRODUCT);
CREATE INDEX LOCAL_FEE_STA_INDEX_STA_DATE ON LOCAL_FEE_STA (sta_date);

create table ACTIVE_STA
(
id integer AUTO_INCREMENT primary key,
ONLINE_CUSTOMER_COUNT INTEGER,
NEW_CUSTOMER_COUNT INTEGER,
PRODUCT  VARCHAR(32),
STA_DATE VARCHAR(10)
);
CREATE INDEX ACTIVE_STA_INDEX_PRODUCT ON LOCAL_FEE_STA (PRODUCT);
CREATE INDEX ACTIVE_STA_INDEX_STA_DATE ON ACTIVE_STA (sta_date);

CREATE TABLE SDK_TRANSFER_STA
(
id integer AUTO_INCREMENT primary key,
PRODUCT VARCHAR(32),
LOCAL_SUCCESS_FEE INTEGER,
SDK_SUCCESS_FEE INTEGER,
STA_DATE VARCHAR(10)
);
CREATE INDEX SDK_TRANSFER_STA_INDEX_PRODUCT ON SDK_TRANSFER_STA (PRODUCT);
CREATE INDEX SDK_TRANSFER_STA_INDEX_STA_DATE ON SDK_TRANSFER_STA (sta_date);


create table CHANNEL_DETAIL
(
id integer AUTO_INCREMENT primary key,
CATEGORY CHAR(1),
ACCOUNT_NUM INTEGER,
PRODUCT  VARCHAR(32),
STA_DATE VARCHAR(10)
);
CREATE INDEX CHANNEL_DETAIL_INDEX_PRODUCT ON CHANNEL_DETAIL (PRODUCT);
CREATE INDEX CHANNEL_DETAIL_INDEX_STA_DATE ON CHANNEL_DETAIL (sta_date);


create table CHANNEL_DETAIL_ACTIVE_MOCK
(
id integer AUTO_INCREMENT primary key,
ACCOUNT_NUM INTEGER,
PRODUCT  VARCHAR(32),
STA_DATE VARCHAR(10)
);
CREATE INDEX CHANNEL_DETAIL_ACTIVE_MOCK_INDEX_PRODUCT ON CHANNEL_DETAIL_ACTIVE_MOCK (PRODUCT);
CREATE INDEX CHANNEL_DETAIL_ACTIVE_MOCK_STA_DATE ON CHANNEL_DETAIL_ACTIVE_MOCK (sta_date);



create table CHANNEL_DETAIL_PROPORTION_MOCK
(
id integer AUTO_INCREMENT primary key,
ACCOUNT_NUM INTEGER,
PRODUCT  VARCHAR(32),
ACTIVE_COUNT INTEGER,
STA_DATE VARCHAR(10)
);
CREATE INDEX CHANNEL_DETAIL_PROPORTION_MOCK_INDEX_PRODUCT ON CHANNEL_DETAIL_PROPORTION_MOCK (PRODUCT);
CREATE INDEX CHANNEL_DETAIL_PROPORTION_MOCK_STA_DATE ON CHANNEL_DETAIL_PROPORTION_MOCK (sta_date);



create table FEE_NODE_TEMPLATE
(
id integer AUTO_INCREMENT primary key,
STRATEGY_ID  INTEGER,
NAME VARCHAR(32),
PRICE VARCHAR(16),
description varchar(200)
);


create table FEE_NODE_STRATEGY
(
id integer AUTO_INCREMENT primary key,
NAME  VARCHAR(64),
description varchar(200)
);



create table FEE_NODE_RELATIVE
(
id integer AUTO_INCREMENT primary key,
STRATEGY_ID INTEGER,
PRODUCT  VARCHAR(32),
description varchar(200)
);


create table PRODUCT_CONFIG
(
id integer AUTO_INCREMENT primary key,
PRODUCT  VARCHAR(32),
PARAM_NAME VARCHAR(200),
PARAM_VALUE VARCHAR(200),
description varchar(200)
)


create table SDK_PARAM_INFO  (
id integer AUTO_INCREMENT primary key,
m_id integer,
SDK_ID varchar(64),
ORDER_ID             VARCHAR(64),
PRICE                VARCHAR(32),
PRICE_UNIT CHAR(1),
STATUS               VARCHAR(32),
OPERATOR            VARCHAR(32),
SIGNER               VARCHAR(32),
APP_KEY              VARCHAR(32) ,
PRODUCT               VARCHAR(32),
SDK_PARAM            VARCHAR(32),
RESPONSE_CODE            VARCHAR(10),
HTTP_METHOD            VARCHAR(10)
);


insert into T_USER values('admin','admin','123');
insert into T_USER_ROLE values('admin',0);
insert into T_ROLE values(0,'admin');