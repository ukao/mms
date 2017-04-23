package com.product.product;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ProductService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class ProductEditHandle extends AbstractRestResultHandle {

	private ProductService productService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		Product bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, Product.class);
			if(bean.isModify())
			{
				productService.modify(bean);
			}
			else if(bean.isDelete() )
			{
				//先删除数据库成功后再删除文件
				productService.delete(bean);
			}
			else
			{
				productService.add(bean);
			}
				
				
			resultBean.setDesc(i18nService.getLabel("common.operation.sucess"));
			resultBean.setResult(ResultBean.SUCCESS);
		}
		catch (Exception e)
		{
			resultBean.setDesc(i18nService.getLabel("common.operation.failed")
					+"\\n"+e.getMessage());
		}
		return resultBean;
	}


	public void setProductService(ProductService productService) {
		this.productService = productService;
	}


	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
