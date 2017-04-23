package com.product.service.impl;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.Manufacturer.Sdk;
import com.product.service.iface.SdkService;
import com.product.service.sql.SdkSql;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.impl.SecurityServiceImpl;
import com.tangpeng.utils.I18nService;

public class SdkServiceImpl implements SdkService {


	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	private DataSource dataSource;
	
	private I18nService i18nService;
	/**
	 * 配置属性
	 */
	private Map<String,String> config;
	
	@Override
	public Pair<List<Sdk>, Integer> getSdkList(Sdk bean, int startRow,
			int endRow) {
		List<Sdk> list = New.arrayList();
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
			if( bean.getName() != null )
			{
				where = SdkSql.CONDITION_NAME;
			}
			
			if( bean.getM_id() != null )
			{
				where +=SdkSql.CONDITION_M_ID;
			}
			
			pst = con.prepareStatement( DBUtils.addPaging(SdkSql.QUERY + where, startRow, endRow));
			int i = 1;
			if( bean.getName() != null )
			{
				pst.setString(i++, "%"+bean.getName()+"%");	
			}
			if( bean.getM_id() != null )
			{
				pst.setString(i++, bean.getM_id());	
			}
			
			rs = pst.executeQuery();
			while(rs.next())
			{
				Sdk s = new Sdk();
				s.setDesc(rs.getString("description"));
				s.setName(rs.getString("name"));
				s.setM_id(rs.getString("m_id"));
				s.setM_name(rs.getString("m_name"));
				s.setVersion(rs.getString("version"));
				s.setRate(rs.getString("rate"));
				s.setId(rs.getString("id"));
				s.setAttachmentRelativePath(rs.getString("file_relative_path"));
				s.setAttachmentRelativePath(rs.getString("file_relative_path"));
				s.setoFileName(rs.getString("orginal_file_name"));
				list.add(s);
			}
			
			i = 1;
			pstCount = con.prepareStatement(SdkSql.QUERY_COUNT+where);
			if( bean.getName() != null )
			{
				pstCount.setString(i++, "%"+bean.getName()+"%");
			}
			if( bean.getM_id() != null )
			{
				pstCount.setString(i++, bean.getM_id());	
			}
			
			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Sdk Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, con);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}
	
	

	@Override
	public void updateFilePath(String id,String relativePath,String oFileName) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(SdkSql.MODIFY_FILE);
			pst.setString(1, relativePath);
			pst.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
			pst.setString(3, oFileName);
			pst.setString(4, id);
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify Sdk Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void add(Sdk bean) throws Exception 
	{
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.and.version.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(SdkSql.ADD);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getM_id());
			pst.setString(3, bean.getVersion());
			pst.setString(4, bean.getDesc());
			pst.setString(5, bean.getRate());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add SDK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	

	@Override
	public void modify(Sdk bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.and.version.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(SdkSql.MODIFY);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getM_id());
			pst.setString(3, bean.getVersion());
			pst.setString(4, bean.getDesc());
			pst.setString(5, bean.getRate());
			pst.setString(6, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify Sdk Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void delete(Sdk bean) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(SdkSql.DELETE_SDK);
			pst.setString(1, bean.getId());
			pst.executeUpdate();

			String oldFile = config.get(Sdk.ROOT_PATH_KEY) +bean.getAttachmentRelativePath();
			File file = new File(oldFile);
			if(file.exists())
			{
				file.delete();
			}
		}
		catch (SQLException e) 
		{
			logger.error("Delete SDK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	private boolean nameExsits(Sdk bean)
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(SdkSql.QUERY_SDK+SdkSql.CONDITION_NAME_EQUIP+SdkSql.CONDITION_VERSION_EQUIP);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getVersion());
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
			logger.warn("Add SDK Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return false;
	}


	@Override
	public Sdk getSdkById(String id) {
		Sdk sdk = new Sdk();
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement( SdkSql.QUERY + SdkSql.CONDITION_ID_EQUIP);
			pst.setString(1, id);	
			rs = pst.executeQuery();
			if(rs.next())
			{
				sdk.setDesc(rs.getString("description"));
				sdk.setName(rs.getString("name"));
				sdk.setM_id(rs.getString("m_id"));
				sdk.setVersion(rs.getString("version"));
				sdk.setId(rs.getString("id"));
				sdk.setAttachmentRelativePath(rs.getString("file_relative_path"));
				sdk.setoFileName(rs.getString("orginal_file_name"));
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Sdk Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		
		return sdk;
	}




	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}



	public void setConfig(Map<String, String> config) {
		this.config = config;
	}


}
