package com.product.report;

import com.product.common.ReportBean;
import com.tangpeng.bean.JsonField;

public class ChannelDetail  extends ReportBean{

	public static String CATEGORY_COUNT="0";
	public static String CATEGORY_FEE="1";
	
	/**
	 * 0  按激活次数结算
	 * 1 按费用结算
	 */
	@JsonField
	private String category;
	@JsonField
	private String id;
	@JsonField
	private String product;
	//单价或者分成比例加进来
	@JsonField
	private String extraction_num;
	@JsonField
	private String app_name;
	@JsonField
	private String app_version;
	@JsonField
	private String active_count;
	@JsonField
	private String account_num;
	@JsonField
	private String active_date;
	@JsonField
	private String channel_name;
	@JsonField
	private String channel_id;
	

	/**
	 * 新增或者修改
	 */
	private String editorType;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getExtraction_num() {
		return extraction_num;
	}
	public void setExtraction_num(String extraction_num) {
		this.extraction_num = extraction_num;
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
	public String getActive_count() {
		return active_count;
	}
	public void setActive_count(String active_count) {
		this.active_count = active_count;
	}
	public String getActive_date() {
		return active_date;
	}
	public void setActive_date(String active_date) {
		this.active_date = active_date;
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
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	/**
	 * 是否修改
	 * @return
	 */
	public boolean isModify()
	{
		return "1".equals(this.editorType);
	}
	public boolean isDelete()
	{
		return "2".equals(this.editorType);
	}
	public String getEditorType() {
		return editorType;
	}
	public void setEditorType(String editorType) {
		this.editorType = editorType;
	}
	public String getAccount_num() {
		return account_num;
	}
	public void setAccount_num(String account_num) {
		this.account_num = account_num;
	}
	
}
