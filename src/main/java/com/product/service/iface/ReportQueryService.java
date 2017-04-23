package com.product.service.iface;

import java.util.List;

import com.product.report.ChannelDetail;
import com.product.report.CustomerInfo;
import com.product.report.CustomerLogin;
import com.product.report.LocalFeeDetail;
import com.product.report.SdkFeeDetail;
import com.tangpeng.sdk.Pair;

/**
 * 报表查询接口
 * @author tangpeng
 *
 */
public interface ReportQueryService 
{
	/**
	 * 查询客户明细信息(激活明细)
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<CustomerInfo>,Integer> queryCustomInfoDetail(CustomerInfo condition,int startRow,int endRow);

	/**
	 * 用户在线时长
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<CustomerLogin>,Integer> queryCustomLoginDetail(CustomerLogin condition,int startRow,int endRow);
	
	/**
	 * sdk计费明细
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<SdkFeeDetail>,Integer> querySdkFeeDetail(SdkFeeDetail condition,int startRow,int endRow);
	

	/**
	 * 本地计费明细
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<LocalFeeDetail>,Integer> queryLocalFeeDetail(LocalFeeDetail condition,int startRow,int endRow);
	
	

	/**
	 * 渠道查询
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ChannelDetail>,Integer> queryChannelDetail(ChannelDetail condition,int startRow,int endRow);


	/**
	 * 模拟渠道数据查询
	 * @param condition
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ChannelDetail>,Integer> queryChannelDetailActiveMock(ChannelDetail condition,int startRow,int endRow);
	
	/**
	 * 新增模拟渠道数据
	 * @param condition
	 * @throws Exception
	 */
	void addChannelDetailActiveMock(ChannelDetail condition) throws Exception;
	
	/**
	 * 修改模拟渠道数据
	 * @param condition
	 * @throws Exception
	 */
	void modifyChannelDetailActiveMock(ChannelDetail condition) throws Exception;

	/**
	 * 修改模拟渠道数据
	 * @param condition
	 * @throws Exception
	 */
	void deleteChannelDetailActiveMock(ChannelDetail condition) throws Exception;
	
	
	/**
	 * 获取所有激活用户
	 * @return
	 */
	Integer getAllActivedCustomer();

	Pair<List<ChannelDetail>, Integer> queryChannelDetailProportionMock(ChannelDetail condition, int startRow, int endRow);
	
	/**
	 * 新增模拟渠道数据
	 * @param condition
	 * @throws Exception
	 */
	void addChannelDetailProportionMock(ChannelDetail condition) throws Exception;
	
	/**
	 * 修改模拟渠道数据
	 * @param condition
	 * @throws Exception
	 */
	void modifyChannelDetailProportionMock(ChannelDetail condition) throws Exception;

	/**
	 * 修改模拟渠道数据
	 * @param condition
	 * @throws Exception
	 */
	void deleteChannelDetailProportionMock(ChannelDetail condition) throws Exception;
	
}
