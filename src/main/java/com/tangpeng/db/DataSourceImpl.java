package com.tangpeng.db;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.util.logging.Logger;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

/**
 * Derby����Դ
 * @author tangpeng
 *
 */
public class DataSourceImpl implements DataSource {

//	private static final String JNDI_NAME="jdbc/DSGarage";
	
	private String jndiName;
	
	@Override
	public Connection getConnection() throws SQLException
	{
		Context cntxt;
		try 
		{
			cntxt = new InitialContext();
			DataSource ds = (DataSource) cntxt.lookup(jndiName);
			return ds.getConnection();
		} 
		catch (Exception e) 
		{
            //���׳�SQL�쳣���ɺ���ĳ�����д���
            throw new SQLException(e);
		}
	}
	
	@Override
	public PrintWriter getLogWriter() throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setLogWriter(PrintWriter out) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setLoginTimeout(int seconds) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int getLoginTimeout() throws SQLException {
		// TODO Auto-generated method stub
		return 0;
	}

	public Logger getParentLogger() throws SQLFeatureNotSupportedException {
		return null;
	}

	@Override
	public <T> T unwrap(Class<T> iface) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isWrapperFor(Class<?> iface) throws SQLException {
		// TODO Auto-generated method stub
		return false;
	}


	@Override
	public Connection getConnection(String username, String password)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	public void setJndiName(String jndiName) {
		this.jndiName = jndiName;
	}



}
