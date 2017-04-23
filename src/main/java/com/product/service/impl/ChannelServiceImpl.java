package com.product.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.product.Channel;
import com.product.service.iface.ChannelService;
import com.product.service.sql.ChannelSql;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.impl.SecurityServiceImpl;
import com.tangpeng.utils.I18nService;

public class ChannelServiceImpl implements ChannelService {


	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	private DataSource dataSource;
	
	private I18nService i18nService;
	
	@Override
	public Pair<List<Channel>, Integer> getChannelList(String keyword,
			int startRow, int endRow) {
		List<Channel> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where = "";
		try 
		{
			con = dataSource.getConnection();
			if( keyword != null )
			{
				where = ChannelSql.CONDITION_NAME;
			}
			pst = con.prepareStatement( DBUtils.addPaging(ChannelSql.QUERY + where,startRow,endRow));
			int i = 1;
			if( keyword != null )
			{
				pst.setString(i++, "%"+keyword+"%");	
			}
			rs = pst.executeQuery();
			while(rs.next())
			{
				Channel m = new Channel();
				m.setDesc(rs.getString("description"));
				m.setName(rs.getString("name"));
				m.setUserName(rs.getString("username"));
				m.setId(rs.getString("id"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement(ChannelSql.QUERY_COUNT+where);
			if( keyword != null )
			{
				pstCount.setString(1, "%"+keyword+"%");
			}
			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Channel Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, con);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public void add(Channel bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ChannelSql.ADD);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.setString(3, bean.getUserName());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add Channel Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modify(Channel bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ChannelSql.MODIFY);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.setString(3, bean.getUserName());
			pst.setString(4, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify Channel Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	
	@Override
	public void delete(Channel bean) throws Exception 
	{
		if(isRelated(bean.getId()))
		{
			throw new Exception(i18nService.getLabel("module.product.relative.channel"));
		}
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ChannelSql.DELETE);
			pst.setString(1, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Delete Channel Error!", e);
			con.rollback();
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	/**
	 * 名称是否已存在
	 * @param bean
	 * @return
	 */
	private boolean isRelated(String id)
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ChannelSql.QUERY_RELATIVE);
			pst.setString(1, id);
			rs = pst.executeQuery();
			if(rs.next())
			{
				return true;
			}
		}
		catch (SQLException e) 
		{
			logger.warn("Add Channel Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return false;
	}

	
	/**
	 * 名称是否已存在
	 * @param bean
	 * @return
	 */
	private boolean nameExsits(Channel bean)
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ChannelSql.QUERY+ChannelSql.CONDITION_NAME_EQUIP);
			pst.setString(1, bean.getName());
			rs = pst.executeQuery();
			if(rs.next())
			{
				String id = rs.getString("id");
				//1.如果id为null，说明新增
				//2.id不为空，如果当前id不等于数据库里面的ID，说明修改后的名称与别的名称重复
				if( bean.getId() == null || !id.equals(bean.getId()))
				{
					return true;
				}
			}
		}
		catch (SQLException e) 
		{
			logger.warn("Add Channel Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return false;
	}

	@Override
	public Channel getChannelByUser(String user) 
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		Channel channel = new Channel();
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ChannelSql.QUERY+ChannelSql.CONDITION_USERNAME_EQUIP);
			pst.setString(1, user);
			rs = pst.executeQuery();
			if(rs.next())
			{
				channel.setId(rs.getString("id"));
				channel.setName(rs.getString("name"));
				channel.setUserName(rs.getString("username"));
				channel.setDesc(rs.getString("description"));
			}
		}
		catch (SQLException e) 
		{
			logger.warn("Get Channel Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return channel;
	}

	
	
}
