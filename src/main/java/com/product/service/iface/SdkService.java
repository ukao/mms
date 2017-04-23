package com.product.service.iface;

import java.util.List;

import com.product.Manufacturer.Sdk;
import com.tangpeng.sdk.Pair;

public interface SdkService {

	/**
	 * 获取sdk厂商列表
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Sdk>,Integer> getSdkList(Sdk sdk,int startRow,int endRow);
	
	
	/**
	 * @param file
	 * @return relative_path
	 * @throws Exception
	 */
	void updateFilePath(String id,String relativePath,String o_fileName) throws Exception;
	
	/**
	 * 新增
	 * @param bean
	 * @throws Exception 
	 */
	void add(Sdk bean) throws Exception;
	
	/**
	 * 修改
	 * @param bean
	 */
	void modify(Sdk bean) throws Exception;
	
	/**
	 * 删除
	 * @param bean
	 * @throws Exception
	 */
	void delete(Sdk bean) throws Exception;
	
	
	Sdk getSdkById(String id);

	
}
