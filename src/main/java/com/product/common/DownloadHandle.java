package com.product.common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.Manufacturer.Sdk;
import com.product.product.Product;
import com.product.service.iface.ProductService;
import com.product.service.iface.SdkService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class DownloadHandle extends AbstractRestResultHandle {

	private SdkService sdkService;
	
	private ProductService productService;
	@SuppressWarnings("unused")
	private I18nService i18nService;

	private Map<String,String> config;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		DownloadBean bean = null;
		try 
		{
			bean = this.createForm(req, DownloadBean.class);
			String filepath = null;
			String pushFileName = null;
			if(DownloadBean.MODULE_SDK.equals(bean.getModule()))
			{
				Sdk sdk = sdkService.getSdkById(bean.getId());
				pushFileName = sdk.getoFileName();
				filepath = config.get(Sdk.ROOT_PATH_KEY) +sdk.getAttachmentRelativePath();
			}
			else if(DownloadBean.MODULE_PRODUCT.equals(bean.getModule()))
			{
				Product p = productService.getProductById(bean.getId());
				pushFileName = p.getoFileName();
				filepath = config.get(Product.ROOT_PATH_KEY) +p.getAttachmentRelativePath();
			}
			pushFile(new File(filepath),resp,pushFileName);
		}
		catch (Exception e)
		{
			
		}
		return null;
	}
	
	/**
	 * ÎÄ¼þÏÂÔØ
	 * @param file
	 * @param response
	 */
	private void pushFile(File file, HttpServletResponse response,String pushFileName)
    {
        /*
         * //
         * response.setContentType("application/vnd.ms-excel"
         * ); response.setContentType(
         * "application/octet-stream " );
         * response.addHeader("Content-Disposition",
         * "attachment;filename=xxx.csv");
         */
        InputStream bis = null;
        BufferedOutputStream bos = null;
        try
        {
            bis = new BufferedInputStream(new FileInputStream(file));
            bos = new BufferedOutputStream(response.getOutputStream());

            response.setContentType("application/octet-stream ");
            response.setContentType("charset=utf-8");
            response.setHeader("Content-Disposition", "attachment; filename="
            +new String( pushFileName.getBytes(),"ISO8859-1"));

            byte[] buff = new byte[2048];
            int buffLen;
            while ((buffLen = bis.read(buff, 0, buff.length)) != -1)
            {
                bos.write(buff, 0, buffLen);
            }
        }
        catch (Exception e)
        {
            // dMsg.debug(ExportServlet.class.getName() +
            // ":IOException! error is " + e);
        }
        finally
        {
            try
            {
                if (bos != null)
                {
                    bos.close();
                }
            }
            catch (IOException e)
            {
                // ignore;
            }
            try
            {
                if (bos != null)
                {
                    bos.close();
                }
            }
            catch (IOException e)
            {
                // ignore;
            }
        }
    }

	public void setSdkService(SdkService sdkService) {
		this.sdkService = sdkService;
	}

	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	public void setConfig(Map<String, String> config) {
		this.config = config;
	}

	public void setProductService(ProductService productService) {
		this.productService = productService;
	}


}
