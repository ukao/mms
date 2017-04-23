package com.tangpeng.jetty;

import java.io.File;
import java.net.URL;

import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.eclipse.jetty.webapp.WebAppContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * @author tangpeng
 */
public class JettyStart {


	private static final Logger logger = LoggerFactory.getLogger(JettyStart.class);
	
	public static void main(String[] args) throws Exception {

		final Server server = new Server();
		URL warUrl = new File("./src/main/webapp").toURI().toURL();
		String warUrlString = warUrl.toExternalForm();
		WebAppContext context = new WebAppContext(warUrlString, "/");
		context.setTempDirectory(new File("./target/tmp"));
		context.setDefaultsDescriptor("./src/test/resources/webdefault.xml");
		context.setConfigurationClasses(__dftConfigurationClasses);

		SelectChannelConnector connector = new SelectChannelConnector();
		connector.setPort(8080);
        connector.setMaxIdleTime(30000);
        connector.setRequestHeaderSize(8192);
        QueuedThreadPool threadPool =  new QueuedThreadPool(50);
        threadPool.setName("embed-jetty-http");
        connector.setThreadPool(threadPool);
		server.setConnectors(new Connector[] { connector });
		server.setHandler(context);
		server.start();
		
		Runtime.getRuntime().addShutdownHook(new Thread() {

			@Override
			public void run() {
				try {
					server.stop();
				} catch (Exception e) {
					logger.error("run main stop error!", e);
				}
			}

		});
	}
	
	private static String[] __dftConfigurationClasses =
    {
        "org.eclipse.jetty.webapp.WebInfConfiguration",
        "org.eclipse.jetty.webapp.WebXmlConfiguration",
        "org.eclipse.jetty.webapp.MetaInfConfiguration",
        "org.eclipse.jetty.webapp.FragmentConfiguration",
        "org.eclipse.jetty.webapp.JettyWebXmlConfiguration",
        "org.eclipse.jetty.plus.webapp.EnvConfiguration"
    } ;
}
