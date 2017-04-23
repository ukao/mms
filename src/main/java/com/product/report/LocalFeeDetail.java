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
public class LocalFeeDetail extends ReportBean{

	@JsonField
	private String imei;
	@JsonField
	private String id;
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
	private String fee_node;
	@JsonField
	private String fee_time;
	@JsonField
	private String price;
	@JsonField
	private String status;
	
	
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getFee_node() {
		return fee_node;
	}
	public void setFee_node(String fee_node) {
		this.fee_node = fee_node;
	}
	public String getFee_time() {
		return fee_time;
	}
	public void setFee_time(Timestamp fee_time) {
		this.fee_time = this.timeFormat(fee_time);
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
}
