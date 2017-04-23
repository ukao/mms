package com.jdni;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.naming.spi.InitialContextFactory;

public class JndiFactory implements InitialContextFactory {

	@Override
	public Context getInitialContext(Hashtable<?, ?> environment)
			throws NamingException {
		
		return new InitialContext();
	}
	
	

}
