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

import com.product.product.Product;
import com.product.product.ProductRelative;
import com.product.service.iface.ProductRelativeService;
import com.product.service.iface.ProductService;
import com.product.service.sql.ProductSql;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.service.impl.SecurityServiceImpl;
import com.tangpeng.utils.I18nService;

public class ProductServiceImpl implements ProductService {


	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	private DataSource dataSource;
	
	private I18nService i18nService;
	
	private ProductRelativeService productRelativeService;
	
	/**
	 * 配置属性
	 */
	private Map<String,String> config;
	
	@Override
	public Pair<List<Product>, Integer> getProductList(Product bean, int startRow,
			int endRow) {
		List<Product> list = New.arrayList();
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
				where = ProductSql.CONDITION_NAME;
			}
			
			pst = con.prepareStatement( DBUtils.addPaging(ProductSql.QUERY + where,startRow,endRow));
			int i = 1;
			if( bean.getName() != null )
			{
				pst.setString(i++, "%"+bean.getName()+"%");	
			}
			
			rs = pst.executeQuery();
			while(rs.next())
			{
				Product s = new Product();
				s.setId(rs.getString("id"));
				s.setDesc(rs.getString("description"));
				s.setName(rs.getString("name"));
				s.setCorporation_id(rs.getString("corporation_id"));
				s.setVersion(rs.getString("version"));
				s.setApp_channel(rs.getString("app_channel"));
				s.setApp_key(rs.getString("app_key"));
				s.setCorporation_name(rs.getString("corporation_name"));
				s.setAttachmentRelativePath(rs.getString("file_relative_path"));
				s.setoFileName(rs.getString("orginal_file_name"));
				list.add(s);
			}
			
			i = 1;
			pstCount = con.prepareStatement(ProductSql.QUERY_COUNT+where);
			if( bean.getName() != null )
			{
				pstCount.setString(i++, "%"+bean.getName()+"%");
			}
			
			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Product Error!", e);
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
			pst = con.prepareStatement(ProductSql.MODIFY_FILE);
			pst.setString(1, relativePath);
			pst.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
			pst.setString(3, oFileName);
			pst.setString(4, id);
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify Product filePath Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void add(Product bean) throws Exception 
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
			pst = con.prepareStatement(ProductSql.ADD);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.setString(3, bean.getApp_key());
			pst.setString(4, bean.getApp_channel());
			pst.setString(5, bean.getCorporation_id());
			pst.setString(6, bean.getVersion());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add Product Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	

	@Override
	public void modify(Product bean) throws Exception {
		if( nameExsits(bean) )
		{
			throw new Exception(i18nService.getLabel("common.operation.name.and.version.deplicated"));
		}
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductSql.MODIFY);
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.setString(3, bean.getApp_key());
			pst.setString(4, bean.getApp_channel());
			pst.setString(5, bean.getCorporation_id());
			pst.setString(6, bean.getVersion());
			pst.setString(7, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify Product Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void delete(Product bean) throws Exception {
		//如果改产品关联了渠道不能删除
		if(isRelativeChannel(bean.getId()))
		{
			throw new Exception(i18nService.getLabel("module.product.relative.product"));
		}
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductSql.DELETE);
			pst.setString(1, bean.getId());
			pst.executeUpdate();

			String oldFile = config.get(Product.ROOT_PATH_KEY) +bean.getAttachmentRelativePath();
			File file = new File(oldFile);
			if(file.exists())
			{
				file.delete();
			}
		}
		catch (SQLException e) 
		{
			logger.error("Delete Product Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	private boolean nameExsits(Product bean)
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement(ProductSql.QUERY+ProductSql.CONDITION_NAME_EQUIP+ProductSql.CONDITION_VERSION_EQUIP);
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
			logger.warn("Add Product Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return false;
	}

	private boolean isRelativeChannel(String id)
	{
		ProductRelative condition = new ProductRelative();
		condition.setProduct_id(id);
		Pair<List<ProductRelative>,Integer> pair = productRelativeService.getProductRelativeList(condition, 0, 2);
		if(pair.snd> 0)
		{
			return true;
		}
		return false;
	}

	@Override
	public Product getProductById(String id) {
		Product product = new Product();
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement( ProductSql.QUERY + ProductSql.CONDITION_ID_EQUIP);
			pst.setString(1, id);	
			rs = pst.executeQuery();
			if(rs.next())
			{
				product.setDesc(rs.getString("description"));
				product.setName(rs.getString("name"));
				product.setApp_key(rs.getString("app_key"));
				product.setApp_channel(rs.getString("app_channel"));
				product.setId(rs.getString("id"));
				product.setCorporation_id(rs.getString("corporation_id"));
				product.setCorporation_name(rs.getString("corporation_name"));
				product.setAttachmentRelativePath(rs.getString("file_relative_path"));
				product.setoFileName(rs.getString("orginal_file_name"));
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
		
		return product;
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



	public void setProductRelativeService(
			ProductRelativeService productRelativeService) {
		this.productRelativeService = productRelativeService;
	}
	

}
