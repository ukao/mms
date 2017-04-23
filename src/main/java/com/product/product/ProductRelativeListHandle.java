package com.product.product;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ProductRelativeService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class ProductRelativeListHandle extends AbstractRestListHandle {


	private ProductRelativeService productRelativeService;
	
	
	@Override
	public PageBean<ProductRelative> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		ProductRelative product = new ProductRelative();
		try 
		{
			product = this.getCondition(req, ProductRelative.class);
		} 
		catch (Exception e) 
		{
//			e.printStackTrace();
		}

		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		Pair<List<ProductRelative>,Integer> pair = productRelativeService.getProductRelativeList(product, startRow, endRow);
		PageBean<ProductRelative> page = new PageBean<ProductRelative>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setProductRelativeService(
			ProductRelativeService productRelativeService) {
		this.productRelativeService = productRelativeService;
	}


}

