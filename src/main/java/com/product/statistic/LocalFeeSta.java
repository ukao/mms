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
public class LocalFeeSta extends ReportBean{

	@JsonField
	private String id;
	@JsonField
	private String product;
	@JsonField
	private String app_name;
	@JsonField
	private String app_version;
	@JsonField
	private String success_fee;
	@JsonField
	private String failed_fee;
	@JsonField
	private String success_count;
	@JsonField
	private String failed_count;
	@JsonField
	private String fee_node;
	
	
	
	public String getFee_node() {
		return fee_node;
	}
	public void setFee_node(String fee_node) {
		this.fee_node = fee_node;
	}
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
	public String getSuccess_fee() {
		return success_fee;
	}
	public void setSuccess_fee(String success_fee) {
		this.success_fee = success_fee;
	}
	public String getFailed_fee() {
		return failed_fee;
	}
	public void setFailed_fee(String failed_fee) {
		this.failed_fee = failed_fee;
	}
	public String getSuccess_count() {
		return success_count;
	}
	public void setSuccess_count(String success_count) {
		this.success_count = success_count;
	}
	public String getFailed_count() {
		return failed_count;
	}
	public void setFailed_count(String failed_count) {
		this.failed_count = failed_count;
	}
	
}
