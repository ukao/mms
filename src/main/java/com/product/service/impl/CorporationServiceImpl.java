package com.product.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.product.Corporation;
import com.product.service.iface.CorporationService;
import com.product.service.sql.ChannelSql;
import com.product.service.sql.CorporationSql;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.impl.SecurityServiceImpl;
import com.tangpeng.utils.I18nService;

public class CorporationServiceImpl implements CorporationService {


	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	private DataSource dataSource;
	
	private I18nService i18nService;
	
	@Override
	public Pair<List<Corporation>, Integer> getCorporationList(String keyword,
			int startRow, int endRow) {
		List<Corporation> list = New.arrayList();
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
			pst = con.prepareStatement( DBUtils.addPaging(CorporationSql.QUERY + where,startRow,endRow));
			int i = 1;
			if( keyword != null )
			{
				pst.setString(i++, "%"+keyword+"%");	
			}
			rs = pst.executeQuery();
			while(rs.next())
			{
				Corporation m = new Corporation();
				m.setDesc(rs.getString("description"));
				m.setName(rs.getString("name"));
				m.setId(rs.getString("id"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement(CorporationSql.QUERY_COUNT+where);
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
			logger.error("Query Corporation Error!", e);
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
	public void add(Corporation bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(CorporationSql.ADD);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add Corporation Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modify(Corporation bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(CorporationSql.MODIFY);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.setString(3, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify Corporation Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	
	@Override
	public void delete(Corporation bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			//ɾ������
			pst = con.prepareStatement(CorporationSql.DELETE_P_R);
			pst.setString(1, bean.getId());
			pst.executeUpdate();
			//ɾ����Ʒ
			pst = con.prepareStatement(CorporationSql.DELETE_P);
			pst.setString(1, bean.getId());
			pst.executeUpdate();
			//ɾ����˾
			pst = con.prepareStatement(CorporationSql.DELETE);
			pst.setString(1, bean.getId());
			pst.executeUpdate();
			con.commit();
		}
		catch (SQLException e) 
		{
			logger.error("Delete Corporation Error!", e);
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
	 * �����Ƿ��Ѵ���
	 * @param bean
	 * @return
	 */
	private boolean nameExsits(Corporation bean)
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(CorporationSql.QUERY+CorporationSql.CONDITION_NAME_EQUIP);
			pst.setString(1, bean.getName());
			rs = pst.executeQuery();
			if(rs.next())
			{
				String id = rs.getString("id");
				//1.���idΪnull��˵������
				//2.id��Ϊ�գ������ǰid���������ݿ������ID��˵���޸ĺ���������������ظ�
				if( bean.getId() == null || !id.equals(bean.getId()))
				{
					return true;
				}
			}
		}
		catch (SQLException e) 
		{
			logger.warn("Add Corporation Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return false;
	}

	
	
}
