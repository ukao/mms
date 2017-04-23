package com.product.product;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.product.service.iface.ProductRelativeService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.sdk.Pair;
import com.tangpeng.utils.I18nService;

public class ProductRelativeUploadHandle extends AbstractRestResultHandle {

	private static final Logger logger = LoggerFactory.getLogger(ProductRelativeUploadHandle.class);
	
	/**
	 * ��������
	 */
	private Map<String,String> config;

	/**
	 * sdk����
	 */
	private ProductRelativeService productRelativeService;
	
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
			Pair<String,String> pair = this.uploadFile(req, config.get(ProductRelative.ROOT_PATH_KEY));
			//��ȡ����ǰsdk��Ϣ
			ProductRelative product = productRelativeService.getProductRelativeById(pair.fst);			
			//�������ݿ⣨����������ݿ�ʧ�ܻ�ɾ����ǰ������ļ����ݲ�ʵ�֣�
			productRelativeService.updateFilePath(pair.fst,pair.snd);
			//ɾ���ϴα�����ļ�(����ļ�����һ��)
			String oldFile = config.get(Product.ROOT_PATH_KEY) +product.getAttachmentRelativePath();
			File file = new File(oldFile);
			if( !pair.snd.equals(product.getAttachmentRelativePath()) && file.exists())
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

	

	public void setProductRelativeService(
			ProductRelativeService productRelativeService) {
		this.productRelativeService = productRelativeService;
	}

	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	
	
}
