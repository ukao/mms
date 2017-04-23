/**
 * 
 */
package com.product.report;

import java.sql.Timestamp;

import com.product.common.ReportBean;
import com.tangpeng.bean.JsonField;


/**
 * @author tangpeng
 *
 */
public class SdkFeeDetail extends ReportBean{

	@JsonField
	private String id;
	@JsonField
	private String order_id;
	@JsonField
	private String price;
	@JsonField
	private String status;
	@JsonField
	private String operator;
	@JsonField
	private String signer;
	@JsonField
	private String app_key;
	@JsonField
	private String product;
	@JsonField
	private String app_name;
	@JsonField
	private String app_version;
	@JsonField
	private String sdk_param;
	@JsonField
	private String sync_time;
	
	
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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getOrder_id() {
		return order_id;
	}
	public void setOrder_id(String order_id) {
		this.order_id = order_id;
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
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getSigner() {
		return signer;
	}
	public void setSigner(String signer) {
		this.signer = signer;
	}
	public String getApp_key() {
		return app_key;
	}
	public void setApp_key(String app_key) {
		this.app_key = app_key;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getSdk_param() {
		return sdk_param;
	}
	public void setSdk_param(String sdk_param) {
		this.sdk_param = sdk_param;
	}
	public String getSync_time() 
	{
		return sync_time;
	}
	public void setSync_time(Timestamp sync_time) {
		this.sync_time =  this.timeFormat(sync_time);
	}
	
	
	
	
}
