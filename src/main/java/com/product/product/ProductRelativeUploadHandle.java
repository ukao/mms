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
	 * 配置属性
	 */
	private Map<String,String> config;

	/**
	 * sdk服务
	 */
	private ProductRelativeService productRelativeService;
	
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
			Pair<String,String> pair = this.uploadFile(req, config.get(ProductRelative.ROOT_PATH_KEY));
			//获取更新前sdk信息
			ProductRelative product = productRelativeService.getProductRelativeById(pair.fst);			
			//更新数据库（如果更新数据库失败会删除当前保存的文件，暂不实现）
			productRelativeService.updateFilePath(pair.fst,pair.snd);
			//删除上次保存的文件(如果文件名不一样)
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
