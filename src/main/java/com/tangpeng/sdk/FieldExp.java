package com.tangpeng.sdk;

import java.io.Serializable;

/**
 * 字段查询条件。
 * @author tangpeng
 */
public class FieldExp implements Serializable
{
    /**
     * 序列化
     */
    private static final long serialVersionUID = 5966273849684877019L;

    /**
     * 构造函数.<br>
     * 当op为IN时比较特殊，value应该是一个Object[] <br>
     * 当op为BT时，value是一个Pair&lt;Object&gt;，并且value.fst表示下界，value.snd表示上界，含义为[fst,
     * snd] 当op为TL时，value是一个Pair&lt;Object&gt;，并且value.fst表示单位，value.snd表示数值
     * @param fieldName 字段名
     * @param op 操作符
     * @param value 参数值
     * @param invert 表示反转(已经不再启用，默认为false)
     * @see Pair
     */
    @Deprecated
    public FieldExp(String fieldName, Operator op, Object value, Boolean invert)
    {
        this.fieldName = fieldName;
        this.op = op;
        this.value = value;
        this.invert = invert;
    }

    /**
     * 构造函数.<br>
     * 当op为IN时比较特殊，value应该是一个Object[] <br>
     * 当op为BT时，value是一个Pair&lt;Object&gt;，并且value.fst表示下界，value.snd表示上界，含义为[fst,
     * snd] 当op为TL时，value是一个Pair&lt;Object&gt;，并且value.fst表示单位，value.snd表示数值
     * @param fieldName 字段名
     * @param op 操作符
     * @param value 参数值
     * @see Pair
     */
    public FieldExp(String fieldName, Operator op, Object value)
    {
        this.fieldName = fieldName;
        this.op = op;
        this.value = value;
        this.invert = false;
    }

    /**
     * Shortcut for {@link FieldExp#FieldExp(String, Operator, Object)
     * FieldExp(fieldName, Op, null)}
     * @see #FieldExp(String, Operator, Object)
     */
    public FieldExp(String fieldName, Operator op)
    {
        this(fieldName, op, null);
    }

    /**
     * 字段名
     * @return <code>String</code>
     */
    public String getFieldName()
    {
        return fieldName;
    }

    /**
     * setter of fieldName
     * @param fieldName 字段名
     */
    public void setFieldName(String fieldName)
    {
        this.fieldName = fieldName;
    }

    /**
     * 操作符
     * @return <code>Op</code>
     */
    public Operator getOp()
    {
        return op;
    }

    /**
     * setter of op
     * @param Operator 操作符
     */
    public void setOp(Operator op)
    {
        this.op = op;
    }

    /**
     * 参数值
     * @return <code>Object</code>
     */
    public Object getValue()
    {
        return value;
    }

    /**
     * setter of value
     * @param value 参数
     */
    public void setValue(Object value)
    {
        this.value = value;
    }

    /**
     * 是否not
     * @return the invert
     */
    public boolean isInvert()
    {
        return invert;
    }

    /**
     * set not
     * @param invert the invert to set
     */
    public void setInvert(boolean invert)
    {
        this.invert = invert;
    }

    @Override
    public String toString()
    {
        StringBuilder sb = new StringBuilder(fieldName);
        sb.append(",");
        sb.append(op == null ? "null" : op.name());
        sb.append(",");
        sb.append(value == null ? "null" : value.toString());

        return sb.toString();
    }

    /** 字段名 */
    private String fieldName;
    /** 操作符 */
    private Operator op;
    /** 参数值 */
    private Object value;
    /** 取反(not) */
    private boolean invert;

}
