package com.tangpeng.bean;

import java.lang.reflect.Field;

import org.springframework.web.context.WebApplicationContext;

/**
 * Bean生成器
 * 
 * @author tangpeng
 */
public class BeanFactory {

	private static WebApplicationContext context;

	/**
	 * 获取对象
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
	 * 初始化
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
	 * 初始化
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
	 * 初始化
	 * 
	 * @param context
	 */
	public static void setContext(WebApplicationContext context) {
		BeanFactory.context = context;
	}

	/**
	 * 获取WebApplicationContext
	 * 
	 * @return
	 */
	public static WebApplicationContext getContext() {
		return context;
	}

}
