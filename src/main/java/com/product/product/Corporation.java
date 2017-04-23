/**
 * 
 */
package com.product.product;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;


/**
 * @author Administrator
 *
 */
public class Corporation extends BaseBean{

	@JsonField
	private String name;
	@JsonField
	private String desc;
	@JsonField
	private String id;
	
	/**
	 * 新增或者修改
	 */
	private String editorType;
	
	
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
