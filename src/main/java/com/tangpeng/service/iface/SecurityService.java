package com.tangpeng.service.iface;

import java.util.List;

import com.tangpeng.auth.Right;
import com.tangpeng.auth.Role;
import com.tangpeng.auth.User;
import com.tangpeng.exception.GarageException;
import com.tangpeng.sdk.Pair;

/**
 * ��ȫ��ط���
 * @author tangpeng
 */
public interface SecurityService {
	
	static String ROLE = SecurityService.class.getSimpleName();
	
	/**
	 * 
	 * ��ҳ��ȡ�û���Ϣ
	 * @param keyword  ���ؼ��ֲ�ѯ
	 * @param startRow ��ʼ�� start with 0 
	 * @param endRow   ������ no limit
	 * @return Pair fs ���� sn totalRow
	 */
	Pair<List<User>,Integer> getUserList(User user,int startRow,int endRow);
	
	/**
	 * ��ҳ��ȡ��ɫ��Ϣ(��Ȼ�����ҳ���Ǻ�)
	 * @param keyword  ���ؼ��ֲ�ѯ
	 * @param startRow ��ʼ�� start with 0 
	 * @param endRow   ������ no limit
	 * @return Pair fs ���� sn totalRow
	 */
	Pair<List<Role>,Integer> getRoleList(String keyword,int startRow,int endRow);

	/**
	 * �����û�����ȡ�û�
	 * @param userName
	 * @return null or user
	 */
	User getUser(String userName);
	
	/**
	 * ��ȡ��ɫ����Ȩ��
	 * if roleId<0 getAll
	 * @param roleId
	 * @return
	 */	
	List<Right> getRightByRole(int roleId);
	

	/**
	 * ��ȡ��ɫ����Ȩ��
	 * @param userId
	 * @return
	 */	
	List<Right> getUserRight(int userId);
	
	/**
	 * ��ȡ��ɫ�˵�Ȩ��
	 * @param roleId
	 * @return
	 */
	List<Right> getMenuTree(int roleId);
	
	void addRole(String roleName,String[] opList) throws GarageException;
	
	void addUser(User user) throws Exception;
	
	void modifyUser(User user) throws Exception;
	
	void deleteUser(String userName) throws Exception;
	
	void deleteRole(int roleId) throws GarageException;
	
	void changePwd(User user) throws Exception;

	void modifyRole(int roleId, String[] opList) throws Exception;
	
	
}
