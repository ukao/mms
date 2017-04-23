package com.product.Manufacturer;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ManufacturerService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class ManufacturerListHandle extends AbstractRestListHandle {


	private ManufacturerService manufacturerService;
	
	
	@Override
	public PageBean<Manufacturer> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		String keyword = this.getKeyword(req);
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		
		Pair<List<Manufacturer>,Integer> pair = manufacturerService.getManufacturerList(keyword, startRow, endRow);
		PageBean<Manufacturer> page = new PageBean<Manufacturer>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}
	
	public void setManufacturerService(ManufacturerService manufacturerService) {
		this.manufacturerService = manufacturerService;
	}

	
}

