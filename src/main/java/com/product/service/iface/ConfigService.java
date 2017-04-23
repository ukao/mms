package com.product.service.iface;

import java.util.List;

import com.product.config.FeeNode;
import com.product.config.ProductConfig;
import com.product.config.SdkConfig;
import com.tangpeng.sdk.Pair;

public interface ConfigService {
	
	/**
	 * ��ȡFeeNode�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<FeeNode>,Integer> getFeeNodeTemplateList(FeeNode condition,int startRow,int endRow);
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void addFeeNodeTemplate(FeeNode bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modifyFeeNodeTemplate(FeeNode bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void deleteFeeNodeTemplate(FeeNode bean) throws Exception;

	/**
	 * ��ȡFeeNode�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<FeeNode>,Integer> getFeeNodeStrategyList(FeeNode condition,int startRow,int endRow);
	
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void addFeeNodeStrategy(FeeNode bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modifyFeeNodeStrategy(FeeNode bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void deleteFeeNodeStrategy(FeeNode bean) throws Exception;

	/**
	 * ��ȡFeeNode�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<FeeNode>,Integer> getFeeNodeRelativeList(FeeNode condition,int startRow,int endRow);
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void addFeeNodeRelative(FeeNode bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modifyFeeNodeRelative(FeeNode bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void deleteFeeNodeRelative(FeeNode bean) throws Exception;
	
	/**
	 * ��ȡFeeNode�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ProductConfig>,Integer> getProductConfigList(ProductConfig condition,int startRow,int endRow);
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void addProductConfig(ProductConfig bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modifyProductConfig(ProductConfig bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void deleteProductConfig(ProductConfig bean) throws Exception;
	

	/**
	 * ��ȡFeeNode�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<SdkConfig>,Integer> getSdkConfigList(SdkConfig condition,int startRow,int endRow);
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void addSdkConfig(SdkConfig bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modifySdkConfig(SdkConfig bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void deleteSdkConfig(SdkConfig bean) throws Exception;
}
