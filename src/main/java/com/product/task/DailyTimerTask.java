package com.product.task;



public interface DailyTimerTask extends Runnable 
{
	/**
	 * ��ȡ����ʱ��
	 * @return
	 * [0] hh
	 * [1] mm
	 * [2] ss
	 */
	Integer[] getRunningTime();
}
