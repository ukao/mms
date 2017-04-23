package com.product.task;



public interface DailyTimerTask extends Runnable 
{
	/**
	 * 获取运行时间
	 * @return
	 * [0] hh
	 * [1] mm
	 * [2] ss
	 */
	Integer[] getRunningTime();
}
