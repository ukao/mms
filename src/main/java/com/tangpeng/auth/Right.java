package com.tangpeng.auth;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

/**
 * ����Ȩ��
 * @author tangpeng
 *
 */
public class Right extends BaseBean{
	
	/**
	 * �շ���
	 */
	public Right()
	{
		
	}
	
	/**
	 * 
	 * @param parentId ���ڵ�
	 * @param opId id
	 * @param name ����
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
	 * ���
	 */
	@JsonField
	private int actionNo;
	
	/**
	 * ���ڵ�
	 */
	@JsonField
	private String parentId;
	/**
	 * �ڵ�id
	 */
	@JsonField
	private String opId;
	/**
	 * ��ʾ����
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
