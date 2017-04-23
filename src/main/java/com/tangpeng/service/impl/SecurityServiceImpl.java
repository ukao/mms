package com.tangpeng.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.auth.Right;
import com.tangpeng.auth.RightType;
import com.tangpeng.auth.Role;
import com.tangpeng.auth.User;
import com.tangpeng.db.DBUtils;
import com.tangpeng.exception.ErrorCode;
import com.tangpeng.exception.GarageException;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.iface.SecurityService;
import com.tangpeng.service.sql.SecuritySql;
import com.tangpeng.utils.I18nService;

public class SecurityServiceImpl implements SecurityService {

	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);

	private I18nService i18nService;
	
	private DataSource dataSource;
	
	@Override
	public Pair<List<User>,Integer> getUserList(User condition,int startRow,int endRow) {

		List<User> list = New.arrayList();
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		//不包含超级管理员
		String where=" where b.roleId=c.roleId and a.userName = b.userName and b.roleId<>"+Role.ADMIN+" ";
		if( condition.getUserName() != null )
		{
			where +=" and  ( a.userName like ? or fullName like ?)";
		}
		
		if( condition.getRoleId() != -1 )
		{
			where += " and b.roleId="+condition.getRoleId();
		}
		
		if( condition.getRoleIds() != null )
		{
			where += " and b.roleId in("+condition.getRoleIds()+") ";
		}
		
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("select a.userName,fullName,b.roleId,roleName from T_USER a,T_USER_ROLE b,T_ROLE c "+ where );
			if( condition.getUserName() != null )
			{
				pst.setString(1, "%"+condition.getUserName()+"%");
				pst.setString(2, "%"+condition.getUserName()+"%");
			}
			rs = pst.executeQuery();
			while( rs.next() )
			{
				User user = new User(rs.getString("userName"),rs.getString("fullName"),"");
				user.setRoleId(rs.getInt("roleId"));
				user.setRoleName(rs.getString("roleName"));
				list.add(user);
			}
		} 
		catch (SQLException e) 
		{
			logger.warn("query user error!", e);
		}
		return New.pair(list,list.size());
	}

	@Override
	public Pair<List<Role>,Integer> getRoleList(String keyword,int startRow,int endRow){

		List<Role> list = New.arrayList();
		String sql = "select roleId,roleName from T_ROLE ";
		String where = " where roleId<>"+Role.ADMIN +" ";
		if( keyword != null )
		{
			where += " and roleName like ?";
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(sql+where);
		    if( keyword != null )
			{
		    	pst.setString(1, "%"+keyword+"%");
			}
				 
			rs = pst.executeQuery();
			while(rs.next())
			{
				int roleId = rs.getInt("roleId");
				String roleName = rs.getString("roleName");
				list.add(new Role(roleId, roleName));
			}
		} 
		catch (SQLException e) 
		{
			logger.warn("", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, list.size());
	}

	
	@Override
	public List<Right> getRightByRole(int roleId) {
		String sql = null;
		//查询
		if( roleId == Role.ADMIN )
		{
			sql = "select actionNo,opId,parentId,name,type from T_RIGHT";
		}
		else
		{
			sql = "select actionNo,a.opId,parentId,name,type from T_RIGHT a,T_ROLE_RIGHT b where b.roleId = "+roleId+" and a.opId=b.opId ";
		}
		
		List<Right> listRight = new ArrayList<Right>();
		Connection con = null;
		Statement st = null;
		ResultSet rs = null;
		try
		{
			con = dataSource.getConnection();
			st = con.createStatement();
			rs = st.executeQuery(sql);
			while(rs.next())
			{
				int actionNo = rs.getInt("actionNo");
				String parentId = rs.getString("parentId");
				String opId = rs.getString("opId");
				String name = rs.getString("name");
				int type = rs.getInt("type");
				listRight.add(new Right(actionNo, parentId, opId, name,type));
			}
		} 
		catch (SQLException e) 
		{
			logger.warn("", e);
		}
		finally
		{
			DBUtils.release(rs, st, con);
		}
		return listRight;
	}

	@Override
	public void addUser(User user) throws Exception {
		
		/**
		 * 如果已存在，则抛出异常
		 */
		if( this.getUser(user.getUserName()) != null )
		{
			throw new Exception(i18nService.getLabel("common.operation.username.deplicated"));
		}
		Connection con = null;
		PreparedStatement pst = null;
		try
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			//插入用户信息表
			pst = con.prepareStatement(SecuritySql.SQL_INSERT_T_USER);
			pst.setString(1 , user.getUserName() );
			pst.setString(2, user.getFullName());
			pst.setString(3, user.getPassword());
			pst.executeUpdate();
			//必须commit
			
			//插入用户角色对应信息表
			pst = con.prepareStatement(SecuritySql.SQL_INSERT_T_USER_ROLE);
			pst.setString(1, user.getUserName());
			pst.setInt(2, user.getRoleId());
			pst.executeUpdate();
			con.commit();
		}
		catch (SQLException e)
		{
			try 
			{
				con.rollback();
			} 
			catch (SQLException e1) 
			{
				logger.warn("Rollback error");
			}
			logger.warn(e.getMessage(),e);
			throw new Exception("操作数据库出错");
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modifyUser(User user) throws Exception
	{
		Connection con = null;
		PreparedStatement pst = null;
		try
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			
			String changePwd = "";
			if(user.getPassword() != null )
			{
				changePwd=",password =?";
			}
			//修改用户信息表
			int i = 1;
			pst = con.prepareStatement("update T_USER set fullname=?"+changePwd+" where userName=?");
			pst.setString(i++, user.getFullName());
			if( user.getPassword() != null )
			{
				pst.setString(i++, user.getPassword());	
			}
			pst.setString(i++, user.getUserName());
			pst.executeUpdate();

			//修改用户角色信息表
			pst = con.prepareStatement("update T_USER_ROLE set roleId = ? where userName=?");
			pst.setInt(1,user.getRoleId() );
			pst.setString(2, user.getUserName());
			pst.executeUpdate();
			
			con.commit();
		}
		catch (SQLException e)
		{
			try 
			{
				con.rollback();
			} 
			catch (SQLException e1) 
			{
				logger.warn("Rollback error");
			}
			logger.warn(e.getMessage(),e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteUser(String userName) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			
			//删除用户信息表
			pst = con.prepareStatement("delete from T_USER where userName=?");
			pst.setString(1, userName);
			pst.executeUpdate();

			//删除用户角色信息表
			pst = con.prepareStatement("delete from T_USER_ROLE where userName=?");
			pst.setString(1, userName);
			pst.executeUpdate();
			
			pst.executeBatch();
			con.commit();
		}
		catch (SQLException e)
		{
			try 
			{
				con.rollback();
			} 
			catch (SQLException e1) 
			{
				logger.warn("Rollback error");
			}
			logger.warn(e.getMessage(),e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public List<Right> getMenuTree(int roleId) {
		String sql = null;
		//查询不是root以及type为menu的菜单
		if(roleId == Role.ADMIN)
		{
			sql = "select actionNo,opId,parentId,name from T_RIGHT where opId != 'root' and type="+RightType.MENU.type();
		}
		else
		{
			sql = "select actionNo,a.opId,parentId,name from T_RIGHT a,T_ROLE_RIGHT b where b.roleId = "+roleId+" and a.opId=b.opId and a.opId != 'root' and type="+RightType.MENU.type();
		}
		
		List<Right> listRight = new ArrayList<Right>();
		Connection con = null;
		Statement st = null;
		ResultSet rs = null;
		try
		{
			con = dataSource.getConnection();
			st = con.createStatement();
			rs = st.executeQuery(sql);
			while(rs.next())
			{
				int actionNo = rs.getInt("actionNo");
				String parentId = rs.getString("parentId");
				String opId = rs.getString("opId");
				String name = rs.getString("name");
				listRight.add(new Right(actionNo, parentId, opId, name, RightType.MENU.type()));
			}
		} 
		catch (SQLException e) 
		{
			logger.warn("", e);
		}
		finally
		{
			DBUtils.release(rs, st, con);
		}
		return listRight;
	}

	@Override
	public List<Right> getUserRight(int userId) {
		// TODO Auto-generated method stub
		return null;
	}

	
	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public User getUser(String userName) 
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("select a.userName,fullName,password,roleId from T_USER a,T_USER_ROLE b where"
					+ " a.userName=b.userName and a.userName=?");
			pst.setString(1, userName);
			rs = pst.executeQuery();
			if( rs.next() )
			{
				User user = new User(rs.getString(1),rs.getString(2), rs.getString(3));
				//预留如果以后有一个用户多个角色的时候
				user.setRoleId(rs.getInt(4));
				return user;
			}
		}
		catch (SQLException e) 
		{
			logger.warn("GetUser error!",e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see com.tangpeng.service.iface.SecurityService#addRole(java.lang.String, java.util.List)
	 */
	@Override
	public void addRole(String roleName, String[] opList)
			throws GarageException {
		Connection conn = null;
		PreparedStatement pst = null;
		try 
		{
			int roleId = insertIntoRole(roleName);
			conn = this.dataSource.getConnection();
			conn.setAutoCommit(false);
			for (String opId : opList) 
			{
				pst = conn.prepareStatement("insert into T_ROLE_RIGHT(roleId,opId) values(?,?)");
				pst.setInt(1,roleId);
				pst.setString(2,opId);
				pst.executeUpdate();
			}
			conn.commit();
		}
		catch(SQLException e)
		{
			throw new GarageException(ErrorCode.DB_OPERAOTR_ERROR, e);
		}
		finally
		{
			DBUtils.release(null, pst, conn);
		}
	}
	
	@Override
	public void modifyRole(int roleId, String[] opList)
			throws Exception {
		Connection conn = null;
		PreparedStatement pst = null;
		PreparedStatement delete = null;
		try 
		{
			conn = this.dataSource.getConnection();
			conn.setAutoCommit(false);
			
			delete = conn.prepareStatement("delete from T_ROLE_RIGHT where roleId=?");
			delete.setInt(1, roleId);
			delete.executeUpdate();
			
			for (String opId : opList) 
			{
				pst = conn.prepareStatement("insert into T_ROLE_RIGHT(roleId,opId) values(?,?)");
				pst.setInt(1,roleId);
				pst.setString(2,opId);
				pst.executeUpdate();
			}
			conn.commit();
		}
		catch(Exception e)
		{
			throw e;
		}
		finally
		{
			DBUtils.release(null, delete, conn);
			DBUtils.release(null, pst, conn);
		}
	}
	
	/**
	 * 
	 * @param roleName
	 * @return
	 * @throws SQLException 
	 */
	private int insertIntoRole(String roleName) throws SQLException
	{
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		try 
		{
			conn = this.dataSource.getConnection();
			//插入ROLE数据
			st = conn.createStatement();
			st.execute("insert into T_ROLE(roleName) values('"+roleName+"')");
			rs = st.executeQuery("select roleId from T_ROLE where roleName = '"+roleName+"'");
			if( rs.next() )
			{
				return rs.getInt(1);
			}
			else
			{
				throw new SQLException("Insert into T_Role Error!");
			}
		}
		finally
		{
			DBUtils.release(rs, st, conn);
		}
	}

	@Override
	public void deleteRole(int roleId) throws GarageException 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			
			//删除用户信息表
			pst = con.prepareStatement("delete from T_ROLE where roleId=?");
			pst.setInt(1, roleId);
			pst.executeUpdate();

			//删除用户角色信息表
			pst = con.prepareStatement("delete from T_ROLE_RIGHT where roleId=?");
			pst.setInt(1, roleId);
			pst.executeUpdate();
			
			pst.executeBatch();
			con.commit();
		}
		catch (SQLException e)
		{
			try 
			{
				con.rollback();
			} 
			catch (SQLException e1) 
			{
				logger.warn("Rollback error");
			}
			logger.warn(e.getMessage(),e);
			throw new GarageException(ErrorCode.DB_OPERAOTR_ERROR,e);
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void changePwd(User user) throws Exception 
	{
		
		Connection con = null;
		PreparedStatement pst = null;
		try
		{
			con = dataSource.getConnection();
			//删除用户信息表
			pst = con.prepareStatement("update T_USER set password=? where userName=?");
			pst.setString(1, user.getPassword());
			pst.setString(2, user.getUserName());
			pst.executeUpdate();
		}
		catch (SQLException e)
		{
			logger.warn(e.getMessage(),e);
			throw new Exception(e);
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	

}
