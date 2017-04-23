/*
 * $Id: Triple.java 1531 2012-07-23 07:11:39Z likai193736 $
 * 文件名称: Triple.java
 * 文件描述: 无
 * 版权所有: 版权所有(C)2001-2011
 * 公       司: 深圳市中兴通讯股份有限公司
 * 内容摘要: 无
 * 其他说明: 无
 * 创建日期: 2011-4-25
 * 更新日期: $Date:: 2012-07-23 15:11:39 +0800#$:
 * 修改记录1: // 修改历史记录，包括修改日期、修改者及修改内容
 *    修改日期：
 *    版 本 号：
 *    修 改 人：
 *    修改内容：
 * 修改记录2：…
 */
package com.tangpeng.sdk;


/**
 * 泛型三元组
 * @param <T1> 分量1类型
 * @param <T2> 分量2类型
 * @param <T3> 分量3类型
 * @author gaoyuan
 * @version $Rev: 1531 $
 * @since V3_00_50P2B1
 */
public class Triple<T1, T2, T3> extends Pair<T1, T2>
{
	private static final long serialVersionUID = 8715013113490003913L;

	/**
     * 构造函数
     * @param fst 分量1
     * @param snd 分量2
     * @param thd 分量3
     */
    public Triple(T1 fst, T2 snd, T3 thd)
    {
        super(fst, snd);
        this.thd = thd;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((thd == null) ? 0 : thd.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        return super.objectEquals(this.thd, ((Triple< ? , ? , ? >) obj).thd);
    }

    /**分量3 */
    public T3 thd;
}
