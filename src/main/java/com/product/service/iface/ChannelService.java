package com.product.service.iface;

import java.util.List;

import com.product.product.Channel;
import com.tangpeng.sdk.Pair;

public interface ChannelService {

	/**
	 * 获取sdk厂商列表
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Channel>,Integer> getChannelList(String keyword,int startRow,int endRow);
	
	/**
	 * 根据用户获取渠道
	 * @param user
	 * @return
	 */
	Channel getChannelByUser(String user);
	
	/**
	 * 新增
	 * @param bean
	 * @throws Exception 
	 */
	void add(Channel bean) throws Exception;
	
	/**
	 * 修改
	 * @param bean
	 */
	void modify(Channel bean) throws Exception;
	
	/**
	 * 删除
	 * @param bean
	 * @throws Exception
	 */
	void delete(Channel bean) throws Exception;
	
	
}
