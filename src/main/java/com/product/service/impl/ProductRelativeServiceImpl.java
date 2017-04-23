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

import com.product.product.ProductRelative;
import com.product.service.iface.ProductRelativeService;
import com.product.service.sql.ProductRelativeSql;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.impl.SecurityServiceImpl;
import com.tangpeng.utils.I18nService;

public class ProductRelativeServiceImpl implements ProductRelativeService {


	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	private DataSource dataSource;
	
	private I18nService i18nService;
	/**
	 * 配置属性
	 */
	private Map<String,String> config;
	
	@Override
	public Pair<List<ProductRelative>, Integer> getProductRelativeList(ProductRelative bean, int startRow,
			int endRow) {
		List<ProductRelative> list = New.arrayList();
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
			
			if( bean.getProduct_id() != null )
			{
				where = ProductRelativeSql.CONDITION_PRODUCT_ID;
			}
			if(bean.getChannel_id() != null )
			{
				where += ProductRelativeSql.CONDITION_CHANNEL_ID;
			}
			if( bean.getName() != null )
			{
				where += ProductRelativeSql.CONDITION_NAME_LIKE;
			}
			if( bean.getExtraction_category() != null)
			{
				where += ProductRelativeSql.CONDITION_EXTRACTION_CATEGORY;
			}
			
			pst = con.prepareStatement( DBUtils.addPaging( ProductRelativeSql.QUERY + where,startRow,endRow));
			int i = 1;
			if( bean.getProduct_id() != null )
			{
				pst.setString(i++, bean.getProduct_id());	
			}
			if( bean.getChannel_id() != null )
			{
				pst.setString(i++, bean.getChannel_id());	
			}
			if( bean.getName() != null )
			{
				pst.setString(i++, "%"+bean.getName()+"%");
				pst.setString(i++, "%"+bean.getName()+"%");
			}
			if( bean.getExtraction_category()!=null)
			{
				pst.setString(i++, bean.getExtraction_category());
			}
			rs = pst.executeQuery();
			while(rs.next())
			{
				ProductRelative s = new ProductRelative();
				s.setDesc(rs.getString("description"));
				s.setName(rs.getString("name"));
				s.setProduct_id(rs.getString("product_id"));
				s.setChannel_id(rs.getString("channel_id"));
				s.setSdk_id(rs.getString("sdk_id"));
				s.setProduct_name(rs.getString("product_name"));
				s.setChannel_name(rs.getString("channel_name"));
				s.setSdk_name(rs.getString("sdk_name"));
//				s.setRate(rs.getString("rate"));
				s.setExtraction_category(rs.getString("extraction_category"));
				s.setExtraction_num(rs.getString("extraction_num"));
				s.setId(rs.getString("id"));
				s.setAttachmentRelativePath(rs.getString("file_relative_path"));
				list.add(s);
			}
			
			i = 1;
			pstCount = con.prepareStatement(ProductRelativeSql.QUERY_COUNT+where);

			if( bean.getProduct_id() != null )
			{
				pstCount.setString(i++, bean.getProduct_id());	
			}
			if( bean.getChannel_id() != null )
			{
				pstCount.setString(i++, bean.getChannel_id());	
			}
			if( bean.getName() != null )
			{
				pstCount.setString(i++, "%"+bean.getName()+"%");
				pstCount.setString(i++, "%"+bean.getName()+"%");
			}
			if( bean.getExtraction_category()!=null)
			{
				pstCount.setString(i++, bean.getExtraction_category());
			}
			
			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query ProductRelative Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}
	
	

	@Override
	public void updateFilePath(String id,String relativePath) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductRelativeSql.MODIFY_FILE);
			pst.setString(1, relativePath);
			pst.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
			pst.setString(3, id);
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify ProductRelative Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void add(ProductRelative bean) throws Exception 
	{
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductRelativeSql.ADD);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getProduct_id());
			pst.setString(3, bean.getChannel_id());
			pst.setString(4, bean.getSdk_id());
//			pst.setFloat(5, Float.parseFloat(bean.getRate()));
			pst.setString(5, bean.getExtraction_category());
			pst.setString(6, bean.getExtraction_num());
			pst.setString(7, bean.getDesc());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add ProductRelative Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	

	@Override
	public void modify(ProductRelative bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductRelativeSql.MODIFY);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getProduct_id());
			pst.setString(3, bean.getChannel_id());
			pst.setString(4, bean.getSdk_id());
//			pst.setFloat(5, Float.parseFloat(bean.getRate()));
			pst.setString(5, bean.getExtraction_category());
			pst.setString(6, bean.getExtraction_num());
			pst.setString(7, bean.getDesc());
			pst.setString(8, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify ProductRelative Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void delete(ProductRelative bean) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductRelativeSql.DELETE);
			pst.setString(1, bean.getId());
			pst.executeUpdate();

			String oldFile = config.get(ProductRelative.ROOT_PATH_KEY) +bean.getAttachmentRelativePath();
			File file = new File(oldFile);
			if(file.exists())
			{
				file.delete();
			}
		}
		catch (SQLException e) 
		{
			logger.error("Delete ProductRelative Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	private boolean nameExsits(ProductRelative bean)
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductRelativeSql.QUERY+ProductRelativeSql.CONDITION_NAME_EQUIP);
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
			logger.warn("Add ProductRelative Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return false;
	}


	@Override
	public ProductRelative getProductRelativeById(String id) {
		ProductRelative productRelative = new ProductRelative();
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement( ProductRelativeSql.QUERY + ProductRelativeSql.CONDITION_ID_EQUIP);
			pst.setString(1, id);	
			rs = pst.executeQuery();
			if(rs.next())
			{
				productRelative.setDesc(rs.getString("description"));
				productRelative.setName(rs.getString("name"));
				productRelative.setProduct_id(rs.getString("product_id"));
				productRelative.setChannel_id(rs.getString("channel_id"));
				productRelative.setSdk_id(rs.getString("sdk_id"));
				productRelative.setProduct_name(rs.getString("product_name"));
				productRelative.setChannel_name(rs.getString("channel_name"));
				productRelative.setSdk_name(rs.getString("sdk_name"));
				productRelative.setRate(rs.getString("rate"));
				productRelative.setId(rs.getString("id"));
				productRelative.setAttachmentRelativePath(rs.getString("file_relative_path"));
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query ProductRelative Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		
		return productRelative;
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
