/**
 * 
 */
package com.product.Manufacturer;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;


/**
 * @author Administrator
 *
 */
public class Sdk extends BaseBean{
	
	public static final String ROOT_PATH_KEY="sdkRootPath";

	@JsonField
	private String name;
	@JsonField
	private String desc;
	@JsonField
	private String id;
	@JsonField
	private String m_id;
	@JsonField
	private String m_name;
	@JsonField
	private String version;
	@JsonField
	private String rate;
	/**
	 * ���·��,����·��Ϊ {����·��+���·��}
	 */
	@JsonField
	private String attachmentRelativePath;
	
	/**
	 * ԭʼ�ļ�������������ʱ��
	 */
	private String oFileName;
	
	@JsonField
	private String name_version;
	
	/**
	 * �����ϴ�ʱ��
	 */
	@JsonField
	private String uploadDate;
	
	/**
	 * ���������޸Ļ���ɾ��
	 */
	private String editorType;

	public String getName_version() {
		return name+"("+version+")";
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
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

	public String getM_id() {
		return m_id;
	}
	public void setM_id(String m_id) {
		this.m_id = m_id;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
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
	
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	/**
	 * �Ƿ��޸�
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
