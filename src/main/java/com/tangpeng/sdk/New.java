/*
 * $Id: New.java 1262 2012-07-18 02:09:41Z songhz $
 * 文件名称: New.java
 * 文件描述: 无
 * 版权所有: 版权所有(C)2001-2011
 * 公       司: 深圳市中兴通讯股份有限公司
 * 内容摘要: 无
 * 其他说明: 无
 * 创建日期: 2011-5-3
 * 更新日期: $Date:: 2012-07-18 10:09:41 +0800#$:
 * 修改记录1: // 修改历史记录，包括修改日期、修改者及修改内容
 *    修改日期：
 *    版 本 号：
 *    修 改 人：
 *    修改内容：
 * 修改记录2：…
 */
package com.tangpeng.sdk;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;

/**
 * 创建对象的工具类。<br>
 * 特别是泛型时，可以避免啰嗦的书写，使得代码更简洁。
 * @author gaoyuan
 * @version $Rev: 1262 $
 * @since V3_00_50P2B2
 */
public final class New
{
    /** 长度为0的整数数组 */
    public static final int[] EMPTY_INT_ARRAY = new int[0];

    /**
     * 创建一个arrayList
     * @param <T> type
     * @return arrayList
     */
    public static <T> ArrayList<T> arrayList()
    {
        return new ArrayList<T>();
    }

    /**
     * 用初始的容积创建一个arrayList
     * @param <T> type
     * @param cap 初始容积
     * @return arrayList
     */
    public static <T> ArrayList<T> arrayList(int cap)
    {
        return new ArrayList<T>(cap);
    }

    /**
     * 根据给定的collection创建arrayList
     * @param <T> 类型
     * @param c 集合
     * @return arrayList
     */
    public static <T> ArrayList<T> arrayList(Collection<T> c)
    {
        return new ArrayList<T>(c);
    }

    /**
     * 创建一个hashMap
     * @param <K> 键类型
     * @param <V> 值类型
     * @return hashMap
     */
    public static <K, V> HashMap<K, V> hashMap()
    {
        return new HashMap<K, V>();
    }

    /**
     * 创建一个hashMap
     * @param <K> 键类型
     * @param <V> 值类型
     * @param capacity 初始空间大小
     * @return hashMap
     */
    public static <K, V> HashMap<K, V> hashMap(int capacity)
    {
        return new HashMap<K, V>(capacity);
    }

    /**
     * 创建一个hashset
     * @param <T> 类型
     * @return hashset
     */
    public static <T> HashSet<T> hashSet()
    {
        return new HashSet<T>();
    }

    /**
     * 创建一个二元组对象
     * @param <T1>
     * @param <T2>
     * @param fst 分量1
     * @param snd 分量2
     * @return 二元组对象
     */
    public static <T1, T2> Pair<T1, T2> pair(T1 fst, T2 snd)
    {
        return new Pair<T1, T2>(fst, snd);
    }

    /**
     * 创建一个三元组对象
     * @param <T1> 分量1类型
     * @param <T2> 分量2类型
     * @param <T3> 分量3类型
     * @param fst 分量1
     * @param snd 分量2
     * @param thd 分量3
     * @return 三元组对象
     */
    public static <T1, T2, T3> Triple<T1, T2, T3> triple(T1 fst, T2 snd, T3 thd)
    {
        return new Triple<T1, T2, T3>(fst, snd, thd);
    }

    /**
     * 创建一个四元组对象
     * @param <T1> 分量1类型
     * @param <T2> 分量2类型
     * @param <T3> 分量3类型
     * @param <T4> 分量4类型
     * @param fst 分量1
     * @param snd 分量2
     * @param thd 分量3
     * @param fth 分量4
     * @return 四元组对象
     */
    public static <T1, T2, T3, T4> Tetrad<T1, T2, T3, T4> tetrad(T1 fst, T2 snd, T3 thd, T4 fth)
    {
        return new Tetrad<T1, T2, T3, T4>(fst, snd, thd, fth);
    }

    /**
     * 不可实例化
     */
    private New()
    {

    }
}
