package com.product.service.iface;

import java.util.List;

import com.product.Manufacturer.Manufacturer;
import com.tangpeng.sdk.Pair;

public interface ManufacturerService {

	/**
	 * ��ȡsdk�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Manufacturer>,Integer> getManufacturerList(String keyword,int startRow,int endRow);
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void add(Manufacturer bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modify(Manufacturer bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void delete(Manufacturer bean) throws Exception;
	
	
}
