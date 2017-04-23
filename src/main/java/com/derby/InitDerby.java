package com.derby;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * ��ʼ������
 * @author 
 *
 */
public class InitDerby {

	/**
	 * 
	 * @param args
	 */
	public static void main(String[] args)
	{
		String url = "jdbc:derby://127.0.0.1:1527/DSGarage;create=true;user=app;password=app";
		Connection con =  null;
		Statement stm = null;
		try 
		{
			Class.forName("org.apache.derby.jdbc.ClientDriver");
			con = DriverManager.getConnection(url);
			stm = con.createStatement();
//			stm.execute(InitSql.dropUserRole);
//			stm.execute(InitSql.dropUser);
			stm.execute(InitSql.createUser);
			stm.execute(InitSql.createRole);
			stm.execute(InitSql.createUserRole);
			stm.execute(InitSql.createRight);
			stm.execute(InitSql.createRoleRight);
//			stm.execute(InitSql.dropManufacturer);
			stm.execute(InitSql.createManufacturer);
//			stm.execute(InitSql.dropProduct);
			stm.execute(InitSql.createProduct);
//			stm.execute(InitSql.dropSdk);
			stm.execute(InitSql.createSdk);
			stm.execute(InitSql.createChannel);
			stm.execute(InitSql.createProductRelative);
//			stm.execute(InitSql.dropCorporation);
			stm.execute(InitSql.createCorporation);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		finally
		{
			try 
			{
				stm.close();
				con.close();
			}
			catch (SQLException e) 
			{
				e.printStackTrace();
			}
		}
	}
}
