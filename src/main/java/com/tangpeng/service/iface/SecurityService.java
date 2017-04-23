package com.tangpeng.service.iface;

import java.util.List;

import com.tangpeng.auth.Right;
import com.tangpeng.auth.Role;
import com.tangpeng.auth.User;
import com.tangpeng.exception.GarageException;
import com.tangpeng.sdk.Pair;

/**
 * 安全相关服务
 * @author tangpeng
 */
public interface SecurityService {
	
	static String ROLE = SecurityService.class.getSimpleName();
	
	/**
	 * 
	 * 分页获取用户信息
	 * @param keyword  按关键字查询
	 * @param startRow 起始行 start with 0 
	 * @param endRow   结束行 no limit
	 * @return Pair fs 数据 sn totalRow
	 */
	Pair<List<User>,Integer> getUserList(User user,int startRow,int endRow);
	
	/**
	 * 分页获取角色信息(虽然不会分页，呵呵)
	 * @param keyword  按关键字查询
	 * @param startRow 起始行 start with 0 
	 * @param endRow   结束行 no limit
	 * @return Pair fs 数据 sn totalRow
	 */
	Pair<List<Role>,Integer> getRoleList(String keyword,int startRow,int endRow);

	/**
	 * 根据用户名获取用户
	 * @param userName
	 * @return null or user
	 */
	User getUser(String userName);
	
	/**
	 * 获取角色操作权限
	 * if roleId<0 getAll
	 * @param roleId
	 * @return
	 */	
	List<Right> getRightByRole(int roleId);
	

	/**
	 * 获取角色操作权限
	 * @param userId
	 * @return
	 */	
	List<Right> getUserRight(int userId);
	
	/**
	 * 获取角色菜单权限
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
