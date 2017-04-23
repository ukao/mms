package com.product.statistic;

import com.product.common.ReportBean;
import com.tangpeng.bean.JsonField;

public class ActiveSta  extends ReportBean{

	@JsonField
	private String id;
	@JsonField
	private String product;
	@JsonField
	private String app_name;
	@JsonField
	private String app_version;
	@JsonField
	private String new_count;
	@JsonField
	private String online_count;
	@JsonField
	private String channel_name;
	@JsonField
	private String channel_id;
	
	
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
	public String getNew_count() {
		return new_count;
	}
	public void setNew_count(String new_count) {
		this.new_count = new_count;
	}
	public String getOnline_count() {
		return online_count;
	}
	public void setOnline_count(String online_count) {
		this.online_count = online_count;
	}
	public String getChannel_name() {
		return channel_name;
	}
	public void setChannel_name(String channel_name) {
		this.channel_name = channel_name;
	}
	public String getChannel_id() {
		return channel_id;
	}
	public void setChannel_id(String channel_id) {
		this.channel_id = channel_id;
	}
	
	
}
