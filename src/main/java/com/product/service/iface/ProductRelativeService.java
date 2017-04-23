package com.product.service.iface;

import java.util.List;

import com.product.product.ProductRelative;
import com.tangpeng.sdk.Pair;

public interface ProductRelativeService {

	/**
	 * 获取sdk厂商列表
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<ProductRelative>,Integer> getProductRelativeList(ProductRelative sdk,int startRow,int endRow);
	
	
	/**
	 * @param file
	 * @return relative_path
	 * @throws Exception
	 */
	void updateFilePath(String id,String relativePath) throws Exception;
	
	/**
	 * 新增
	 * @param bean
	 * @throws Exception 
	 */
	void add(ProductRelative bean) throws Exception;
	
	/**
	 * 修改
	 * @param bean
	 */
	void modify(ProductRelative bean) throws Exception;
	
	/**
	 * 删除
	 * @param bean
	 * @throws Exception
	 */
	void delete(ProductRelative bean) throws Exception;
	
	
	/**
	 * 根据id获取产品关联信息
	 * @param id
	 * @return
	 */
	ProductRelative getProductRelativeById(String id);

	
}
