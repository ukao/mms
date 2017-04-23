/**
 * 
 */
package com.product.statistic;

import com.product.common.ReportBean;
import com.tangpeng.bean.JsonField;


/**
 * @author Administrator
 *
 */
public class SdkTransferSta extends ReportBean{

	@JsonField
	private String id;
	@JsonField
	private String product;
	@JsonField
	private String app_name;
	@JsonField
	private String app_version;
	@JsonField
	private String sdk_id;
	@JsonField
	private String sdk_name;
	@JsonField
	private String sdk_success_fee;
	@JsonField
	private String local_success_fee;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getSdk_id() {
		return sdk_id;
	}
	public void setSdk_id(String sdk_id) {
		this.sdk_id = sdk_id;
	}
	public String getSdk_name() {
		return sdk_name;
	}
	public void setSdk_name(String sdk_name) {
		this.sdk_name = sdk_name;
	}
	public String getSdk_success_fee() {
		return sdk_success_fee;
	}
	public void setSdk_success_fee(String sdk_success_fee) {
		this.sdk_success_fee = sdk_success_fee;
	}
	public String getLocal_success_fee() {
		return local_success_fee;
	}
	public void setLocal_success_fee(String local_success_fee) {
		this.local_success_fee = local_success_fee;
	}
}
