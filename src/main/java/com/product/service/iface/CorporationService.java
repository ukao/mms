package com.product.service.iface;

import java.util.List;

import com.product.product.Corporation;
import com.tangpeng.sdk.Pair;

public interface CorporationService {

	/**
	 * 获取sdk厂商列表
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Corporation>,Integer> getCorporationList(String keyword,int startRow,int endRow);
	
	/**
	 * 新增
	 * @param bean
	 * @throws Exception 
	 */
	void add(Corporation bean) throws Exception;
	
	/**
	 * 修改
	 * @param bean
	 */
	void modify(Corporation bean) throws Exception;
	
	/**
	 * 删除
	 * @param bean
	 * @throws Exception
	 */
	void delete(Corporation bean) throws Exception;
	
	
}
