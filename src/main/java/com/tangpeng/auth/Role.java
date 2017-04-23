package com.tangpeng.auth;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

/**
 * ��ɫ��Ϣ
 * @author tangpeng
 */
public class Role extends BaseBean{

	/**
	 * ��ɫΪadmin,д����0
	 */
	public static final int ADMIN = 0;
	
	public Role(int roleId,String roleName)
	{
		this.roleId = roleId;
		this.roleName = roleName;
	}
	
	/**
	 * roleId
	 */
	@JsonField
	private int roleId;
	
	/**
	 * roleName
	 */
	@JsonField
	String roleName;
	
	

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
