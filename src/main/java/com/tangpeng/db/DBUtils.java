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
 * ���ݿ⹤��
 * @author tangpeng
 *
 */
public class DBUtils 
{
	

	private static final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
	
	/**
	 * 
	 * @param sql sql���
	 * @param critiera ����һ��sql���һ������
	 */
	public static void excuteBatch(String[] sql,Criteria[][] critiera)
	{
		
	}
	
	/**
	 * oracle��ѯ
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
	 * �����ȡ�ַ�
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
	 * �ͷ����ݿ�����
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
