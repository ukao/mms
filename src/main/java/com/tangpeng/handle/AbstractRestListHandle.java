package com.tangpeng.handle;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.product.Channel;
import com.product.service.iface.ChannelService;
import com.tangpeng.auth.User;
import com.tangpeng.bean.BaseBean;
import com.tangpeng.bean.BeanFactory;
import com.tangpeng.bean.PageBean;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;


public abstract class AbstractRestListHandle implements RequestHandle {

	private static final Logger logger = LoggerFactory.getLogger(AbstractRestListHandle.class);
	
	@Override
	public void doService(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException 
	{
		PageBean<? extends BaseBean> page = this.responsePageByJson(req,resp);
		ServletOutputStream  out = resp.getOutputStream();
		//必须用write byte的方式
		out.write(page.toJsonString().getBytes("utf-8"));
		out.close();
	}
	
	/**
	 * 这里为了combobox能将name作为查询字段，所以只要获取到两者其一都能查询
	 * @param req
	 * @return
	 */
	protected String getKeyword(HttpServletRequest req)
	{
		String keyword = decode(req.getParameter("keyword"));
		if( keyword == null )
		{
			keyword = decode(req.getParameter("name"));	
		}
		return keyword;
	}

	
	/**
	 * 获取startRow获取endRow
	 * @param req
	 * @return
	 */
	protected Pair<Integer, Integer> getStartRow(HttpServletRequest req)
	{
		String _startRow = req.getParameter("_startRow");
		String _endRow = req.getParameter("_endRow");

		int startRow = 0;
		int endRow =Integer.MAX_VALUE;
		if( _startRow!=null && _endRow != null)
		{
			startRow = Integer.parseInt(_startRow);
			endRow =  Integer.parseInt(_endRow);
		}
		
		return New.pair(startRow, endRow);
	}
	
	/**
	 * 获取告警查询条件
	 * @param req
	 * @return
	 */
	protected <T> T getCondition(HttpServletRequest req,Class<T> c ) throws Exception
	{
		T t = c.newInstance();
		String sta_date = req.getParameter("sta_date");
		String category = req.getParameter("category");
		String product = req.getParameter("product");//产品分配的ID名称
		String product_name = req.getParameter("product_name");
		String name = decode(req.getParameter("name"));//名称
		String channel_id = req.getParameter("channel_id");
		String product_id = req.getParameter("product_id");//产品本身的id
		String sdk_id = req.getParameter("sdk_id");
		String m_id = req.getParameter("m_id");
		String strategy_id = req.getParameter("strategy_id");
		String extraction_category = req.getParameter("extraction_category");
		
		
		if(sta_date != null )
		{

//			logger.info("sta_date="+sta_date);
			if( sta_date.length() >= 10 )
			{
//				sta_date.replaceAll("-", "");
				c.getMethod("setSta_date",String.class).invoke(t, sta_date);
			}
			else if(sta_date.length() == 7)
			{
				c.getMethod("setMonth",String.class).invoke(t, sta_date);
			}
		}
		
		if( product != null  )
		{
			c.getMethod("setProduct",String.class).invoke(t, product);
		}
		
		if( channel_id != null  )
		{
			c.getMethod("setChannel_id",String.class).invoke(t, channel_id);	
		}
		
		if( sdk_id != null  )
		{
			c.getMethod("setSdk_id",String.class).invoke(t, sdk_id);	
		}
		if(product_name!= null )
		{
			c.getMethod("setProduct_name", String.class).invoke(t,product_name);
		}
		if(product_id!= null )
		{
			c.getMethod("setProduct_id", String.class).invoke(t,product_id);
		}
		if( name != null )
		{
			c.getMethod("setName", String.class).invoke(t,name);
		}
		if( category != null )
		{
			c.getMethod("setCategory", String.class).invoke(t,category);
		}
		if( m_id != null )
		{
			c.getMethod("setM_id", String.class).invoke(t,m_id);
		}
		if( strategy_id!=null )
		{
			c.getMethod("setStrategy_id", String.class).invoke(t,strategy_id);
		}
		if(extraction_category!=null)
		{
			c.getMethod("setExtraction_category", String.class).invoke(t, extraction_category);
		}
		
		String channel_id_by_role= this.getChannelByUser(req);
		if( channel_id_by_role!= null )
		{
			c.getMethod("setChannel_id",String.class).invoke(t,channel_id_by_role);
		}
		
				
		return t;
	}
	
	/**
	 * 
	 * @param req
	 * @return
	 * @throws Exception
	 */
	private String getChannelByUser(HttpServletRequest req) throws Exception
	{
		//设置channel条件
		User user = (User)req.getSession().getAttribute(User.SESSION_ID);
		@SuppressWarnings("unchecked")
		List<String> channelRoleIds = (List<String>) BeanFactory.getBean("ChannelRoleId");
		
		
		if(channelRoleIds.contains(user.getRoleId()+""))
		{
			ChannelService service = (ChannelService) BeanFactory.getBean("ChannelService");
			Channel channel =service.getChannelByUser(user.getUserName());
			return channel.getId();
		}
		return null;
	}
	
	protected String decode(String str)
	{
		if( str != null )
		{
			return str;
//			try 
//			{
//				return new String(URLDecoder.decode(str, "utf-8"));
//			} 
//			catch(Exception e) 
//			{
//				return null;
//			}	
		}
		return null;
	}
	
	/**
	 * 响应
	 * @param req
	 * @param resp
	 * @return
	 */
	public abstract PageBean<? extends BaseBean>  responsePageByJson(HttpServletRequest req, HttpServletResponse resp);
}
