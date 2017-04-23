/**
 * 
 */
package com.product.report;

import java.sql.Timestamp;

import com.product.common.ReportBean;
import com.tangpeng.bean.JsonField;


/**
 * @author Administrator
 *
 */
public class CustomerInfo extends ReportBean{


	@JsonField
	private String id;
	@JsonField
	private String imei;
	@JsonField
	private String model;
	@JsonField
	private String login_ip;
	@JsonField
	private String customer_id;
	@JsonField
	private String product;
	@JsonField
	private String app_name;
	@JsonField
	private String app_version;
	@JsonField
	private String android_version;
	@JsonField
	private String active_time;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getLogin_ip() {
		return login_ip;
	}
	public void setLogin_ip(String login_ip) {
		this.login_ip = login_ip;
	}
	public String getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}
	
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getApp_name() {
		return app_name;
	}
	public void setApp_name(String app_name) {
		this.app_name = app_name;
	}
	public String getApp_version() {
		return app_version;
	}
	public void setApp_version(String app_version) {
		this.app_version = app_version;
	}
	public String getAndroid_version() {
		return android_version;
	}
	public void setAndroid_version(String android_version) {
		this.android_version = android_version;
	}
	public String getActive_time() {
		return active_time;
	}
	public void setActive_time(Timestamp active_time) 
	{
		this.active_time = this.timeFormat(active_time);
	}
	
	
}
