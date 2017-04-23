package com.tangpeng.sdk;


/**
 * 进行约束检查的方法。
 * <p>
 * 这些判定检查一般可以作为函数的入口参数检测使用，但是要注意区分是模块间调用的参数检查还是内部 参数检查。内部参数
 * 检查推荐使用方法的前置条件说明加assert指令来进行，而不是使用这些运行时判定方法。
 * </p>
 * 比如：
 * 
 * <pre>
 * void doSomething(T1 e, int i)
 * {
 *     assert e != null : &quot;param1 should not be null&quot;;
 *     assert i &gt; 0 : &quot;param0 should be positive&quot;;
 * }
 * </pre>
 * @author gaoyuan
 * @version $Rev: 1262 $
 * @since 2011-7-18
 */
public final class Constraint
{
    /**
     * 确认给定的值不为null，否则抛出NullPointerException
     * @param obj 待判定对象
     * @param errorMsg 抛出的异常中得消息
     * @exception NullPointerException 当obj为null时抛出
     */
    public static void assureNotNull(Object obj, String errorMsg)
    {
        if (obj == null)
        {
            throw new NullPointerException(errorMsg);
        }
    }

    /**
     * 当给定的值为null或trim(s).isEmpty时抛出异常
     * @param s 待判定对象
     * @param errorMsg 抛出的异常中得消息
     * @exception IllegalArgumentException
     */
    public static void assureNotEmpty(CharSequence s, String errorMsg)
    {
        if (s == null || s.length() == 0 || s.toString().trim().isEmpty())
        {
            throw new IllegalArgumentException(errorMsg);
        }
    }

    /**
     * 确认给定的对象是否再后面的可选项目中。<br/>
     * 可支持null，相等判定采用equals方法。如：<br/>
     * 
     * <pre>
     * assureWithin(timeUnit, &quot;SECOND&quot;, &quot;HOUR&quot;, &quot;DAY&quot;);
     * assureWithin(d, 5, 10, 15);
     * </pre>
     * @param <T> 参数类型
     * @param v 要判定的值
     * @param option1 第一个可选值，目的是在变参列表中要求至少提供一个。
     * @param options 其它可选项目
     * @exception IllegalArgumentException 当v不等于任何一个可选项时
     */
    public static <T> void assureWithin(T v, T option1, T... options)
    {
        if (Constraint.objectEquals(v, options))
        {
            return;
        }
        for (T option : options)
        {
            if (Constraint.objectEquals(v, option))
            {
                return;
            }
        }
        throw new IllegalArgumentException(createMsgForWithin(v, option1, options));
    }

    /**
     * 确认给定的字符串是否“等于”可选项目中的某一项，不区分大小写。否则抛出异常<br/>
     * 机制同{@link #assureWithin(Object, Object, Object...)}，需要特别注意的是本
     * 断言内部不进行trim处理，请调用方自行处理。
     * @param v 待判定的值
     * @param option1 第一个可选项
     * @param options 其它可选项
     */
    public static void assureWithinIgnoreCase(String v, String option1, String... options)
    {
        if (stringEqualIgnoreCase(v, option1))
        {
            return;
        }
        for (String option : options)
        {
            if (stringEqualIgnoreCase(option, v))
            {
                return;
            }
        }

        throw new IllegalArgumentException(createMsgForWithin(v, option1, options));
    }

    /**
     * 确认给定数组不为空且长度为给定长度。若不满足抛出{@link IllegalArgumentException}
     * @param arr 数组
     * @param expectLen 期望长度
     */
    public static void assureArrayLength(Object[] arr, int expectLen)
    {
        if (arr == null || arr.length != expectLen)
        {
            throw new IllegalArgumentException("Length of array should be " + expectLen);
        }
    }

    /**
     * 确认给定数组不为空且长度为给定长度。若不满足以给定的msg抛出{@link IllegalArgumentException}
     * @param arr 数组
     * @param expectLen 期望长度
     * @param msg 错误信息
     * @exception IllegalArgumentException
     */
    public static void assureArrayLength(Object[] arr, int expectLen, String msg)
    {
        if (arr == null || arr.length != expectLen)
        {
            throw new IllegalArgumentException(msg);
        }
    }

    /**
     * 确认给定的值为true，否则抛出IllegalStateException。
     * @param v 判定值
     * @param errorMsg 抛出的异常中得消息
     * @exception IllegalStateException 当v为false时抛出
     */
    public static void assureTrue(boolean v, String errorMsg)
    {
        if (!v)
        {
            throw new IllegalStateException(errorMsg);
        }
    }

    /**
     * 确认给定的值为false，否则抛出IllegalStateException。
     * @param v 判定值
     * @param errorMsg 抛出的异常中得消息
     * @exception IllegalStateException 当v为true时抛出
     */
    public static void assureFalse(boolean v, String errorMsg)
    {
        if (v)
        {
            throw new IllegalStateException(errorMsg);
        }
    }


    /**
     * 确认数组中不含null元素
     * @param <T> 数组类型
     * @param arr 待检查数组
     * @param arrName 数组名称
     */
    public static <T> void assureNoNullELem(T arr[], String arrName)
    {
        if (arr == null)
        {
            throw new NullPointerException(arrName);
        }

        for (int i = 0; i < arr.length; i++)
        {
            if (arr[i] == null)
            {
                throw new IllegalArgumentException("the argument " + arrName + "[" + i + "] is null!");
            }
        }
    }

    /**
     * 判定两个对象是否相等，可支持null
     * @param o1 对象1 nullable
     * @param o2 对象2 nullable
     * @return (o1 == null and o2 == null) or (o1 != null and o1.equals(o2))
     */
    public static boolean objectEquals(Object o1, Object o2)
    {
        return (o1 == null) ? o2 == null : o1.equals(o2);
    }

    /**
     * 判断两个字符串是否忽略大小写相等，或同为null
     * @param s1 字符串1 nullable
     * @param s2 字符串2 nullable
     * @return 都为null or s1.equalsIgnoreCase(s2)
     */
    public static boolean stringEqualIgnoreCase(String s1, String s2)
    {
        return (s1 == null) ? s2 == null : s1.equalsIgnoreCase(s2);
    }

    /**
     * 创建within判定的友好异常提示
     */
    private static <T> String createMsgForWithin(T v, T option1, T... options)
    {
        //创建友好的错误提示
        StringBuilder sb = new StringBuilder(String.valueOf(v));
        sb.append(" not within scope (");
        sb.append(String.valueOf(option1));
        for (T option : options)
        {
            sb.append(",").append(String.valueOf(option));
        }
        sb.append(")");
        return sb.toString();
    }
}
