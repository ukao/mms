package com.product.product;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.product.service.iface.ProductRelativeService;
import com.tangpeng.bean.ResultBean;
import com.tangpeng.handle.AbstractRestResultHandle;
import com.tangpeng.utils.I18nService;

public class ProductRelativeEditHandle extends AbstractRestResultHandle {

	private ProductRelativeService productRelativeService;
	
	private I18nService i18nService;
	
	@Override
	public ResultBean responsePageByJson(HttpServletRequest req,
			HttpServletResponse resp) {
		ProductRelative bean = null;
		ResultBean resultBean = new ResultBean();
		try 
		{
			bean = this.createBaseBean(req, ProductRelative.class);
			if(bean.isModify())
			{
				productRelativeService.modify(bean);
			}
			else if(bean.isDelete() )
			{
				//先删除数据库成功后再删除文件
				productRelativeService.delete(bean);
			}
			else
			{
				productRelativeService.add(bean);
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



	public void setProductRelativeService(
			ProductRelativeService productRelativeService) {
		this.productRelativeService = productRelativeService;
	}



	public void setI18nService(I18nService i18nService) {
		this.i18nService = i18nService;
	}

	

}
