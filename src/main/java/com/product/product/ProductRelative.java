package com.product.product;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

public class ProductRelative extends BaseBean 
{
	public static final String ROOT_PATH_KEY="productRelativeRootPath";

	@JsonField
	private String id;
	
	@JsonField
	private String product_id;
	
	@JsonField
	private String product_name;
	
	
	
	@JsonField
	private String corporation_id;
	
	@JsonField
	private String corporation_name;
	
	@JsonField
	private String channel_id;
	@JsonField
	private String channel_name;
	
	@JsonField
	private String sdk_id;
	@JsonField
	private String sdk_name;
	
	@JsonField
	private String rate;
	
	/**
	 * 合作类型
	 * 0 分成
	 * 1 激活
	 */
	@JsonField
	private String extraction_category;
	@JsonField
	private String extraction_num;
	
	@JsonField
	private String name;
	
	@JsonField
	private String desc;
	
	@JsonField
	private String full_name;
	
	/**
	 * 相对路径,附件路径为 {配置路径+相对路径}
	 */
	@JsonField
	private String attachmentRelativePath;
	
	/**
	 * 附件上传时间
	 */
	@JsonField
	private String uploadDate;
	
	/**
	 * 新增或者修改或者删除
	 */
	private String editorType;

	public void setId(String id) {
		this.id = id;
	}

	public void setCorporation_id(String corporation_id) {
		this.corporation_id = corporation_id;
	}

	public String getFull_name() {
		return this.name+" "+this.product_name;
	}

	public void setChannel_id(String channel_id) {
		this.channel_id = channel_id;
	}

	public void setSdk_id(String sdk_id) {
		this.sdk_id = sdk_id;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAttachmentRelativePath(String attachmentRelativePath) {
		this.attachmentRelativePath = attachmentRelativePath;
	}

	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}
	
	public String getId() {
		return id;
	}

	public String getCorporation_id() {
		return corporation_id;
	}

	public String getChannel_id() {
		return channel_id;
	}

	public String getSdk_id() {
		return sdk_id;
	}

	public String getRate() {
		return rate;
	}

	public String getName() {
		return name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getAttachmentRelativePath() {
		return attachmentRelativePath;
	}

	public String getUploadDate() {
		return uploadDate;
	}

	public String getProduct_id() {
		return product_id;
	}

	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public String getCorporation_name() {
		return corporation_name;
	}

	public void setCorporation_name(String corporation_name) {
		this.corporation_name = corporation_name;
	}

	public String getChannel_name() {
		return channel_name;
	}

	public void setChannel_name(String channel_name) {
		this.channel_name = channel_name;
	}

	public String getSdk_name() {
		return sdk_name;
	}

	public void setSdk_name(String sdk_name) {
		this.sdk_name = sdk_name;
	}

	public String getExtraction_category() {
		return extraction_category;
	}

	public void setExtraction_category(String extraction_category) {
		this.extraction_category = extraction_category;
	}

	public String getExtraction_num() {
		return extraction_num;
	}

	public void setExtraction_num(String extraction_num) {
		this.extraction_num = extraction_num;
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

	
}
