package com.product.task;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.db.DBUtils;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;

public class ReportStatisticInit implements ReportStatisticTask {

	private Integer[] runningTime;

	private DataSource dataSource;

	private String SQL_SDK_FEE_STA = "insert into SDK_FEE_STA(SUCCESS_FEE,FAILED_FEE,SUCCESS_COUNT,FAILED_COUNT,PRODUCT,sta_date) "
			+ "select sum( case when status=200 then price end ) as success_fee,"
			+ "sum( case when status<>200 then price end ) as failed_fee,"
			+ "count( case when status=200 then 1 end ) as success_count,"
			+ "count( case when status<>200 then 1 end ) as failed_count,"
			+ "product,? as sta_date from SDK_FEE_DETAIL where "
			+ "SYNC_TIME>=? and SYNC_TIME<?"
			+ "group by product";
	
	private String SQL_LOCAL_FEE_STA = "insert into LOCAL_FEE_STA"
			+ "(SUCCESS_FEE,FAILED_FEE,SUCCESS_COUNT,FAILED_COUNT,PRODUCT,FEE_NODE,sta_date) "
			+ "select sum( case when status=200 then price end ) as success_fee,"
			+ "sum( case when status<>200 then price end ) as failed_fee,"
			+ "count( case when status=200 then 1 end ) as success_count,"
			+ "count( case when status<>200 then 1 end ) as failed_count,"
			+ "product,fee_node,? from LOCAL_FEE_DETAIL where "
			+ "FEE_TIME>=? and FEE_TIME<?"
			+ "group by product,fee_node";
	
	private String SQL_ACTIVE_STA = "insert into ACTIVE_STA(ONLINE_CUSTOMER_COUNT,NEW_CUSTOMER_COUNT,PRODUCT,STA_DATE) "
			+ "select count( case when sta_type='2' then 1 end ) as ONLINE_CUSTOMER_COUNT,"
			+ "count(case when sta_type='1' then 1 end) as NEW_CUSTOMER_COUNT,"
			+ "product,? from"
			+ " (select '1' as sta_type,product from CUSTOMER_INFO where ACTIVE_TIME>=? and ACTIVE_TIME<?"
			+ "union all "
			+ "select '2' as sta_type,product from  CUSTOMER_LOGIN_LOG_INFO where LOGIN_TIME>=? and LOGIN_TIME<?"
			+ ") a group by product";

	private String SQL_SDK_TRANSFER_STA="insert into SDK_TRANSFER_STA(LOCAL_SUCCESS_FEE,SDK_SUCCESS_FEE,PRODUCT,STA_DATE) "
			+ "select a.LOCAL_SUCCESS_FEE,a.SDK_SUCCESS_FEE,a.l_p as product,? "
            + "from "
            + "(select * from "
            + "(select sum(success_fee) as LOCAL_SUCCESS_FEE,product as l_p from LOCAL_FEE_STA "
            + "	where sta_date=? and SUCCESS_FEE is not null group by product) "
            + "a left join "
            + "(select sum(success_fee) as SDK_SUCCESS_FEE,product as s_p from sdk_FEE_STA "
            + " where sta_date=? and SUCCESS_FEE is not null group by product) b "
            + " on a.l_p=b.s_p " 
            + " union "
			+ "select * from "
			+ "(select sum(success_fee) as LOCAL_SUCCESS_FEE,product as l_p from LOCAL_FEE_STA "
			+ " where sta_date=? and SUCCESS_FEE is not null group by product) "
			+ "a right join "
            + "(select sum(success_fee) as SDK_SUCCESS_FEE,product as s_p from sdk_FEE_STA "
            + "where sta_date=? and SUCCESS_FEE is not null group by product) b on a.l_p=b.s_p "
            + ") a ";
	
	private String SQL_CHANNEL_ACTIVE_COUNT ="insert into CHANNEL_DETAIL(CATEGORY,ACCOUNT_NUM,PRODUCT,STA_DATE) "
			+ "select '0',count(distinct customer_id) as active_count,"
			+ "product,? "
			+ "from CUSTOMER_INFO where active_time>=? and active_time<? group by product ";
	
