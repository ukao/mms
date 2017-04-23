/**
 * 
 */
package com.product.product;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;


/**
 * @author tangpeng
 *
 */
public class Product extends BaseBean{
	
	public static final String ROOT_PATH_KEY="productRootPath";

	@JsonField
	private String name;
	@JsonField
	private String desc;
	@JsonField
	private String id;
	@JsonField
	private String version;
	@JsonField
	private String app_key;
	@JsonField
	private String app_channel;
	
	private String oFileName;
	
	@JsonField
	private String corporation_id;
	
	@JsonField
	private String corporation_name;
	
	@JsonField
	private String name_version;
	
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
	
	
	public String getName_version() {
		return name+"("+version+")";
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	
	
	public String getoFileName() {
		return oFileName;
	}
	public void setoFileName(String oFileName) {
		this.oFileName = oFileName;
	}
	public String getAttachmentRelativePath() {
		return attachmentRelativePath;
	}
	public void setAttachmentRelativePath(String attachmentRelativePath) {
		this.attachmentRelativePath = attachmentRelativePath;
	}
	public String getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}
	
	public String getApp_key() {
		return app_key;
	}
	public void setApp_key(String app_key) {
		this.app_key = app_key;
	}
	public String getApp_channel() {
		return app_channel;
	}
	public void setApp_channel(String app_channel) {
		this.app_channel = app_channel;
	}
	
	
	public String getCorporation_id() {
		return corporation_id;
	}
	public String getCorporation_name() {
		return corporation_name;
	}
	public void setCorporation_id(String corporation_id) {
		this.corporation_id = corporation_id;
	}
	public void setCorporation_name(String corporation_name) {
		this.corporation_name = corporation_name;
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
