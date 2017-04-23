/**
 * 
 */
package com.tangpeng.websocket;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

/**
 * @author Administrator
 *
 */
public class TestWebSocket extends WebSocketServlet {


	private static final long serialVersionUID = 6796145367142570731L;

	@Override
	public WebSocket doWebSocketConnect(HttpServletRequest arg0, String arg1) {
		// TODO Auto-generated method stub
		return new WebSocket.OnTextMessage() {
			
			@Override
			public void onOpen(Connection connection) {
				
			}
			
			@Override
			public void onClose(int closeCode, String message) {
				
			}
			
			@Override
			public void onMessage(String data) {
				
			}
		};
	}

}
