package com.product.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.Manufacturer.Manufacturer;
import com.product.service.iface.ManufacturerService;
import com.product.service.sql.ManufacturerSql;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.impl.SecurityServiceImpl;
import com.tangpeng.utils.I18nService;

public class ManufacturerServiceImpl implements ManufacturerService {


	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	private DataSource dataSource;
	
	private I18nService i18nService;
	
	@Override
	public Pair<List<Manufacturer>, Integer> getManufacturerList(String keyword,
			int startRow, int endRow) {
		List<Manufacturer> list = New.arrayList();
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
				where = ManufacturerSql.CONDITION_NAME;
			}
			pst = con.prepareStatement( DBUtils.addPaging(ManufacturerSql.QUERY + where,startRow,endRow));
			int i = 1;
			if( keyword != null )
			{
				pst.setString(i++, "%"+keyword+"%");	
			}
			rs = pst.executeQuery();
			while(rs.next())
			{
				Manufacturer m = new Manufacturer();
				m.setDesc(rs.getString("description"));
				m.setName(rs.getString("name"));
				m.setId(rs.getString("id"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement(ManufacturerSql.QUERY_COUNT+where);
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
			logger.error("Query Manufacturer Error!", e);
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
	public void add(Manufacturer bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ManufacturerSql.ADD);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add Manufacturer Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modify(Manufacturer bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ManufacturerSql.MODIFY);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.setString(3, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify Manufacturer Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	/**
	 * 名称是否已存在
	 * @param bean
	 * @return
	 */
	private boolean nameExsits(Manufacturer bean)
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ManufacturerSql.QUERY+ManufacturerSql.CONDITION_NAME_EQUIP);
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
			logger.warn("Add Manufacturer Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return false;
	}

	@Override
	public void delete(Manufacturer bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			pst = con.prepareStatement(ManufacturerSql.DELETE_M);
			pst.setString(1, bean.getId());
			pst.executeUpdate();
			pst = con.prepareStatement(ManufacturerSql.DELETE_SDK);
			pst.setString(1, bean.getId());
			pst.executeUpdate();
			con.commit();
		}
		catch (SQLException e) 
		{
			logger.error("Delete Manufacturer Error!", e);
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

	
	
	
}
