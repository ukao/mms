package com.tangpeng.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.sdk.Criteria;
import com.tangpeng.service.impl.SecurityServiceImpl;

/**
 * 数据库工具
 * @author tangpeng
 *
 */
public class DBUtils 
{
	

	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	/**
	 * 
	 * @param sql sql语句
	 * @param critiera 条件一个sql语句一组条件
	 */
	public static void excuteBatch(String[] sql,Criteria[][] critiera)
	{
		
	}
	
	/**
	 * oracle查询
	 * @param sql
	 * @param start
	 * @param end
	 * @return
	 */
	public static String addPaging(String sql,int start,int end)
	{
//		int pageSize = end - start;
//		return "select * from(select * from(select t.*,row_number() over(order by orderColumn) as rownumber from("+sql+") t)"
//				+ " p where p.rownumber>"+start+") where rownum<="+pageSize;
//		return sql + " OFFSET " + start + " ROWS FETCH NEXT " + end + " ROWS ONLY ";
		return sql + " LIMIT "+start+", "+(end-start);  
	}
	
	/**
	 * 左起截取字符
	 * @param field
	 * @param count
	 * @return
	 */
	public static String leftStr(String field,int count)
	{
		return "left("+field+","+count+")";
//		return "substr("+field+",1,"+count+")";
	}
	
	public static String subStr(String field,int start,int end)
	{
		return "substr("+field+","+start+","+(end-start)+")";
	}
	
	/**
	 * 释放数据库连接
	 * @param rs
	 * @param pst
	 * @param con
	 */
	public static void release(ResultSet rs, Statement pst, Connection con)
	{
		if( rs!= null )
		{
			try 
			{
					rs.close();	
			} 
			catch (SQLException e) 
			{
				logger.warn("Close ResultSet error!",e);
			}
		}
		
		if( pst != null )
		{
			try 
			{
				pst.close();
			} 
			catch (SQLException e) 
			{
				logger.warn("Close Statement error!",e);
			}
		}
		
		if( con != null )
		{
			try 
			{
				con.close();
			} 
			catch (SQLException e) 
			{
				logger.warn("Close Connection error!",e);
			}
		}
	}
}
