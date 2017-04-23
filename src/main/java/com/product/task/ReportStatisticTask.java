package com.product.task;

import java.sql.Date;

import com.tangpeng.sdk.Pair;

/**
 * 
 * @author tangpeng
 *
 */
public interface ReportStatisticTask extends DailyTimerTask {

	void runSdkTransferSta(String staTime, Pair<Date, Date> staTimeRange);

	void runActiveSta(String staTime, Pair<Date, Date> staTimeRange);

	void runSdkFeeSta(String staTime, Pair<Date, Date> staTimeRange);

	void runLocalFeeSta(String staTime, Pair<Date, Date> staTimeRange);

	void runChannelActive(String staTime, Pair<Date, Date> staTimeRange);

	void runAll(String staTime, Pair<Date, Date> staTimeRange);
}
