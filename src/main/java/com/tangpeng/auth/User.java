package com.tangpeng.auth;

import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.JsonField;

/**
 * �û�������Ϣ
 * @author tangpeng
 */
public class User extends BaseBean{
	
	/**
	 * session����key �û�������Ϣ
	 */
	public static final String SESSION_ID = "user";
	
	/**
	 * session����key ����Ȩ��
	 */
	public static final String SESSION_RIGHT_ID = "right";

	
	public User()
	{
		
	}
	
	/**
	 * ���췽��
	 * @param userName
	 * @param fullName
	 * @param password
	 */
	public User(String userName, String fullName, String password) {
		super();
//		this.userId = userId;
		this.userName = userName;
		this.fullName = fullName;
		this.password = password;
	}
	/**
	 * id
	 */
//	@JsonField
//	private int userId;
	/**
	 * �û���
	 */
	@JsonField
	private String userName;
	/**
	 * ����
	 */
	@JsonField
	private String password;
	/**
	 * �û�ȫ��
	 */
	@JsonField
	private String fullName;
	
	private String old_password;
	
	/**
	 * ��ɫ��
	 */
	@JsonField
	private int roleId = -1;
	
	@JsonField
	private String roleName;
	
	/**
	 * ��ʽ3,4,5
	 */
	private String roleIds;
	
	private String validatorCode;
	
	
	
	public String getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
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

	public String getOld_password() {
		return old_password;
	}

	public void setOld_password(String old_password) {
		this.old_password = old_password;
	}

	public String getValidatorCode() {
		return validatorCode;
	}

	public void setValidatorCode(String validatorCode) {
		this.validatorCode = validatorCode;
	}
	
	
}
