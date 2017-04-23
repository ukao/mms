package com.product.config;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

public class ProductConfig extends BaseBean{

	@JsonField
	private String product;

	@JsonField
	private String name;

	@JsonField
	private String value;
	@JsonField
	private String id;
	@JsonField
	private String desc;

	
	
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
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
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
