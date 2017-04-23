package com.product.product;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.CorporationService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class CorporationListHandle extends AbstractRestListHandle {


	private CorporationService corporationService;
	
	
	@Override
	public PageBean<Corporation> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		String keyword = this.getKeyword(req);
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		
		Pair<List<Corporation>,Integer> pair = corporationService.getCorporationList(keyword, startRow, endRow);
		PageBean<Corporation> page = new PageBean<Corporation>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setCorporationService(CorporationService corporationService) {
		this.corporationService = corporationService;
	}




	
}

