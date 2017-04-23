package com.tangpeng.sdk;

import java.io.Serializable;

/**
 * 表达排序方式的类。
 * @author tangpeng
 */
public class Order implements Serializable
{
    /** serialVersionUID  */
    private static final long serialVersionUID = -1122294888667947823L;
    
    /** 升序常量 */
    public static final int ASC = 0;
    /** 降序常量 */
    public static final int DESC = 1;

    /**
     * 构造一个升序对象的快捷方式
     * @param fieldName 字段名
     * @return Order, not null
     */
    public static Order asc(String fieldName)
    {

        return new Order(fieldName, ASC);
    }

    /**
     * 构造一个降序对象的快捷方式
     * @param fieldName 字段名
     * @return Order, not null
     */
    public static Order desc(String fieldName)
    {
        return new Order(fieldName, DESC);
    }

    /**
     * 用bool型表达升降序的构造方式。
     * @param fieldName 字段名
     * @param asc true 表示升序, false 表示降序
     * @return Order, not null
     */
    public static Order by(String fieldName, boolean asc)
    {
        return new Order(fieldName, (asc) ? ASC : DESC);
    }

    public static Order by(String fieldName, int dir)
    {
        return new Order(fieldName, dir);
    }

    /**
     * 私有构造.
     * @param fieldName 字段名
     * @param dir 方向，应该是 {@link #ASC}, {@link #DESC}之一
     */
    private Order(String fieldName, int dir)
    {
        if (dir != ASC && dir != DESC)
        {
            throw new IllegalArgumentException("Sort direction should in [" + ASC + "," + DESC + "]");
        }
        this.fieldName = fieldName;
        this.dir = dir;
    }

    /**
     * 字段名
     * @return <code>String</code> 字段名
     */
    public String getFieldName()
    {
        return fieldName;
    }

    /**
     * 排序方向
     * @return int  {@link #ASC} OR {@link #DESC}
     */
    public int getDir()
    {
        return dir;
    }

    /**
     * 排序方向是否为升序
     * @return boolean, result = this.dir eq ASC
     */
    public boolean isAsc()
    {
        return dir == ASC;
    }

    /** 字段名 */
    private String fieldName;
    /** 方向 */
    private int dir;
    
    
}
