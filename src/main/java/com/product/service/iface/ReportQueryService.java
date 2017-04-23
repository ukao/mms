package com.product.service.iface;

import java.util.List;

import com.product.report.ChannelDetail;
import com.product.report.CustomerInfo;
import com.product.report.CustomerLogin;
import com.product.report.LocalFeeDetail;
import com.product.report.SdkFeeDetail;
import com.tangpeng.sdk.Pair;

/**
 * �����ѯ�ӿ�
 * @author tangpeng
 *
 */
public interface ReportQueryService 
{
	/**
	 * ��ѯ�ͻ���ϸ��Ϣ(������ϸ)
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<CustomerInfo>,Integer> queryCustomInfoDetail(CustomerInfo condition,int startRow,int endRow);

	/**
	 * �û�����ʱ��
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<CustomerLogin>,Integer> queryCustomLoginDetail(CustomerLogin condition,int startRow,int endRow);
	
	/**
	 * sdk�Ʒ���ϸ
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<SdkFeeDetail>,Integer> querySdkFeeDetail(SdkFeeDetail condition,int startRow,int endRow);
	

	/**
	 * ���ؼƷ���ϸ
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<LocalFeeDetail>,Integer> queryLocalFeeDetail(LocalFeeDetail condition,int startRow,int endRow);
	
	

	/**
	 * ������ѯ
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ChannelDetail>,Integer> queryChannelDetail(ChannelDetail condition,int startRow,int endRow);


	/**
	 * ģ���������ݲ�ѯ
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ChannelDetail>,Integer> queryChannelDetailActiveMock(ChannelDetail condition,int startRow,int endRow);
	
	/**
	 * ����ģ����������
	 * @param condition
	 * @throws Exception
	 */
	void addChannelDetailActiveMock(ChannelDetail condition) throws Exception;
	
	/**
	 * �޸�ģ����������
	 * @param condition
	 * @throws Exception
	 */
	void modifyChannelDetailActiveMock(ChannelDetail condition) throws Exception;

	/**
	 * �޸�ģ����������
	 * @param condition
	 * @throws Exception
	 */
	void deleteChannelDetailActiveMock(ChannelDetail condition) throws Exception;
	
	
	/**
	 * ��ȡ���м����û�
	 * @return
	 */
	Integer getAllActivedCustomer();

	Pair<List<ChannelDetail>, Integer> queryChannelDetailProportionMock(ChannelDetail condition, int startRow, int endRow);
	
	/**
	 * ����ģ����������
	 * @param condition
	 * @throws Exception
	 */
	void addChannelDetailProportionMock(ChannelDetail condition) throws Exception;
	
	/**
	 * �޸�ģ����������
	 * @param condition
	 * @throws Exception
	 */
	void modifyChannelDetailProportionMock(ChannelDetail condition) throws Exception;

	/**
	 * �޸�ģ����������
	 * @param condition
	 * @throws Exception
	 */
	void deleteChannelDetailProportionMock(ChannelDetail condition) throws Exception;
	
}
