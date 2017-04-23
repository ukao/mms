package com.product.service.iface;

import java.util.List;

import com.product.product.ProductRelative;
import com.tangpeng.sdk.Pair;

public interface ProductRelativeService {

	/**
	 * ��ȡsdk�����б�
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
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void add(ProductRelative bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modify(ProductRelative bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void delete(ProductRelative bean) throws Exception;
	
	
	/**
	 * ����id��ȡ��Ʒ������Ϣ
	 * @param id
	 * @return
	 */
	ProductRelative getProductRelativeById(String id);

	
}
