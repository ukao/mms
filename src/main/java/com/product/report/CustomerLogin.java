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
public class CustomerLogin extends ReportBean{

	@JsonField
	private String id;
	@JsonField
	private String imei;
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
	private String login_time;
	@JsonField
	private String logout_time;
	@JsonField
	private String online_time;
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
	public String getLogin_ip() {
		return login_ip;
	}
	public void setLogin_ip(String login_ip) {
		this.login_ip = login_ip;
	}
	public String getCustomer_id() {
		return customer_id;
	}
	
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
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
	public String getLogin_time() {
		return login_time;
	}
	public void setLogin_time(Timestamp login_time) {
		this.login_time = this.timeFormat(login_time);
	}
	public String getLogout_time() {
		return logout_time;
	}
	public void setLogout_time(Timestamp logout_time) {
		this.logout_time = this.timeFormat(logout_time);
	}
	public String getOnline_time() {
		return online_time;
	}
	public void setOnline_time(String online_time) {
		this.online_time = online_time;
	}
	
	
	
	
}
