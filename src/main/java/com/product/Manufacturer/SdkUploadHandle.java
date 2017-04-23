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
	 * ��������
	 */
	private Map<String,String> config;

	/**
	 * sdk����
	 */
	private SdkService sdkService;
	
	/**
	 * i18n����
	 */
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) 
	{

		ResultBean resultBean = new ResultBean();
		try 
		{
			//���ļ����浽����������
			Triple<String,String,String> triple = this.uploadFile(req, config.get(Sdk.ROOT_PATH_KEY));
			//��ȡ����ǰsdk��Ϣ
			Sdk sdk = sdkService.getSdkById(triple.fst);			
			//�������ݿ⣨����������ݿ�ʧ�ܻ�ɾ����ǰ������ļ����ݲ�ʵ�֣�
			sdkService.updateFilePath(triple.fst,triple.snd,triple.thd);
			//ɾ���ϴα�����ļ�(����ļ�����һ��)
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
