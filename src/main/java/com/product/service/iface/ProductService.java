package com.product.service.iface;

import java.util.List;

import com.product.product.Product;
import com.tangpeng.sdk.Pair;

public interface ProductService {

	/**
	 * ��ȡsdk�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Product>,Integer> getProductList(Product p,int startRow,int endRow);
	
	
	/**
	 * @param file
	 * @return relative_path
	 * @throws Exception
	 */
	void updateFilePath(String id,String relativePath,String oFileName) throws Exception;
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void add(Product bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modify(Product bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void delete(Product bean) throws Exception;
	
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	Product getProductById(String id);

	
}
