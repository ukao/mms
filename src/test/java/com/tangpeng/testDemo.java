package com.tangpeng;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.TreeMap;

import org.junit.Ignore;
import org.junit.Test;

import com.derby.InitSql;
import com.derby.ReportSql;
import com.tangpeng.sdk.New;

public class testDemo {

//	@Ignore
	@Test
	public void test()
	{
//		int i = -80;
//		System.out.println( i | 50 );
//		System.out.println(new User().equals(new User()));
//		System.out.println("dsfsdf as d,1,2".replaceFirst(".*?,", ""));
//
		System.out.println(Float.parseFloat("0"));
//		List<Integer> list = New.arrayList();
//		list.add(1);
//		list.add(2);
//		list.add(3);
//		System.out.println(list.contains(1));
//		String[] str = ";sd".split(";");		
//		System.out.println(str);
//		System.out.println(.hashCode());
	}
	
	int hash(int h) {
        // This function ensures that hashCodes that differ only by
        // constant multiples at each bit position have a bounded
        // number of collisions (approximately 8 at default load factor).
        h ^= (h >>> 20) ^ (h >>> 12);
        return h ^ (h >>> 7) ^ (h >>> 4);
    }
	
	
	@Ignore
	@Test
	public void testTreeAndHashMap()
	{
		HashMap<Integer,Integer> map = new HashMap<Integer, Integer>();
		TreeMap<Integer,Integer> map1 = new TreeMap<Integer, Integer>();
		int i=1000000;
		long startTimeMap = System.currentTimeMillis();
		Random r = new Random();
		
		Math.random();
		while( i!=0 )
		{
			i--;
			map.put(r.nextInt(), i);
		}
		long mapTime = System.currentTimeMillis() - startTimeMap;

		i=10000;
		long startTimeMap1 = System.currentTimeMillis();
		while( i!=0 )
		{
			i--;
			map1.put(r.nextInt(), i);
		}
		long map1Time = System.currentTimeMillis() - startTimeMap1;
		System.out.println(map1Time - mapTime);
		

 		startTimeMap = System.currentTimeMillis();
		map.get(300);
		mapTime = System.currentTimeMillis() - startTimeMap;
		

		startTimeMap1 = System.currentTimeMillis();
		map1.get(323);
		map1Time = System.currentTimeMillis() - startTimeMap1;
		System.out.println(map1Time - mapTime);
	}
	@Ignore
	@Test
	public void testSql() throws IllegalArgumentException, IllegalAccessException
	{
		Field[] fieldes1 = InitSql.class.getFields();
		Field[] fieldes2 = ReportSql.class.getFields();
		for (Field field : fieldes1) 
		{
			System.out.println(field.get(new InitSql(){}));
		}
		for (Field field : fieldes2) 
		{
			System.out.println(field.get(new ReportSql(){}));
		}
	}
	
	
	@Ignore
	@Test
	public void testTimer()
	{
		Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, 19);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        
        long initDelay = 0;
			initDelay = c.getTimeInMillis() - System.currentTimeMillis();  
			initDelay = initDelay > 0 ? initDelay : 24 * 60 * 60 * 1000 + initDelay;  
		System.out.println( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(c.getTime()));
		System.out.println(initDelay);
	}
}
