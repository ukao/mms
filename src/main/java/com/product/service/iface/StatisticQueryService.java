package com.product.service.iface;

import java.util.List;

import com.product.statistic.ActiveSta;
import com.product.statistic.LocalFeeSta;
import com.product.statistic.SdkFeeSta;
import com.product.statistic.SdkTransferSta;
import com.tangpeng.sdk.Pair;

/**
 * 报表查询接口
 * @author tangpeng
 *
 */
public interface StatisticQueryService 
{
	/**
	 * 查询客户明细信息(激活明细)
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<SdkFeeSta>,Integer> querySdkFeeSta(SdkFeeSta condition,int startRow,int endRow);

	/**
	 * 用户在线时长
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<LocalFeeSta>,Integer> queryLocalFeeSta(LocalFeeSta condition,int startRow,int endRow);
	
	/**
	 * sdk计费明细
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<SdkTransferSta>,Integer> querySdkTransferSta(SdkTransferSta condition,int startRow,int endRow);
	

	/**
	 * 本地计费明细
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ActiveSta>,Integer> queryActiveSta(ActiveSta condition,int startRow,int endRow);
	
	

	/**
	 * 渠道查询
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	long queryTotalCustomerCount();
	
	
}
