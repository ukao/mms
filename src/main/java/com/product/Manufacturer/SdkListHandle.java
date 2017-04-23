package com.product.Manufacturer;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.SdkService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class SdkListHandle extends AbstractRestListHandle {


	private SdkService sdkService;
	
	
	@Override
	public PageBean<Sdk> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		Sdk sdk = new Sdk();
		String keyword = this.getKeyword(req);
		String m_id = req.getParameter("m_id");
		sdk.setName(keyword);
		sdk.setM_id(m_id);

		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		Pair<List<Sdk>,Integer> pair = sdkService.getSdkList(sdk, startRow, endRow);
		PageBean<Sdk> page = new PageBean<Sdk>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setSdkService(SdkService sdkService) {
		this.sdkService = sdkService;
	}

}

