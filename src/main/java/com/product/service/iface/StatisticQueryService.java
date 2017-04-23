package com.product.service.iface;

import java.util.List;

import com.product.statistic.ActiveSta;
import com.product.statistic.LocalFeeSta;
import com.product.statistic.SdkFeeSta;
import com.product.statistic.SdkTransferSta;
import com.tangpeng.sdk.Pair;

/**
 * �����ѯ�ӿ�
 * @author tangpeng
 *
 */
public interface StatisticQueryService 
{
	/**
	 * ��ѯ�ͻ���ϸ��Ϣ(������ϸ)
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<SdkFeeSta>,Integer> querySdkFeeSta(SdkFeeSta condition,int startRow,int endRow);

	/**
	 * �û�����ʱ��
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<LocalFeeSta>,Integer> queryLocalFeeSta(LocalFeeSta condition,int startRow,int endRow);
	
	/**
	 * sdk�Ʒ���ϸ
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<SdkTransferSta>,Integer> querySdkTransferSta(SdkTransferSta condition,int startRow,int endRow);
	

	/**
	 * ���ؼƷ���ϸ
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ActiveSta>,Integer> queryActiveSta(ActiveSta condition,int startRow,int endRow);
	
	

	/**
	 * ������ѯ
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	long queryTotalCustomerCount();
	
	
}
