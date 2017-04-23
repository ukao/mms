package com.product.task;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.sdk.New;
import com.tangpeng.sdk.Pair;
import com.tangpeng.utils.I18nService;

public class ReportStatisticTaskHandle extends AbstractRestResultHandle {

	private static final Logger logger = LoggerFactory
			.getLogger(ReportStatisticTaskHandle.class);

	private I18nService i18nService;

	private ReportStatisticTask reportStatisticTask;

	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		ResultBean resultBean = new ResultBean();
		Runnable task = null;
		try {
			final ReportStatisticTaskBean bean = this.createBaseBean(req,
					ReportStatisticTaskBean.class);
			// 获取任务数据的日期 ，格式为yyyy-MM-dd
			final String staDate = bean.getParam();

			task = new Runnable() {
				@Override
				public void run() {

					final Pair<Date, Date> pair = getStaTimeRange(staDate);
					if (bean.getMethod().equals("0")) {
						reportStatisticTask.runAll(staDate, pair);
					}else if (bean.getMethod().equals("1")) {
						reportStatisticTask.runSdkFeeSta(staDate, pair);
					} else if (bean.getMethod().equals("2")) {
						reportStatisticTask.runLocalFeeSta(staDate, pair);
					} else if (bean.getMethod().equals("3")) {
						reportStatisticTask.runChannelActive(staDate, pair);
					} else if (bean.getMethod().equals("4")) {
						reportStatisticTask.runActiveSta(staDate, pair);
					} else if (bean.getMethod().equals("5")) {
						reportStatisticTask.runSdkTransferSta(staDate, pair);
					}
				}
			};

			ScheduledExecutorService service = Executors
					.newSingleThreadScheduledExecutor();
			service.schedule(task, 1, TimeUnit.MILLISECONDS);
			resultBean.setDesc(i18nService.getLabel("common.operation.sucess"));
			resultBean.setResult(ResultBean.SUCCESS);
		} catch (Exception e) {
			resultBean.setDesc(i18nService.getLabel("common.operation.failed")
					+ "\\n" + e.getMessage());
		}

		return resultBean;
	}

	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	public void setReportStatisticTask(ReportStatisticTask reportStatisticTask) {
		this.reportStatisticTask = reportStatisticTask;
	}

	/**
	 * 运行日期
	 * 
	 * @param staDate
	 * @return
	 */
	private Pair<Date, Date> getStaTimeRange(String staDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Pair<Date, Date> pair = New.pair(null, null);
		Calendar cal = Calendar.getInstance();
		try {
			cal.setTime(sdf.parse(staDate));
		} catch (ParseException e) {
			logger.error("时间格式错误", e);
		}

		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		pair.fst = new Date(cal.getTimeInMillis());

		cal.add(Calendar.DAY_OF_MONTH, 1);
		pair.snd = new Date(cal.getTimeInMillis());
		return pair;
	}

}
