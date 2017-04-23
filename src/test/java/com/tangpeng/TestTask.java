package com.tangpeng;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.junit.Test;

public class TestTask {

	public static void main(String[] args) {
		testTask();
	}

	
	public static void testTask()
	{
		ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
		service.scheduleAtFixedRate(new Runnable(){

			@Override
			public void run() {
				System.out.println("sdff");
			}}, 10000, 10000000, TimeUnit.MILLISECONDS);
	}
}
