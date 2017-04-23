package com.product.service.iface;

import java.util.List;

import com.product.product.Corporation;
import com.tangpeng.sdk.Pair;

public interface CorporationService {

	/**
	 * ��ȡsdk�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Corporation>,Integer> getCorporationList(String keyword,int startRow,int endRow);
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void add(Corporation bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modify(Corporation bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void delete(Corporation bean) throws Exception;
	
	
}
