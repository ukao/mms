package com.product.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.service.iface.StatisticQueryService;
import com.product.statistic.ActiveSta;
import com.product.statistic.LocalFeeSta;
import com.product.statistic.SdkFeeSta;
import com.product.statistic.SdkTransferSta;
import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.FormatUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;

public class StatisticQueryServiceImpl implements StatisticQueryService {

	private static final Logger logger = LoggerFactory.getLogger(StatisticQueryServiceImpl.class);

	private DataSource dataSource;
	
	private String orderby = " order by sta_date desc ";

	public void setDataSource(DataSource dataSource) 
	{
		this.dataSource = dataSource;
	}
	
	@Override
	public Pair<List<SdkFeeSta>, Integer> querySdkFeeSta(SdkFeeSta condition,
			int startRow, int endRow) 
	{
		List<SdkFeeSta> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		StringBuilder where = new StringBuilder();
		String groupBy = "";
		String selectField="a.*,c.name,c.version";
		String distinctCount="1";
		String selectForm=" from SDK_FEE_STA a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c where a.product=b.name and b.product_id=c.id ";
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where.append(" and a.sta_date>='"+condition.getBeginDate()+"' ");
			}
			if( condition.getEndDate() != null )
			{
				where.append(" and a.sta_date<='"+condition.getEndDate()+"' ");
			}
			if( condition.getProduct()  != null )
			{
				where.append(" and a.product='" + condition.getProduct()+"' ");
			}
			
