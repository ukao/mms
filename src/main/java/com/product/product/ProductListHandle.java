package com.product.product;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ProductService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class ProductListHandle extends AbstractRestListHandle {


	private ProductService productService;
	
	
	@Override
	public PageBean<Product> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		Product product = new Product();
		try {
			product = this.getCondition(req, Product.class);
		} 
		catch (Exception e) 
		{
			
		}

		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		Pair<List<Product>,Integer> pair = productService.getProductList(product, startRow, endRow);
		PageBean<Product> page = new PageBean<Product>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setProductService(ProductService productService) {
		this.productService = productService;
	}

	

}

