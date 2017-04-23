package com.product.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.report.ChannelDetail;
import com.product.report.CustomerInfo;
import com.product.report.CustomerLogin;
import com.product.report.LocalFeeDetail;
import com.product.report.SdkFeeDetail;
import com.product.service.iface.ReportQueryService;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.FormatUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;

public class ReportQueryServiceImpl implements ReportQueryService {
	
	private static final Logger logger = LoggerFactory.getLogger(ReportQueryServiceImpl.class);

	private DataSource dataSource;
	

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	@Override
	public Pair<List<CustomerInfo>, Integer> queryCustomInfoDetail(
			CustomerInfo condition, int startRow, int endRow) {
		List<CustomerInfo> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where = "";
		String selectFrom = " from CUSTOMER_INFO a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c where a.product=b.name and b.product_id=c.id " ;
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where += " and a.active_time>='"+condition.getBeginDate()+"'";
			}
			if( condition.getEndDate() != null )
			{
				where += " and a.active_time<='"+condition.getEndDate()+" 24:00:00'";
			}
			if( condition.getProduct() != null )
			{
				where += " and a.product='"+condition.getProduct()+"'";
			}
			
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select a.*,c.name,c.version "+selectFrom
							+ where
							+" order by a.active_time desc"
							,startRow,endRow)
					);
			rs = pst.executeQuery();
			while(rs.next())
			{
				CustomerInfo m = new CustomerInfo();
				m.setActive_time(rs.getTimestamp("active_time"));
				m.setAndroid_version(rs.getString("android_version"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("name"));
				m.setApp_version(rs.getString("version"));
				m.setImei(rs.getString("imei"));
				m.setCustomer_id(rs.getString("customer_id"));
				m.setLogin_ip(rs.getString("login_ip"));
				m.setModel(rs.getString("model"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) " + selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Customer_info Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Integer getAllActivedCustomer()
	{
		int count = 0;
		Connection con = null;
		PreparedStatement pstCount = null;
		ResultSet rsCount = null;
		try 
		{
			con = dataSource.getConnection();
			pstCount = con.prepareStatement("select count(distinct CUSTOMER_ID) from CUSTOMER_INFO");

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Customer_info Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, con);
		}
		
		return count;
	}

	@Override
	public Pair<List<CustomerLogin>, Integer> queryCustomLoginDetail(
			CustomerLogin condition, int startRow, int endRow) {
		List<CustomerLogin> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where = "";
		String selectFrom = " from CUSTOMER_LOGIN_LOG_INFO a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c "
							+ "where a.product=b.name and b.product_id=c.id " ;
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where += " and a.login_time>='"+condition.getBeginDate()+"'";
			}
			if( condition.getEndDate() != null )
			{
				where += " and a.login_time<='"+condition.getEndDate()+" 24:00:00'";
			}
			if( condition.getProduct() != null )
			{
				where += " and a.product='"+condition.getProduct()+"'";
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select a.*,c.name,c.version" + selectFrom
							+ where
							+" order by a.login_time desc"
							,startRow,endRow)
					);
			
			rs = pst.executeQuery();
			while(rs.next())
			{
				CustomerLogin m = new CustomerLogin();
				m.setImei(rs.getString("imei"));
				m.setLogin_ip(rs.getString("login_ip"));
				m.setCustomer_id(rs.getString("customer_id"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("name"));
				m.setApp_version(rs.getString("version"));
				m.setLogin_time(rs.getTimestamp("Login_time"));
				m.setLogout_time(rs.getTimestamp("Logout_time"));
				m.setOnline_time(rs.getString("Online_time"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1)  " + selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query CUSTOMER_LOGIN_LOG_INFO Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}
	
	



	@Override
	public Pair<List<SdkFeeDetail>, Integer> querySdkFeeDetail(
			SdkFeeDetail condition, int startRow, int endRow) {
		List<SdkFeeDetail> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where = "";
		String selectFrom =" from SDK_FEE_DETAIL a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c where a.product=b.name and b.product_id=c.id " ;
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where += " and a.sync_time>='"+condition.getBeginDate()+"'";
			}
			if( condition.getEndDate() != null )
			{
				where += " and a.sync_time<='"+condition.getEndDate()+" 24:00:00'";
			}
			if( condition.getProduct() != null )
			{
				where += " and a.product='"+condition.getProduct()+"'";
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select a.*,c.name,c.version"+selectFrom
							+ where
							+" order by a.sync_time desc"
							,startRow,endRow)
					);
			rs = pst.executeQuery();
			while(rs.next())
			{
				SdkFeeDetail m = new SdkFeeDetail();
				m.setOrder_id(rs.getString("order_id"));
				m.setOperator(rs.getString("operator"));
				m.setPrice(FormatUtils.priceFormat(rs.getString("price")));
				m.setSdk_param(rs.getString("sdk_param"));
				m.setSigner(rs.getString("signer"));
				m.setStatus(rs.getString("status"));
				m.setSync_time(rs.getTimestamp("sync_time"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("name"));
				m.setApp_version(rs.getString("version"));
				m.setApp_key(rs.getString("app_key"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) " + selectFrom + where);
			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Customer_info Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Pair<List<LocalFeeDetail>, Integer> queryLocalFeeDetail(
			LocalFeeDetail condition, int startRow, int endRow) {
		List<LocalFeeDetail> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where = "";
		String selectFrom=" from LOCAL_FEE_DETAIL a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c where a.product=b.name and b.product_id=c.id";
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where += " and a.fee_time>='"+condition.getBeginDate()+"'";
			}
			if( condition.getEndDate() != null )
			{
				where += " and a.fee_time<='"+condition.getEndDate()+" 24:00:00'";
			}
			if( condition.getProduct() != null )
			{
				where += " and a.product='"+condition.getProduct()+"'";
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select a.*,c.name,c.version " + selectFrom 
							+ where
							+" order by a.fee_time desc"
							,startRow,endRow)
					);
			rs = pst.executeQuery();
			while(rs.next())
			{
				LocalFeeDetail m = new LocalFeeDetail();
				m.setImei(rs.getString("imei"));
				m.setLogin_ip(rs.getString("login_ip"));
				m.setCustomer_id(rs.getString("customer_id"));
				m.setFee_node(rs.getString("fee_node"));
				m.setPrice(FormatUtils.priceFormat(rs.getString("price")));
				m.setStatus(rs.getString("status"));
				m.setFee_time(rs.getTimestamp("fee_time"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("name"));
				m.setApp_version(rs.getString("version"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) " + selectFrom + where);
			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query Customer_info Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Pair<List<ChannelDetail>, Integer> queryChannelDetail(
			ChannelDetail condition, int startRow, int endRow) {
		
		List<ChannelDetail> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where =  "and category='"+condition.getCategory()+"'";
		String selectFrom = " from CHANNEL_DETAIL a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c,T_Channel d "
							+ "where a.product=b.name and b.product_id=c.id and b.channel_id=d.id ";
		try 
		{
			con = dataSource.getConnection();
			
			
			if( condition.getBeginDate() != null )
			{
				where += " and a.active_time>='"+condition.getBeginDate()+"'";
			}
			if( condition.getEndDate() != null )
			{
				where += " and a.active_time<='"+condition.getEndDate()+"'";
			}
			
			if( condition.getChannel_id()  != null )
			{
				where += " and d.channel_id=" + condition.getChannel_id();
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select "
							+ "a.id,"
							+ "a.account_num,"
							+ "a.product,"
							+ "c.name as product_name,"
							+ "c.version,"
							+ "d.name as channel_name,"
							+ "a.sta_date " + selectFrom
							+ where +" order by a.sta_date desc",startRow,endRow)
					);
			rs = pst.executeQuery();
			while(rs.next())
			{
				ChannelDetail m = new ChannelDetail();
				m.setSta_date(rs.getString("sta_date"));
				m.setId(rs.getString("id"));
				m.setAccount_num(rs.getString("account_num"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("product_name"));
				m.setApp_version(rs.getString("version"));
				m.setChannel_name(rs.getString("channel_name"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) "+selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query channel detail mock Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Pair<List<ChannelDetail>, Integer> queryChannelDetailActiveMock(
			ChannelDetail condition, int startRow, int endRow) 
	{
		List<ChannelDetail> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where =  " ";
		String selectFrom = " from CHANNEL_DETAIL_ACTIVE_MOCK a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c,T_Channel d "
							+ "where a.product=b.name and b.product_id=c.id and b.channel_id=d.id ";
		try 
		{
			con = dataSource.getConnection();
			
			
			if( condition.getBeginDate() != null )
			{
				where += " and a.sta_date>='"+condition.getBeginDate()+"'";
			}
			if( condition.getEndDate() != null )
			{
				where += " and a.sta_date<='"+condition.getEndDate()+"'";
			}
			
			if( condition.getChannel_id()  != null )
			{
				where += " and b.channel_id=" + condition.getChannel_id();
			}
			
			if( condition.getProduct()  != null )
			{
				where += " and a.product='" + condition.getProduct()+"'";
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select "
							+ "a.id,"
							+ "a.account_num,"
							+ "a.product,"
							+ "b.extraction_num,"
							+ "c.name as product_name,"
							+ "c.version,"
							+ "d.name as channel_name,"
							+ "a.sta_date " + selectFrom
							+ where +" order by a.sta_date desc",startRow,endRow)
					);
			rs = pst.executeQuery();
			while(rs.next())
			{
				ChannelDetail m = new ChannelDetail();
				m.setSta_date(rs.getString("sta_date"));
				m.setId(rs.getString("id"));
				m.setAccount_num(rs.getString("account_num"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("product_name"));
				m.setApp_version(rs.getString("version"));
				m.setChannel_name(rs.getString("channel_name"));
				m.setExtraction_num(rs.getString("extraction_num"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) "+selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query CHANNEL_DETAIL_ACTIVE_MOCK Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}
	
	@Override
	public void addChannelDetailActiveMock(ChannelDetail bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("insert into CHANNEL_DETAIL_ACTIVE_MOCK(ACCOUNT_NUM,PRODUCT,STA_DATE) values(?,?,?)");
			pst.setString(1, bean.getAccount_num());
			pst.setString(2, bean.getProduct());
			pst.setString(3, bean.getSta_date());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add CHANNEL_DETAIL_ACTIVE_MOCK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	

	@Override
	public void modifyChannelDetailActiveMock(ChannelDetail bean) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("update CHANNEL_DETAIL_ACTIVE_MOCK set ACCOUNT_NUM=?,PRODUCT=?,STA_DATE=? where id=?");
			pst.setString(1, bean.getAccount_num());
			pst.setString(2, bean.getProduct());
			pst.setString(3, bean.getSta_date());
			pst.setString(4, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify CHANNEL_DETAIL_ACTIVE_MOCK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteChannelDetailActiveMock(ChannelDetail bean) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("delete from CHANNEL_DETAIL_ACTIVE_MOCK where id=?");
			pst.setString(1, bean.getId());
			pst.executeUpdate();
		}
		catch (SQLException e) 
		{
			logger.error("Delete CHANNEL_DETAIL_ACTIVE_MOCK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}



	@Override
	public Pair<List<ChannelDetail>, Integer> queryChannelDetailProportionMock(
			ChannelDetail condition, int startRow, int endRow) 
	{
		List<ChannelDetail> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		String where =  "";
		String selectFrom = " from CHANNEL_DETAIL_PROPORTION_MOCK a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c,T_Channel d "
							+ "where a.product=b.name and b.product_id=c.id and b.channel_id=d.id ";
		try 
		{
			con = dataSource.getConnection();
			
			
			if( condition.getBeginDate() != null )
			{
				where += " and a.sta_date>='"+condition.getBeginDate()+"'";
			}
			if( condition.getEndDate() != null )
			{
				where += " and a.sta_date<='"+condition.getEndDate()+"'";
			}
			
			if( condition.getChannel_id()  != null )
			{
				where += " and b.channel_id=" + condition.getChannel_id();
			}
			
			if( condition.getProduct()  != null )
			{
				where += " and a.product='" + condition.getProduct()+"'";
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select "
							+ "a.id,"
							+ "a.account_num,"
							+ "a.product,"
							+ "a.active_count,"
							+ "b.extraction_num,"
							+ "c.name as product_name,"
							+ "c.version,"
							+ "d.name as channel_name,"
							+ "a.sta_date " + selectFrom
							+ where +" order by a.sta_date desc",startRow,endRow)
					);
			rs = pst.executeQuery();
			while(rs.next())
			{
				ChannelDetail m = new ChannelDetail();
				m.setSta_date(rs.getString("sta_date"));
				m.setId(rs.getString("id"));
				m.setAccount_num(rs.getString("account_num"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("product_name"));
				m.setApp_version(rs.getString("version"));
				m.setChannel_name(rs.getString("channel_name"));
				m.setExtraction_num(rs.getString("extraction_num"));
				m.setActive_count(rs.getString("active_count"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count(1) "+selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query CHANNEL_DETAIL_PROPORTION_MOCK Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, null);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}
	
	@Override
	public void addChannelDetailProportionMock(ChannelDetail bean) throws Exception 
	{
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("insert into CHANNEL_DETAIL_PROPORTION_MOCK(ACCOUNT_NUM,PRODUCT,STA_DATE,ACTIVE_COUNT) values(?,?,?,?)");
			pst.setString(1, bean.getAccount_num());
			pst.setString(2, bean.getProduct());
			pst.setString(3, bean.getSta_date());
			pst.setString(4, bean.getActive_count());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Add CHANNEL_DETAIL_PROPORTION_MOCK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
	
	

	@Override
	public void modifyChannelDetailProportionMock(ChannelDetail bean) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("update CHANNEL_DETAIL_PROPORTION_MOCK set ACCOUNT_NUM=?,PRODUCT=?,STA_DATE=?,ACTIVE_COUNT=? where id=?");
			pst.setString(1, bean.getAccount_num());
			pst.setString(2, bean.getProduct());
			pst.setString(3, bean.getSta_date());
			pst.setString(4, bean.getActive_count());
			pst.setString(5, bean.getId());
			pst.execute();
		}
		catch (SQLException e) 
		{
			logger.error("Modify CHANNEL_DETAIL_PROPORTION_MOCK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}

	@Override
	public void deleteChannelDetailProportionMock(ChannelDetail bean) throws Exception {
		
		Connection con = null;
		PreparedStatement pst = null;
		try 
		{
			con = dataSource.getConnection();
			pst = con.prepareStatement("delete from CHANNEL_DETAIL_PROPORTION_MOCK where id=?");
			pst.setString(1, bean.getId());
			pst.executeUpdate();
		}
		catch (SQLException e) 
		{
			logger.error("Delete CHANNEL_DETAIL_PROPORTION_MOCK Error!", e);
			throw new Exception(e.getMessage());
		}
		finally
		{
			DBUtils.release(null, pst, con);
		}
	}
}
