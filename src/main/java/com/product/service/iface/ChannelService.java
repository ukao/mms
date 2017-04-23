package com.product.service.iface;

import java.util.List;

import com.product.product.Channel;
import com.tangpeng.sdk.Pair;

public interface ChannelService {

	/**
	 * ��ȡsdk�����б�
	 * @param keyword
	 * @param startRow
	 * @param endRow
	 * @return
	 */
	Pair<List<Channel>,Integer> getChannelList(String keyword,int startRow,int endRow);
	
	/**
	 * �����û���ȡ����
	 * @param user
	 * @return
	 */
	Channel getChannelByUser(String user);
	
	/**
	 * ����
	 * @param bean
	 * @throws Exception 
	 */
	void add(Channel bean) throws Exception;
	
	/**
	 * �޸�
	 * @param bean
	 */
	void modify(Channel bean) throws Exception;
	
	/**
	 * ɾ��
	 * @param bean
	 * @throws Exception
	 */
	void delete(Channel bean) throws Exception;
	
	
}
