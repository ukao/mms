package com.tangpeng.bean;

import java.lang.reflect.Field;

import org.springframework.web.context.WebApplicationContext;

/**
 * Bean������
 * 
 * @author tangpeng
 */
public class BeanFactory {

	private static WebApplicationContext context;

	/**
	 * ��ȡ����
	 * @param <T>
	 * @param c
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getBean(Class<T> c) throws Exception {
		String beanName = null;
        try
        {
            Field f = c.getField("ROLE");
            Object value = f.get(c);
            beanName = value.toString();
        }
        catch (Exception e)
        {
            beanName = c.getSimpleName();
        }

        return (T) BeanFactory.getBean(beanName);
	}

	/**
	 * ��ʼ��
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public static Object getBean(String name) throws Exception {
		Object obj = null;
		try 
		{
			obj = context.getBean(name);
		} 
		catch (Exception e) 
		{
			throw e;
		}
		return obj;
	}

	/**
	 * ��ʼ��
	 * 
	 * @param name
	 * @return
	 * @throws Exception 
	 */
	public static Object getBean(String name, Object... obj) throws Exception 
	{
		Object bean = null;
		try 
		{
			bean = context.getBean(name,obj);
		} 
		catch (Exception e) 
		{
			throw e;
		}
		return bean;
	}

	/**
	 * ��ʼ��
	 * 
	 * @param context
	 */
	public static void setContext(WebApplicationContext context) {
		BeanFactory.context = context;
	}

	/**
	 * ��ȡWebApplicationContext
	 * 
	 * @return
	 */
	public static WebApplicationContext getContext() {
		return context;
	}

}
