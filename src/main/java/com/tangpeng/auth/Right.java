package com.tangpeng.auth;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

/**
 * 操作权限
 * @author tangpeng
 *
 */
public class Right extends BaseBean{
	
	/**
	 * 空方法
	 */
	public Right()
	{
		
	}
	
	/**
	 * 
	 * @param parentId 父节点
	 * @param opId id
	 * @param name 名称
	 */
	public Right(int actionNo,String parentId, String opId, String name,int type) {
		super();
		this.actionNo = actionNo;
		this.parentId = parentId;
		this.opId = opId;
		this.name = name;
		this.type = type;
	}
	
	/**
	 * 编号
	 */
	@JsonField
	private int actionNo;
	
	/**
	 * 父节点
	 */
	@JsonField
	private String parentId;
	/**
	 * 节点id
	 */
	@JsonField
	private String opId;
	/**
	 * 显示名称
	 */
	@JsonField
	private String name;
	
	@JsonField
	private int type;
	
	
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getOpId() {
		return opId;
	}
	public void setOpId(String opId) {
		this.opId = opId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public int getActionNo() {
		return actionNo;
	}

	public void setActionNo(int actionNo) {
		this.actionNo = actionNo;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}


}
