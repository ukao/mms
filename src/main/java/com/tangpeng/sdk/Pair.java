/*
 * $Id: Pair.java 1262 2012-07-18 02:09:41Z songhz $
 * 文件名称: Pair.java
 * 文件描述: 无
 * 版权所有: 版权所有(C)2001-2011
 * 公       司: 深圳市中兴通讯股份有限公司
 * 内容摘要: 无
 * 其他说明: 无
 * 创建日期: 2011-4-25
 * 更新日期: $Date:: 2012-07-18 10:09:41 +0800#$:
 * 修改记录1: // 修改历史记录，包括修改日期、修改者及修改内容
 *    修改日期：
 *    版 本 号：
 *    修 改 人：
 *    修改内容：
 * 修改记录2：…
 */
package com.tangpeng.sdk;

import java.io.Serializable;

/**
 * 二元组
 * @param <T1> 分量1类型
 * @param <T2> 分量2类型
 * @author gaoyuan
 * @version $Rev: 1262 $
 * @since V3_00_50P2B1
 */
public class Pair<T1, T2> implements Serializable
{
    /**
     * 构造函数
     * @param fst 分量1
     * @param snd 分量2
     */
    public Pair(T1 fst, T2 snd)
    {
        this.fst = fst;
        this.snd = snd;
    }

    @Override
    public String toString()
    {
        return "Pair(" + String.valueOf(fst) + ", " + String.valueOf(snd) + ")";
    }
    
    @Override
    public int hashCode()
    {
        if (fst == null)
            return snd != null ? snd.hashCode() + 1 : 0;
        if (snd == null)
            return fst.hashCode() + 2;
        else
            return fst.hashCode() * 17 + snd.hashCode();
    }

    @Override
    public boolean equals(Object o)
    {
        if (o instanceof Pair< ? , ? >)
        {
            Pair< ? , ? > other = (Pair< ? , ? >) o;
            return objectEquals(this.fst, other.fst) && objectEquals(this.snd, other.snd);
        }
        return false;
    }

    public boolean equalsTo(T1 o1, T2 o2)
    {
        return objectEquals(fst, o1) && objectEquals(snd, o2);
    }
    
    /**
     * 判断两个对象是否相等的方法，可处理null
     * @param obj1 对象1
     * @param obj2 对象1
     * @return 都为null 或 obj1.equals(obj2)为true
     */
    protected boolean objectEquals(Object obj1, Object obj2)
    {
        return obj1 == null && obj2 == null || obj1 != null && obj1.equals(obj2);
    }
    
    /**分量1 */
    public T1 fst;
    /**分量2 */
    public T2 snd;
    
    private static final long serialVersionUID = 2815044214343796339L;
}
