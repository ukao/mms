package com.jdni;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.naming.spi.InitialContextFactory;
import javax.naming.spi.InitialContextFactoryBuilder;
import javax.naming.spi.NamingManager;

public class JndiContextFactoryBuilder implements InitialContextFactoryBuilder {

	
	public static void init() {  
	        try {  
	            NamingManager.setInitialContextFactoryBuilder(new JndiContextFactoryBuilder());  
	        } catch (NamingException e) {  
	            e.printStackTrace();  
	        }  
	}
	
	@Override
	public InitialContextFactory createInitialContextFactory(
			Hashtable<?, ?> environment) throws NamingException {
		
		return new InitialContextFactory(){

			@Override
			public Context getInitialContext(Hashtable<?, ?> environment)
					throws NamingException {
				
				return new InitialContext();
			}
		};
	}

}
