package com.tangpeng.sdk;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 通用查询条件类<br>
 * 目前只默认支持所有字段条件的"AND"关系
 * @author tangpeng
 */
public class Criteria implements Serializable
{
    /** serialVersionUID */
    private static final long serialVersionUID = -7671702635293589697L;

    /**
     * 增加一个字段条件
     * @param exp not null
     * @return this
     */
    public Criteria addFieldExp(FieldExp exp)
    {
        fieldExps.add(exp);
        return this;
    }

    /**
     * 获取字段条件列表
     * @return 字段条件列表 not null
     */
    public List<FieldExp> getFieldExps()
    {
        return fieldExps;
    }

    /**
     * 查找字段名为给定名称的字段表达式。比较为CaseInsensitive
     * @param fieldName 字段名 allow null
     * @return FieldExp OR Null
     */
    public FieldExp getExpByFieldName(String fieldName)
    {
        for(FieldExp exp : fieldExps)
        {
            if(exp.getFieldName().compareToIgnoreCase(fieldName) == 0)
            {
                return exp;
            }
        }
        return null;
    }
    
    
    /**
     * 克隆对象本身
     */
    @Override    
    public Criteria clone(){
        Criteria criteria = new Criteria();
        criteria.setOrder(this.getOrder());
        criteria.fieldExps.addAll(this.getFieldExps());
        return criteria;
    }
    
    /**
     * 排序条件
     * @return 排序条件, nullable 表示未指定排序条件
     */
    public Order getOrder()
    {
        return order;
    }

    /**
     * 设置排序条件
     * @param order 排序条件 allow null
     * @return this
     */
    public Criteria setOrder(Order order)
    {
        this.order = order;
        return this;
    }

    /** 字段条件列表 */
    private List<FieldExp> fieldExps = new ArrayList<FieldExp>(5);
    /** 排序方法 */
    private Order order = null;
}
