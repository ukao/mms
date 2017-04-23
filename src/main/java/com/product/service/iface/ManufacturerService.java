package com.product.service.iface;

import java.util.List;

import com.product.Manufacturer.Manufacturer;
import com.tangpeng.sdk.Pair;

public interface ManufacturerService {

	/**
	 * 获取sdk厂商列表
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Manufacturer>,Integer> getManufacturerList(String keyword,int startRow,int endRow);
	
	/**
	 * 新增
	 * @param bean
	 * @throws Exception 
	 */
	void add(Manufacturer bean) throws Exception;
	
	/**
	 * 修改
	 * @param bean
	 */
	void modify(Manufacturer bean) throws Exception;
	
	/**
	 * 删除
	 * @param bean
	 * @throws Exception
	 */
	void delete(Manufacturer bean) throws Exception;
	
	
}
