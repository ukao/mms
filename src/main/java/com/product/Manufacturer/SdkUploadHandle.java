package com.product.Manufacturer;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.service.iface.SdkService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.sdk.Triple;
import com.tangpeng.utils.I18nService;

public class SdkUploadHandle extends AbstractRestResultHandle {

	private static final Logger logger = LoggerFactory.getLogger(SdkUploadHandle.class);
	
	/**
	 * 配置属性
	 */
	private Map<String,String> config;

	/**
	 * sdk服务
	 */
	private SdkService sdkService;
	
	/**
	 * i18n服务
	 */
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{

		ResultBean resultBean = new ResultBean();
		try 
		{
			//将文件保存到服务器本地
			Triple<String,String,String> triple = this.uploadFile(req, config.get(Sdk.ROOT_PATH_KEY));
			//获取更新前sdk信息
			Sdk sdk = sdkService.getSdkById(triple.fst);			
			//更新数据库（如果更新数据库失败会删除当前保存的文件，暂不实现）
			sdkService.updateFilePath(triple.fst,triple.snd,triple.thd);
			//删除上次保存的文件(如果文件名不一样)
			String oldFile = config.get(Sdk.ROOT_PATH_KEY) +sdk.getAttachmentRelativePath();
			File file = new File(oldFile);
			if( !triple.snd.equals(sdk.getAttachmentRelativePath()) && file.exists())
			{
				file.delete();
			}
			
			resultBean.setDesc(i18nService.getLabel("common.operation.sucess"));
			resultBean.setResult(ResultBean.SUCCESS);
		} 
		catch (Exception e) 
		{
			logger.error("Upload Sdk error!",e);
			resultBean.setDesc(i18nService.getLabel("common.operation.failed")
					+"\\n"+e.getMessage());
		}
		
		
		return resultBean;
	}

	public void setConfig(Map<String, String> config) {
		this.config = config;
	}

	public void setSdkService(SdkService sdkService) {
		this.sdkService = sdkService;
	}

	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	
	
}
