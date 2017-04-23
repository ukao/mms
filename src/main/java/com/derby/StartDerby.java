package com.derby;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.DriverManager;

import org.apache.derby.drda.NetworkServerControl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class StartDerby {

	private static final Logger logger = LoggerFactory.getLogger(StartDerby.class);
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			NetworkServerControl derbyNetwork;
			derbyNetwork = new NetworkServerControl();
			derbyNetwork.start(new PrintWriter(System.out));
			DriverManager.getConnection("jdbc:derby://127.0.0.1:1527/DSGarage;create=true;user=app;password=app;");
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			br.readLine();
		} 
		catch (Exception e) 
		{
			logger.error("",e);
		}
	}

}
