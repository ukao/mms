package com.product.product;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ChannelService;
import com.tangpeng.bean.PageBean;
import com.tangpeng.handle.AbstractRestListHandle;
import com.tangpeng.sdk.Pair;

public class ChannelListHandle extends AbstractRestListHandle {


	private ChannelService channelService;
	
	
	@Override
	public PageBean<Channel> responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{
		String keyword = this.getKeyword(req);
		Pair<Integer,Integer> row = this.getStartRow(req);
		int startRow = row.fst;
		int endRow = row.snd;
		
		
		Pair<List<Channel>,Integer> pair = channelService.getChannelList(keyword, startRow, endRow);
		PageBean<Channel> page = new PageBean<Channel>();
		page.setData(pair.fst);
		page.setStartRow(startRow);
		page.setEndRow(endRow);
		page.setTotalRow(pair.snd);
		return page;
	}


	public void setChannelService(ChannelService channelService) {
		this.channelService = channelService;
	}
	



	
}

