package com.tangpeng.servlet;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.sql.DataSource;

import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;

import com.product.task.DailyTimerTask;
import com.tangpeng.auth.Right;
import com.tangpeng.auth.RightType;
import com.tangpeng.bean.BeanFactory;
import com.tangpeng.db.DBUtils;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.sdk.New;
import com.tangpeng.utils.I18nService;

/**
 * ϵͳ����ʱ����OperationTree
 * @author tangpeng
 */
public class SystemInit implements ServletContextListener {

	private static final Logger logger = LoggerFactory.getLogger(AbstractRestResultHandle.class);
	
	
	@Override
	public void contextInitialized(ServletContextEvent sce) 
	{
		this.initBeanFatory(sce);
		this.initTask();
		this.initTree();
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) 
	{
		
	}
	
	/**
	 * ��ʼ������
	 */
	@SuppressWarnings("unchecked")
	private void initTask()
	{
		List<DailyTimerTask> taskList;
		try 
		{
			taskList =(List<DailyTimerTask>) BeanFactory.getBean("TaskList");
			ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
			for (DailyTimerTask dailyTimerTask : taskList) 
			{
				service.scheduleAtFixedRate(dailyTimerTask, getFirstTime(dailyTimerTask), 24 * 60 * 60 * 1000, TimeUnit.MILLISECONDS);			
			}
		} 
		catch (Exception e) 
		{
			logger.error("InitTaskError",e);
		}
	}
	
	/**
	 * ��ȡʱ��
	 * @param dailyTimerTask
	 * @return
	 */
	private long getFirstTime(DailyTimerTask dailyTimerTask)
	{
		Integer[] time = dailyTimerTask.getRunningTime();
		Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, time[0]);
        c.set(Calendar.MINUTE, time[1]);
        c.set(Calendar.SECOND, time[2]);
        
        long initDelay = c.getTimeInMillis() - System.currentTimeMillis();  
		initDelay = initDelay > 0 ? initDelay : 24 * 60 * 60 * 1000 + initDelay;
		
		return initDelay;
	}
	
	/**
	 * ��ʼ��Tree
	 */
	private void initTree()
	{
		InputStream is = this.getClass().getClassLoader().getResourceAsStream("operation-tree.xml");
		List<Right> list = New.arrayList();
		try 
		{
			I18nService i18nService = BeanFactory.getBean(I18nService.class);
			Element root = new SAXBuilder().build(is).getRootElement();
			//����������
			this.parseOperationTree(root,list,i18nService);
			insertDataBase(list);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * @param list
	 * @throws Exception 
	 */
	private void insertDataBase(List<Right> list) throws Exception
	{
		Connection conn = null;
		PreparedStatement pst = null;
		try 
		{
			conn = BeanFactory.getBean(DataSource.class).getConnection();
			conn.setAutoCommit(false);
			//��ɾ�����е�����
			pst = conn.prepareStatement("delete from T_RIGHT");
			pst.executeUpdate();
			
			for (Right right : list) 
			{
				pst = conn.prepareStatement("insert into T_RIGHT(opId,parentId,name,actionNo,type) values(?,?,?,?,?)");
				pst.setString(1, right.getOpId());
				pst.setString(2, right.getParentId());
				pst.setString(3, right.getName());
				pst.setInt(4, right.getActionNo());
				pst.setInt(5, right.getType());
				pst.executeUpdate();
			}
			conn.commit();
		}
		finally
		{
			DBUtils.release(null, pst, conn);
		}
	}
	
	/**
	 * ����������
	 * @param nodeList
	 */
	private void parseOperationTree(Element parent,List<Right> list,I18nService i18nService)
	{
		@SuppressWarnings("unchecked")
		List<Element> treeNodeList = parent.getChildren("tree-node");
		String parentId = parent.getAttributeValue("nodeid");
		if( treeNodeList != null )
		{
			for (Element element : treeNodeList) 
			{
				int actionNo = parseActionNo(element.getAttributeValue("actionNo"));
				String opId = element.getAttributeValue("nodeid");
				String name = i18nService.getLabel(element.getAttributeValue("label-key"));
				list.add(new Right( actionNo , parentId, opId, name,RightType.MENU.type()));
				//��������
				parseOperationTree(element, list, i18nService);
				//�����Ӳ���
				parseOperation(element, list, i18nService);
			}
		}
	}
	
	/**
	 * ��������
	 * @param treeNode
	 * @param list
	 * @param i18nService
	 */
	private void parseOperation(Element treeNode,List<Right> list,I18nService i18nService)
	{
		@SuppressWarnings("unchecked")
		List<Element> operationList = treeNode.getChildren("operation");
		String parentId = treeNode.getAttributeValue("nodeid");
		if( operationList != null )
		{
			for (Element element : operationList) 
			{
				String opId = element.getAttributeValue("value");
				String name = i18nService.getLabel(element.getAttributeValue("label-key"));
				list.add(new Right( -1 , parentId, opId, name,RightType.OPERATION.type()));
			}
		}
	}
	
	/**
	 * ��ȡactionNo
	 * @param actionNo
	 * @return
	 */
	private int parseActionNo(String actionNo)
	{
		return actionNo == null ? -1 : Integer.parseInt(actionNo);
	}

	/**
	 * ��ʼ��BeanFatory
	 * @param sce
	 */
	private void initBeanFatory(ServletContextEvent sce)
	{
		WebApplicationContext context = (WebApplicationContext) sce.getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		BeanFactory.setContext(context);
		
	}
	
}
