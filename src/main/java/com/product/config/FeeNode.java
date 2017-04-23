package com.product.config;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

public class FeeNode extends BaseBean{

	@JsonField
	private String id;

	@JsonField
	private String product;

	@JsonField
	private String name;

	@JsonField
	private String price;

	@JsonField
	private String desc;
	
	@JsonField
	private String strategy_name;
	
	@JsonField
	private String strategy_id;

	@JsonField
	private String strategy_desc;
	
	
	
	public String getStrategy_desc() {
		return strategy_desc;
	}
	public void setStrategy_desc(String strategy_desc) {
		this.strategy_desc = strategy_desc;
	}
	public String getStrategy_id() {
		return strategy_id;
	}
	public void setStrategy_id(String strategy_id) {
		this.strategy_id = strategy_id;
	}
	public String getStrategy_name() {
		return strategy_name;
	}
	public void setStrategy_name(String strategy_name) {
		this.strategy_name = strategy_name;
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
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
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
