/**
 * 
 */
package com.product.config;

import com.product.report.SdkFeeDetail;
import com.tangpeng.bean.JsonField;


/**
 * @author tangpeng
 *
 */
public class SdkConfig extends SdkFeeDetail{


	@JsonField
	private String sdk_id;
	@JsonField
	private String price_unit;
	@JsonField
	private String m_id;
	@JsonField
	private String m_name;
	@JsonField
	private String response_code;

	@JsonField
	private String http_method;
	
	
	public String getHttp_method() {
		return http_method;
	}
	public void setHttp_method(String http_method) {
		this.http_method = http_method;
	}
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	public String getResponse_code() {
		return response_code;
	}
	public void setResponse_code(String response_code) {
		this.response_code = response_code;
	}
	public String getM_id() {
		return m_id;
	}
	public void setM_id(String m_id) {
		this.m_id = m_id;
	}
	public String getPrice_unit() {
		return price_unit;
	}
	public void setPrice_unit(String price_unit) {
		this.price_unit = price_unit;
	}
	public String getSdk_id() {
		return sdk_id;
	}
	public void setSdk_id(String sdk_id) {
		this.sdk_id = sdk_id;
	}
	/**
	 * 新增或者修改
	 */
	private String editorType;
	
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
