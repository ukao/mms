package com.product.common;

import com.tangpeng.bean.BaseBean;

public class DownloadBean  extends BaseBean{

	public static final String MODULE_SDK="sdk";
	public static final String MODULE_PRODUCT="product";
	
	private String module;
	private String id;
	
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	
}
