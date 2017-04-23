package com.product.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.config.FeeNode;
import com.product.config.ProductConfig;
import com.product.config.SdkConfig;
import com.product.service.iface.ConfigService;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;

public class ConfigServiceImpl implements ConfigService {

	private static final Logger logger = LoggerFactory.getLogger(ConfigServiceImpl.class);
	
	private DataSource dataSource;
	
	private String syncURL;
	
	@Override
	public Pair<List<FeeNode>, Integer> getFeeNodeTemplateList(FeeNode condition,
			int startRow, int endRow) {
		List<FeeNode> list = New.arrayList();
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

			
			if( condition.getProduct()!= null )
			{
				Pair<List<FeeNode>,Integer> pair=this.getFeeNodeRelativeList(condition, 0, 5);
				if( pair.snd > 0 )
				{
					condition.setStrategy_id(pair.fst.get(0).getStrategy_id());	
				}
				else
				{
					condition.setStrategy_id("-1");
				}
			}
			
			if( condition.getStrategy_id() != null )
			{
				where =  " and a.strategy_id ="+condition.getStrategy_id() +" " ;
			}
			
			pst = con.prepareStatement( DBUtils.addPaging(" select a.name,a.price,a.id,a.description,b.name as strategy_name,b.id as strategy_id "
					+ " from FEE_NODE_TEMPLATE a,FEE_NODE_STRATEGY b where a.STRATEGY_ID=b.id "
					+ where,startRow,endRow));
			rs = pst.executeQuery();
			while(rs.next())
			{
				FeeNode m = new FeeNode();
				m.setName(rs.getString("name"));
				m.setPrice(rs.getString("price"));
				m.setId(rs.getString("id"));
				m.setStrategy_name(rs.getString("strategy_name"));
				m.setStrategy_id(rs.getString("strategy_id"));
				m.setDesc(rs.getString("description"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) from FEE_NODE_TEMPLATE a where 1=1 " + where );

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query FEE_NODE_TEMPLATE Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public void addFeeNodeTemplate(FeeNode bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("insert into FEE_NODE_TEMPLATE(STRATEGY_ID,name,price,description) values(?,?,?,?)");
			pst.setString(1, bean.getStrategy_id());
			pst.setString(2, bean.getName());
			pst.setString(3, bean.getPrice());
			pst.setString(4, bean.getDesc());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add FEE_NODE_TEMPLATE Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modifyFeeNodeTemplate(FeeNode bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("update FEE_NODE_TEMPLATE set STRATEGY_ID=?,name=?,price=?,description=? where id=?");
			pst.setString(1, bean.getStrategy_id());
			pst.setString(2, bean.getName());
			pst.setString(3, bean.getPrice());
			pst.setString(4, bean.getDesc());
			pst.setString(5, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify FEE_NODE_TEMPLATE Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteFeeNodeTemplate(FeeNode bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("delete from FEE_NODE_TEMPLATE where id=?");
			pst.setString(1, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Delete FEE_NODE_TEMPLATE Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public Pair<List<ProductConfig>, Integer> getProductConfigList(
			ProductConfig condition, int startRow, int endRow) {
		List<ProductConfig> list = New.arrayList();
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
			if( condition.getProduct() != null )
			{
				where =  " where product ='"+condition.getProduct() +"'" ;
			}
			pst = con.prepareStatement( DBUtils.addPaging(" select * from PRODUCT_CONFIG " + where,startRow,endRow));
			rs = pst.executeQuery();
			while(rs.next())
			{
				ProductConfig m = new ProductConfig();
				m.setName(rs.getString("param_name"));
				m.setValue(rs.getString("param_value"));
				m.setId(rs.getString("id"));
				m.setDesc(rs.getString("description"));
				m.setProduct(rs.getString("product"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) from PRODUCT_CONFIG " + where );

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
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public void addProductConfig(ProductConfig bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("insert into PRODUCT_CONFIG(product,param_name,param_value,description) values(?,?,?,?)");
			pst.setString(1, bean.getProduct());
			pst.setString(2, bean.getName());
			pst.setString(3, bean.getValue());
			pst.setString(4, bean.getDesc());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add PRODUCT_CONFIG Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	

	@Override
	public void modifyProductConfig(ProductConfig bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("update PRODUCT_CONFIG set product=?,param_name=?,param_value=?,description=? where id=?");
			pst.setString(1, bean.getProduct());
			pst.setString(2, bean.getName());
			pst.setString(3, bean.getValue());
			pst.setString(4, bean.getDesc());
			pst.setString(5, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify PRODUCT_CONFIG Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteProductConfig(ProductConfig bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("delete from PRODUCT_CONFIG  where id=?");
			pst.setString(1, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Delete PRODUCT_CONFIG Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public Pair<List<SdkConfig>, Integer> getSdkConfigList(SdkConfig condition,
			int startRow, int endRow) {
		List<SdkConfig> list = New.arrayList();
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
			if( condition.getM_id() != null )
			{
				where =  " and m_id ='"+condition.getM_id() +"' " ;
			}
			pst = con.prepareStatement( DBUtils.addPaging(" select a.*,b.name as m_name from SDK_PARAM_INFO a,"
					+ "T_MANUFACTURER b where a.m_id=b.id " + where,startRow,endRow));
			rs = pst.executeQuery();
			while(rs.next())
			{
				SdkConfig m = new SdkConfig();
				m.setId(rs.getString("id"));
				m.setSdk_id(rs.getString("sdk_id"));
				m.setM_name(rs.getString("m_name"));
				m.setOrder_id(rs.getString("order_id"));
				m.setOperator(rs.getString("operator"));
				m.setPrice(rs.getString("price"));
				m.setSdk_param(rs.getString("sdk_param"));
				m.setSigner(rs.getString("signer"));
				m.setStatus(rs.getString("status"));
				m.setProduct(rs.getString("product"));
				m.setApp_key(rs.getString("app_key"));
				m.setPrice_unit(rs.getString("price_unit"));
				m.setM_id(rs.getString("m_id"));
				m.setResponse_code(rs.getString("response_code"));
				m.setHttp_method(rs.getString("http_method"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) from SDK_PARAM_INFO a,T_MANUFACTURER b where a.m_id=b.id " + where );

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
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public void addSdkConfig(SdkConfig bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("insert into SDK_PARAM_INFO(SDK_ID,ORDER_ID,PRICE,STATUS,OPERATOR,SIGNER,APP_KEY,PRODUCT,SDK_PARAM,M_ID,PRICE_UNIT,RESPONSE_CODE,HTTP_METHOD) values(?,?,?,?,?,?,?,?,?,?,?,?,?)");
			pst.setString(1, getSyncURLSeq());
			pst.setString(2, bean.getOrder_id());
			pst.setString(3, bean.getPrice());
			pst.setString(4,bean.getStatus());
			pst.setString(5, bean.getOperator());
			pst.setString(6, bean.getSigner());
			pst.setString(7, bean.getApp_key());
			pst.setString(8, bean.getProduct());
			pst.setString(9, bean.getSdk_param());
			pst.setString(10, bean.getM_id());
			pst.setString(11, bean.getPrice_unit());
			pst.setString(12, bean.getResponse_code());
			pst.setString(13, bean.getHttp_method());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add SDK_PARAM_INFO Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modifySdkConfig(SdkConfig bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("update SDK_PARAM_INFO set SDK_ID=?,ORDER_ID=?,PRICE=?,"
					+ "STATUS=?,OPERATOR=?,SIGNER=?,APP_KEY=?,PRODUCT=?,SDK_PARAM=?,M_ID=?,PRICE_UNIT=?,RESPONSE_CODE=?,HTTP_METHOD=? where id=?");
			pst.setString(1, bean.getSdk_id());
			pst.setString(2, bean.getOrder_id());
			pst.setString(3, bean.getPrice());
			pst.setString(4,bean.getStatus());
			pst.setString(5, bean.getOperator());
			pst.setString(6, bean.getSigner());
			pst.setString(7, bean.getApp_key());
			pst.setString(8, bean.getProduct());
			pst.setString(9, bean.getSdk_param());
			pst.setString(10, bean.getM_id());
			pst.setString(11, bean.getPrice_unit());
			pst.setString(12, bean.getResponse_code());
			pst.setString(13, bean.getHttp_method());
			pst.setString(14, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add SDK_PARAM_INFO Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteSdkConfig(SdkConfig bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("delete from SDK_PARAM_INFO  where id=?");
			pst.setString(1, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Delete SDK_PARAM_INFO Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}


	/**
	 * 获取序号
	 * @return
	 */
	private String getSyncURLSeq()
	{
		Connection con = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("select sdk_id from SDK_PARAM_INFO where id in(select max(id) from SDK_PARAM_INFO)");
			rs = pst.executeQuery();
			if(rs.next())
			{
				String url = rs.getString(1);
				int seq = Integer.parseInt(url.replaceFirst(syncURL, ""))+1;
				String str = ""+seq;
				for(;str.length()<5;)
				{
					str = "0" + str;
				}
				return syncURL+str;
			}
		}
		catch (Exception e) 
		{
			logger.error("Create SyncURL Error!", e);
		}
		finally
		{
			DBUtils.release(rs, pst, con);
		}
		return syncURL + "00001";
	}

	public void setSyncURL(String syncURL) {
		this.syncURL = syncURL;
	}

	@Override
	public void addFeeNodeStrategy(FeeNode bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("insert into FEE_NODE_STRATEGY(name,description) values(?,?)");
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add FEE_NODE_STRATEGY Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modifyFeeNodeStrategy(FeeNode bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("update FEE_NODE_STRATEGY set name=?,description=? where id=?");
			pst.setString(1, bean.getName());
			pst.setString(2, bean.getDesc());
			pst.setString(3, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify FEE_NODE_STRATEGY Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteFeeNodeStrategy(FeeNode bean) throws Exception {
		//删除策略需要将所有关联数据删除，谨慎使用删除操作
		Connection con = null;
		PreparedStatement pst_1 = null;
		PreparedStatement pst_2 = null;
		PreparedStatement pst_3 = null;
		try 
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			
			pst_1 = con.prepareStatement("delete from FEE_NODE_STRATEGY where id=?");
			pst_1.setString(1, bean.getId());
			pst_1.execute();
			
			pst_2 = con.prepareStatement("delete from FEE_NODE_TEMPLATE where STRATEGY_ID=?");
			pst_2.setString(1, bean.getId());
			pst_2.execute();
			
			pst_3 = con.prepareStatement("delete from FEE_NODE_RELATIVE where STRATEGY_ID=?");
			pst_3.setString(1, bean.getId());
			pst_3.execute();
			
			con.commit();
		}
		catch (SQLException e) 
		{
			try
			{
				con.rollback();
			}
			catch(Exception e1)
			{
				logger.error("Rollback FEE_NODE_STRATEGY Error!", e);	
			}
			logger.error("Delete FEE_NODE_STRATEGY Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst_1, null);
			DBUtils.release(null, pst_2, null);
			DBUtils.release(null, pst_3, con);
		}
	}

	@Override
	public void addFeeNodeRelative(FeeNode bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("insert into FEE_NODE_RELATIVE(STRATEGY_ID,PRODUCT) values(?,?)");
			pst.setString(1, bean.getStrategy_id());
			pst.setString(2, bean.getProduct());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add FEE_NODE_RELATIVE Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void modifyFeeNodeRelative(FeeNode bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("update FEE_NODE_RELATIVE set STRATEGY_ID=? where id=?");
			pst.setString(1, bean.getStrategy_id());
//			pst.setString(2, bean.getProduct());
			pst.setString(2, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify FEE_NODE_RELATIVE Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteFeeNodeRelative(FeeNode bean) throws Exception {
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("delete from FEE_NODE_RELATIVE where id=?");
			pst.setString(1, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Delete FEE_NODE_RELATIVE Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public Pair<List<FeeNode>, Integer> getFeeNodeStrategyList(
			FeeNode condition, int startRow, int endRow) {
		List<FeeNode> list = New.arrayList();
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
			if( condition.getName() != null )
			{
				where =  " where name like '%"+condition.getName() +"%' " ;
			}
			pst = con.prepareStatement( DBUtils.addPaging(" select * from FEE_NODE_STRATEGY "
					+ where,startRow,endRow));
			rs = pst.executeQuery();
			while(rs.next())
			{
				FeeNode m = new FeeNode();
				m.setName(rs.getString("name"));
				m.setId(rs.getString("id"));
				m.setDesc(rs.getString("description"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) from FEE_NODE_STRATEGY " + where );

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query FEE_NODE_STRATEGY Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Pair<List<FeeNode>, Integer> getFeeNodeRelativeList(
			FeeNode condition, int startRow, int endRow) {
		List<FeeNode> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where = " ";
		try 
		{
			con = dataSource.getConnection();
			if( condition.getProduct() != null )
			{
				where +=  " and a.product ='"+condition.getProduct() +"'" ;
			}

			if( condition.getStrategy_id() != null )
			{
				where +=  " and a.STRATEGY_ID ='"+condition.getStrategy_id() +"' " ;
			}
			
			pst = con.prepareStatement( DBUtils.addPaging(" select a.id,a.product,a.strategy_id,a.description,b.description as strategy_desc,b.name as strategy_name"
					+ " from FEE_NODE_RELATIVE a,FEE_NODE_STRATEGY b,T_PRODUCT_RELATIVE c where a.STRATEGY_ID = b.id and a.product = c.name "
					+ where,startRow,endRow));
			rs = pst.executeQuery();
			while(rs.next())
			{
				FeeNode m = new FeeNode();
				m.setStrategy_name(rs.getString("strategy_name"));
				m.setId(rs.getString("id"));
				m.setStrategy_desc(rs.getString("strategy_desc"));
				m.setStrategy_id(rs.getString("strategy_id"));
				m.setProduct(rs.getString("product"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) from FEE_NODE_RELATIVE a,T_PRODUCT_RELATIVE b where a.product=b.name " + where );

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query FEE_NODE_RELATIVE Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	
	
}
