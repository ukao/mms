select a.*,c.name,c.version from CUSTOMER_INFO a,
T_PRODUCT_RELATIVE b,T_PRODUCT c where a.product=b.name and b.product_id=c.id and varchar(day(a.ACTIVE_TIME))='2015-02-02'

select varchar(active_time) from CUSTOMER_INFO