	private String SQL_CHANNEL_ACTIVE_FEE ="insert into CHANNEL_DETAIL(CATEGORY,ACCOUNT_NUM,PRODUCT,STA_DATE) "
			+ "select '1',sum(price) as fee,product,? from SDK_FEE_DETAIL where "
			+ " sync_time>=? and sync_time <? group by product";
	
	
	private static final Logger logger = LoggerFactory
			.getLogger(ReportStatisticInit.class);

	@Override
	public void run() 
	{
		String staTime = getLastDate();
		Pair<Date,Date> staTimeRange = getLastTimeRange();
		logger.info("[Statistic Task]Date:"+staTime+" ,Time range:"
		+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(staTimeRange.fst)
		+" and " + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(staTimeRange.snd) );
		/**
		 * 运行任务
		 */
		runAll(staTime, staTimeRange);
	}
	
	/**
	 * runSdkFeeSta
	 * @param staTime
	 * @param staTimeRange
	 */
	@Override
	public void runSdkFeeSta(String staTime,Pair<Date,Date> staTimeRange)
	{
		Connection con = null;
		PreparedStatement sta = null;
		Statement staDelete = null;
		logger.info("Start run SDK_FEE_STA Task");
		
		try 
		{
			con = dataSource.getConnection();
			
			con.setAutoCommit(false);
			staDelete = con.createStatement();
			staDelete.execute("delete from SDK_FEE_STA where sta_date='"+staTime+"'");
			
			sta = con.prepareStatement(SQL_SDK_FEE_STA);
			sta.setString(1, staTime);
			sta.setDate(2, staTimeRange.fst);
			sta.setDate(3, staTimeRange.snd);
			sta.execute();
			
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
				logger.error("Rollback Error!");
			}
			logger.error("Run task SDK_FEE_STA error!", e);
		}
		finally
		{
			DBUtils.release(null, staDelete, null);
			DBUtils.release(null, sta, con);
		}
	}


	
	/**
	 * LocalFeeSta
	 * @param staTime
	 * @param staTimeRange
	 */
	@Override
	public void runLocalFeeSta(String staTime,Pair<Date,Date> staTimeRange)
	{
		Connection con = null;
		PreparedStatement sta = null;
		Statement staDelete = null;
		logger.info("Start run LOCAL_FEE_STA Task");
		
		try 
		{
			con = dataSource.getConnection();
			
			con.setAutoCommit(false);
			staDelete = con.createStatement();
			staDelete.execute("delete from LOCAL_FEE_STA where sta_date='"+staTime+"'");
			
			sta = con.prepareStatement(SQL_LOCAL_FEE_STA);
			sta.setString(1, staTime);
			sta.setDate(2, staTimeRange.fst);
			sta.setDate(3, staTimeRange.snd);
			sta.execute();
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
				logger.error("Rollback Error!");
			}
			logger.error("Run task LOCAL_FEE_STA error!", e);
		}
		finally
		{
			DBUtils.release(null, staDelete, null);
			DBUtils.release(null, sta, con);
		}
	}
	
	/**
	 * LocalFeeSta
	 * @param staTime
	 * @param staTimeRange
	 */
	@Override
	public void runActiveSta(String staTime,Pair<Date,Date> staTimeRange)
	{
		Connection con = null;
		PreparedStatement sta = null;
		Statement staDelete = null;
		logger.info("Start run ACTIVE_STA Task");
		
		try 
		{
			con = dataSource.getConnection();

			
			con.setAutoCommit(false);
			staDelete = con.createStatement();
			staDelete.execute("delete from ACTIVE_STA where sta_date='"+staTime+"'");
			
			sta = con.prepareStatement(SQL_ACTIVE_STA);
			sta.setString(1, staTime);
			sta.setDate(2, staTimeRange.fst);
			sta.setDate(3, staTimeRange.snd);
			sta.setDate(4, staTimeRange.fst);
			sta.setDate(5, staTimeRange.snd);
			sta.execute();
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
				logger.error("Rollback Error!");
			}
			logger.error("Run task ACTIVE_STA error!", e);
		}
		finally
		{
			DBUtils.release(null, staDelete, null);
			DBUtils.release(null, sta, con);
		}
	}

	/**
	 * 必须将sdk和local统计完成后才能运行此统计
	 * LocalFeeSta
	 * @param staTime
	 * @param staTimeRange
	 */
	@Override
	public void runSdkTransferSta(String staTime,Pair<Date,Date> staTimeRange)
	{
		Connection con = null;
		PreparedStatement sta = null;
		Statement staDelete = null;
		logger.info("Start run SDK_TRANSFER_STA Task");
		
		try 
		{
			con = dataSource.getConnection();

			con.setAutoCommit(false);
			staDelete = con.createStatement();
			staDelete.execute("delete from SDK_TRANSFER_STA where sta_date='"+staTime+"'");
			
			sta = con.prepareStatement(SQL_SDK_TRANSFER_STA);
			sta.setString(1, staTime);
			sta.setString(2, staTime);
			sta.setString(3, staTime);
			sta.setString(4, staTime);
			sta.setString(5, staTime);
			sta.execute();
			
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
				logger.error("Rollback Error!");
			}
			logger.error("Run task SDK_TRANSFER_STA error!", e);
		}
		finally
		{
			DBUtils.release(null, staDelete, null);
			DBUtils.release(null, sta,con );
		}
	}
	

	/**
	 * runSdkFeeSta
	 * @param staTime
	 * @param staTimeRange
	 */
	@Override
	public void runChannelActive(String staTime,Pair<Date,Date> staTimeRange)
	{
		Connection con = null;
		PreparedStatement sta = null;
		PreparedStatement sta1 = null;
		Statement staDelete = null;
		logger.info("Start run CHANNEL_DETAIL Task");
		
		try 
		{
			con = dataSource.getConnection();
			con.setAutoCommit(false);
			

			con.setAutoCommit(false);
			staDelete = con.createStatement();
			staDelete.execute("delete from CHANNEL_DETAIL where sta_date='"+staTime+"'");
			
			sta = con.prepareStatement(SQL_CHANNEL_ACTIVE_COUNT);
			sta.setString(1, staTime);
			sta.setDate(2, staTimeRange.fst);
			sta.setDate(3, staTimeRange.snd);
			sta.execute();
			
			sta1 = con.prepareStatement(SQL_CHANNEL_ACTIVE_FEE);
			sta1.setString(1, staTime);
			sta1.setDate(2, staTimeRange.fst);
			sta1.setDate(3, staTimeRange.snd);
			sta1.execute();
			
			con.commit();
		} 
		catch (SQLException e) 
		{
			logger.error("Run task CHANNEL_DETAIL error!", e);
			try 
			{
				con.rollback();
			} 
			catch (SQLException e1) 
			{
				logger.error("Rollback CHANNEL_ACTIVE error!",e1);
			}
		}
		finally
		{
			DBUtils.release(null, staDelete, null);
			DBUtils.release(null, sta1, null);
			DBUtils.release(null, sta, con);
		}
	}
	
	/**
	 * 获取昨天的日期
	 * @return
	 */
	public Pair<Date,Date> getLastTimeRange() 
	{
		Pair<Date,Date> pair = New.pair(null, null);
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		pair.snd = new Date(cal.getTimeInMillis());
		
		cal.add(Calendar.DAY_OF_MONTH, -1);
		pair.fst = new Date(cal.getTimeInMillis());
		return pair;
	}
	
	/**
	 * 获取昨天统计日期 
	 * @return yyyy-MM-dd
	 */
	public String getLastDate()
	{
		//如果没有设置日期，那么默认跑昨天的数据
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_MONTH, -1);
		return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
	}
	
	

	@Override
	public Integer[] getRunningTime() 
	{
		return this.runningTime;
	}

	public void setRunningTime(Integer[] runningTime) 
	{
		this.runningTime = runningTime;
	}

	public void setDataSource(DataSource dataSource) 
	{
		this.dataSource = dataSource;
	}

	@Override
	public void runAll(String staTime, Pair<Date, Date> staTimeRange) {
		this.runSdkFeeSta(staTime, staTimeRange);
		this.runLocalFeeSta(staTime, staTimeRange);
		this.runActiveSta(staTime, staTimeRange);
		this.runSdkTransferSta(staTime, staTimeRange);
		this.runChannelActive(staTime, staTimeRange);
	}

}