			//按月统计
			if( condition.getMonth() != null )
			{
				String sta_date = DBUtils.leftStr("sta_date",7);
				where.append(" and "+sta_date+"='"+condition.getMonth()+"' ");
				selectField= sta_date + " as sta_date,"
						+ "sum(a.failed_count) as failed_count,"
						+ "sum(a.failed_fee) as failed_fee,"
						+ "sum(a.success_count) as success_count,"
						+ "sum(a.success_fee) as success_fee"
						+ ",a.product,c.name,c.version";
				groupBy  = " group by a.product,c.name,c.version";
				distinctCount = "distinct a.product";
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select "+selectField + selectForm 
							+ where + groupBy + orderby ,startRow,endRow)
					);

			rs = pst.executeQuery();
			while(rs.next())
			{
				SdkFeeSta m = new SdkFeeSta();
				m.setSta_date(rs.getString("sta_date"));
				m.setFailed_count(rs.getString("failed_count"));
				m.setFailed_fee(FormatUtils.priceFormat(rs.getString("failed_fee")));
				m.setSuccess_count(rs.getString("success_count"));
				m.setSuccess_fee(FormatUtils.priceFormat(rs.getString("success_fee")));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("name"));
				m.setApp_version(rs.getString("version"));
				list.add(m);
			}
			pstCount = con.prepareStatement("select count("+distinctCount+") " + selectForm + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query SDK_FEE_STA Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, con);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Pair<List<LocalFeeSta>, Integer> queryLocalFeeSta(
			LocalFeeSta condition, int startRow, int endRow) 
	{
		List<LocalFeeSta> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		StringBuilder where = new StringBuilder();
		String groupBy = "";
		String selectField="a.*,c.name,c.version";
		String distinctCount="1";
		String selectFrom = " from LOCAL_FEE_STA a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c where a.product=b.name and b.product_id=c.id ";
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where.append(" and a.sta_date>='"+condition.getBeginDate()+"' ");
			}
			if( condition.getEndDate() != null )
			{
				where.append(" and a.sta_date<='"+condition.getEndDate()+"' ");
			}
			if( condition.getProduct()  != null )
			{
				where.append(" and a.product='" + condition.getProduct()+"' ");
			}
			if( condition.getMonth() != null )
			{
				String sta_date = DBUtils.leftStr("sta_date",7);
				selectField = sta_date+" as sta_date,sum(a.success_fee) as success_fee"
						+ ",sum(a.failed_count) as failed_count"
						+ ",sum(a.failed_fee) as failed_fee"
						+ ",sum(a.success_count) as success_count,"
						+ "a.product,a.fee_node,c.name,c.version";
				where.append(" and "+sta_date+"='"+condition.getMonth()+"' ");
				groupBy  =" group by a.product,a.fee_node,c.name,c.version";
				distinctCount = "distinct a.product,a.fee_node";
			}
			if( condition.getFee_node() != null )
			{
				where.append(" and fee_node='"+condition.getFee_node()+"'");
			}
			
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select "+selectField+ selectFrom 
							+ where+groupBy + orderby,startRow,endRow)
					);

			rs = pst.executeQuery();
			while(rs.next())
			{
				LocalFeeSta m = new LocalFeeSta();
				m.setSta_date(rs.getString("sta_date"));
				m.setFailed_count(rs.getString("failed_count"));
				m.setFailed_fee(FormatUtils.priceFormat(rs.getString("failed_fee")));
				m.setSuccess_count(rs.getString("success_count"));
				m.setSuccess_fee(FormatUtils.priceFormat(rs.getString("success_fee")));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("name"));
				m.setApp_version(rs.getString("version"));
				m.setFee_node(rs.getString("fee_node"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count("+distinctCount+") "+selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query LOCAL_FEE_STA Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, con);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Pair<List<SdkTransferSta>, Integer> querySdkTransferSta(
			SdkTransferSta condition, int startRow, int endRow) 
	{
		List<SdkTransferSta> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		StringBuilder where = new StringBuilder();
		String groupBy = "";
		String selectField="sta_date,a.sdk_success_fee,a.local_success_fee,c.name as product_name,"
				+ "a.product,b.sdk_id,c.name as product_name,d.name as sdk_name,c.version";
		String distinctCount="1";
		String selectFrom = " from SDK_TRANSFER_STA a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c,T_SDK d where "
							+ "a.product=b.name and b.product_id=c.id and b.sdk_id=d.id ";
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where.append(" and a.sta_date>='"+condition.getBeginDate()+"' ");
			}
			if( condition.getEndDate() != null )
			{
				where.append(" and a.sta_date<='"+condition.getEndDate()+"' ");
			}
			if( condition.getProduct()  != null )
			{
				where.append(" and a.product='" + condition.getProduct()+"' ");
			}
			if( condition.getMonth() != null )
			{
				String sta_date = DBUtils.leftStr("sta_date",7);
				selectField = sta_date+" as sta_date"
						+ ",sum(a.sdk_success_fee) as sdk_success_fee"
						+ ",sum(a.local_success_fee) as local_success_fee,"
						+ "a.product,b.sdk_id,c.name as product_name,d.name as sdk_name,c.version";
				where.append(" and "+sta_date+"='"+condition.getMonth()+"'");
				groupBy  =" group by a.product,b.sdk_id,c.name,d.name,c.version";
				distinctCount = "distinct a.product,b.sdk_id";
			}
			if( condition.getSdk_id() != null )
			{
				where.append(" and sdk_id='"+condition.getSdk_id()+"'");
			}

			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select "+selectField+ selectFrom
							+ where+groupBy + orderby,startRow,endRow)
					);

			rs = pst.executeQuery();
			while(rs.next())
			{
				SdkTransferSta m = new SdkTransferSta();
				m.setSta_date(rs.getString("sta_date"));
				m.setSdk_success_fee(FormatUtils.priceFormat(rs.getString("sdk_success_fee")));
				m.setLocal_success_fee(FormatUtils.priceFormat(rs.getString("local_success_fee")));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("product_name"));
				m.setSdk_name(rs.getString("sdk_name"));
				m.setApp_version(rs.getString("version"));
				m.setSdk_id(rs.getString("sdk_id"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count("+distinctCount+") "+selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query SDK_TRANSFER_STA Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, con);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public Pair<List<ActiveSta>, Integer> queryActiveSta(ActiveSta condition,
			int startRow, int endRow) 
	{
		List<ActiveSta> list = New.arrayList();
		int count = 0;
		Connection con = null;
		PreparedStatement pst = null;
		PreparedStatement pstCount = null;
		ResultSet rs = null;
		ResultSet rsCount = null;
		StringBuilder where = new StringBuilder();
		String groupBy = "";
		String selectField="a.*,c.name as product_name,d.name as channel_name,c.version,d.id as channel_id";
		String distinctCount="1";
		String selectFrom ="  from ACTIVE_STA a,"
							+ "T_PRODUCT_RELATIVE b,T_PRODUCT c,T_CHANNEL d where "
							+ "a.product=b.name and b.product_id=c.id and b.channel_id=d.id ";
		try 
		{
			con = dataSource.getConnection();
			if( condition.getBeginDate() != null )
			{
				where.append(" and a.sta_date>='"+condition.getBeginDate()+"' ");
			}
			if( condition.getEndDate() != null )
			{
				where.append(" and a.sta_date<='"+condition.getEndDate()+"' ");
			}
			if( condition.getProduct()  != null )
			{
				where.append(" and a.product='" + condition.getProduct()+"' ");
			}
			if( condition.getMonth() != null )
			{
				String sta_date = DBUtils.leftStr("sta_date",7);
				selectField =sta_date+" as sta_date"
						+ ",sum(a.new_customer_count) as new_customer_count"
						+ ",sum(a.online_customer_count) as online_customer_count,"
						+ "a.product,c.name as product_name,d.name as channel_name,c.version,d.id as channel_id";
				where.append(" and "+sta_date+"='"+condition.getMonth()+"'");
				groupBy  =" group by a.product,c.name,d.name,c.version,d.id";
				distinctCount="distinct a.product";
			}
			if( condition.getChannel_id() != null )
			{
				where.append(" and channel_id='"+condition.getChannel_id()+"'");
			}
			if( condition.getProduct() != null )
			{
				where.append(" and product='"+condition.getProduct()+"'");
			}
			
			pst = con.prepareStatement( 
					DBUtils.addPaging(
							"select "+selectField+selectFrom
							+ where+groupBy + orderby,startRow,endRow)
					);

			rs = pst.executeQuery();
			while(rs.next())
			{
				ActiveSta m = new ActiveSta();
				m.setSta_date(rs.getString("sta_date"));
				m.setProduct(rs.getString("product"));
				m.setApp_name(rs.getString("product_name"));
				m.setApp_version(rs.getString("version"));
				m.setChannel_id(rs.getString("channel_id"));
				m.setChannel_name(rs.getString("channel_name"));
				m.setNew_count(rs.getString("new_customer_count"));
				m.setOnline_count(rs.getString("online_customer_count"));
				list.add(m);
			}
			
			pstCount = con.prepareStatement("select count("+distinctCount+") " + selectFrom + where);

			rsCount = pstCount.executeQuery();
			if( rsCount.next() )
			{
				count = rsCount.getInt(1);
			}
		} 
		catch (Exception e) 
		{
			logger.error("Query SDK_TRANSFER_STA Error!", e);
		}
		finally
		{
			DBUtils.release(rsCount, pstCount, con);
			DBUtils.release(rs, pst, con);
		}
		
		return New.pair(list, count);
	}

	@Override
	public long queryTotalCustomerCount() 
	{
		return 0;
	}

}
