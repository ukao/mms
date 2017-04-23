package com.tangpeng.sdk;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


/**
 * 查询条件<code>FieldExp</code>列表转换为SQL表达式并进行参数处理的类。
 * @author gaoyuan
 * @version $Rev: 1262 $
 * @since V3_00_50P1B1
 */
public class ExpressionSqlBuilder implements Serializable
{

    /**
     * FieldExp转换为带参数站位符"?"的SQL表达式，各个字段表达式间按AND方式组合。
     * <ul>
     * <li>当exps.size = 0时 为 "( 1 &lt; 2)"</li>
     * <li>当exps.size = 1时 为 "(f op ?)"</li>
     * <li>当exps.size > 1时，类似"(f1 op1 ?) AND (f2 op2 ?) AND ..."
     * </ul>
     * @param exps 条件表达式列表, not null can be empty
     * @return 带参数站位符的SQL表达式, not empty
     */
    public static String buildWhereExp(List<FieldExp> exps)
    {
        final Map<String, String> empty = Collections.emptyMap();
        return buildWhereExp(exps, empty);
    }

    /**
     * 带字段名称转换的SQL表达式转换方法，功能同 {@link #buildWhereExp(List)}。 如若fieldNameMap包含
     * &lt;f1, f2&gt;，则生成的SQL中对应FieldExp.fieldName为f1的表达式 将使用f2作为字段名，否则使用原f1
     * @param exps 条件表达式列表, not null
     * @param fieldNameMap 字段名转换映射, not null。若无可用
     * {@link java.util.Collections#emptyMap()}
     * @return 带参数占位符的SQL表达式, not empty
     */
    public static String buildWhereExp(List<FieldExp> exps, Map<String, String> fieldNameMap)
    {
        ExpressionSqlBuilder builder = new ExpressionSqlBuilder(exps, fieldNameMap);
        return builder.buildWhereExp();
    }

    /**
     * 将表达式列表中的参数赋值到给定的PreparedStatement中，此stmt需是使用{@link #buildWhereExp(List)}
     * 产生的SQL创建的。
     * @param exps 表达式列表 not null can be empty
     * @param stmt PreparedStatement
     * @param startIndex
     * 参数赋值时的起始位置，普通情况应为1。若stmt中的SQL有自行使用的"?"，startIndex为exps对应的SQL片段前"?"的个数加1
     * @see #getParamCount(List)
     */
    public static void assignQueryParameter(List<FieldExp> exps, PreparedStatement stmt, int startIndex)
    {
        final Map<String, String> empty = Collections.emptyMap();
        ExpressionSqlBuilder builder = new ExpressionSqlBuilder(exps, empty);
        builder.assignQueryParameter(stmt, startIndex);
    }

    /**
     * 获取表达式生成的SQL中的参数的个数 Between 2个、in多个、is null没有、其他1个
     * @param exps 表达式列表 not null can be empty
     * @return "?"的个数
     */
    public static int getParamCount(List<FieldExp> exps)
    {
        final Map<String, String> empty = Collections.emptyMap();
        ExpressionSqlBuilder builder = new ExpressionSqlBuilder(exps, empty);
        return builder.getParamCount();
    }

    /**
     * 转换order对象为SQL语句
     * <ul>
     * <li>order为null时为空串</li>
     * <li>order非null时为order by子句，后面带一空格</li>
     * </ul>
     * @param order 排序设定 allow null
     * @return 空串 OR Order 子句
     */
    public static String getOrderBySql(Order order)
    {
        if (order == null)
        {
            return "";
        }
        return ExpressionSqlBuilder.getOrderbyFragment(order.getFieldName(), order.getDir());
    }

    /**
     * 单个表达式的SQL生成接口
     * @since 2011-8-11
     */
    public static interface ExpSqlGenerator extends Serializable
    {
        /**
         * 生成此exp的SQL表达式
         * @param exp 表达式
         * @return not null
         */
        String getExpressionSql(FieldExp exp);

        /**
         * 此表达式中包含的参数占位符"?"的个数
         * @param exp 表达式
         * @return "?"的个数，没有就是0
         */
        int getParamCount(FieldExp exp);

        /**
         * 给PreparedStatement赋值参数
         * @param exp 表达式
         * @param stmt 由本SQlExpressionBuilder生成的PreparedStatement
         * @param startPos 本表达式所含的第一个"?"的位置
         * @return 结束后的参数位置，即下一个exp的"?"的起始位置。 应保证 ret = startPos +
         * this.getParamCount
         * @throws SQLException 底层的异常就放出来就是了
         */
        int assignParameter(FieldExp exp, PreparedStatement stmt, int startPos) throws SQLException;
    }

    /**
     * 表达式 替换接口。用于在转换为SQL时将某些特定原始Exp进行替换。
     */
    public static interface ExpSubstituter
    {
        /**
         * 当此方法被触发时，可根据传入的exp产生新的exp来替代原exp进行sql生成。 <br/>
         * <ul>
         * <li>Result not null时，用返回值进行转换，原来的exp将不再参与SQL生成</li>
         * <li>特殊的用法是将传入的exp处理下就返回它。不过不建议直接在原exp上进行修改，生成新的为好，
         * 以避免修改“别人传入”的原始表达式。</li>
         * <li>Result is null时，表示剔除此表达式。exp@param 将不再参与转换</li>
         * </ul>
         * @param exp 符合给定字段名的表达式 not null
         * @return 新的表达式
         * @see ExpressionSqlBuilder#regExpSubstituter(String, ExpSubstituter)
         */
        FieldExp replace(FieldExp exp);
    }

    /**
     * 创建SQL Orderby片段
     */
    private static String getOrderbyFragment(String fieldName, int dir)
    {
        return "ORDER BY " + fieldName + ((dir == Order.ASC) ? " ASC " : " DESC ");
    }

    /**
     * 构造函数
     */
    public ExpressionSqlBuilder(List<FieldExp> exps)
    {
        this(exps, null);
    }

    /**
     * 构造函数
     * @param exps
     * @param fieldNameMap
     */
    public ExpressionSqlBuilder(List<FieldExp> exps, Map<String, String> fieldNameMap)
    {
        this.exps = exps;
        final Map<String, String> empty = New.hashMap();
        this.fieldNameMap = (fieldNameMap == null) ? empty : fieldNameMap;
        this.generatorMapByOp.put(Operator.STARTWITH, new StartWithExpSqlGenerator());
    }

    public String buildWhereExp()
    {
        Iterator<FieldExp> it = transedExps().iterator();
        if (!it.hasNext())
        {
            return "(1 < 2)";
        }

        final StringBuffer sb = new StringBuffer();
        appendFieldExpSql(it.next(), sb);
        while (it.hasNext())
        {
            sb.append(" AND ");
            appendFieldExpSql(it.next(), sb);
        }

        return sb.toString();
    }

    public String buildOrderBySql(Order order)
    {
        if (order == null)
        {
            return "";
        }
        String realFieldname = getRealFieldName(order.getFieldName());

        return ExpressionSqlBuilder.getOrderbyFragment(realFieldname, order.getDir());
    }

    /**
     * 将表达式列表中的参数赋值到给定的PreparedStatement中，此stmt需是使用{@link #buildWhereExp(List)}
     * 产生的SQL创建的。
     * @param stmt PreparedStatement
     * @param startIndex
     * 参数赋值时的起始位置，普通情况应为1。若stmt中的SQL有自行使用的"?"，startIndex为exps对应的SQL片段前"?"的个数加1
     * @see #getParamCount(List)
     */
    public void assignQueryParameter(PreparedStatement stmt, int startIndex)
    {
        try
        {
            int index = startIndex;
            for (Iterator<FieldExp> it = transedExps().iterator(); it.hasNext();)
            {
                final FieldExp fieldExp = it.next();
                final ExpSqlGenerator expGen = getSqlGenerator(fieldExp);
                index = expGen.assignParameter(fieldExp, stmt, index);
            }
        }
        catch (SQLException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * 获取表达式生成的SQL中的参数的个数 Between 2个、in多个、is null没有、其他1个
     * @return "?"的个数
     */
    public int getParamCount()
    {
        int n = 0;
        for (Iterator<FieldExp> it = transedExps().iterator(); it.hasNext();)
        {
            final FieldExp exp = it.next();
            final ExpSqlGenerator expGen = getSqlGenerator(exp);
            n += expGen.getParamCount(exp);
        }
        return n;
    }

    /**
     * 注册一个表达式的SQl生成器，名称为此的字段将使用给定的生成器
     * @param fieldName 字段名 not null
     * @param generator 表达式生成器 not null
     */
    public void regExpSqlGenerator(String fieldName, ExpSqlGenerator generator)
    {
        this.generatorMapByFieldName.put(fieldName, generator);
    }

    /**
     * 添加一个表达式替换器
     * @param fieldName 字段名
     * @param substituter 替换器
     * @return 绑定到该字段的原替换器，若无则为null
     */
    public ExpSubstituter regExpSubstituter(String fieldName, ExpSubstituter substituter)
    {
        return substituterMap.put(fieldName, substituter);
    }

    /**
     * 表达式列表
     * @return not null
     */
    public List<FieldExp> getExps()
    {
        return exps;
    }

    /**
     * 字段名称映射表
     * @return not null may empty
     */
    public Map<String, String> getFieldNameMap()
    {
        return fieldNameMap;
    }

    /**
     * 获取针对给定表达式的SQL生成器。按照是否有基于名字的特例，然后是基于操作符的特例，默认生成器这样的顺序。
     */
    private ExpSqlGenerator getSqlGenerator(FieldExp exp)
    {
        if (generatorMapByFieldName.containsKey(exp.getFieldName()))
        {
            return generatorMapByFieldName.get(exp.getFieldName());
        }
        if (generatorMapByOp.containsKey(exp.getOp()))
        {
            return generatorMapByOp.get(exp.getOp());
        }
        return defaultGenerator;
    }

    /**
     * 生成某个字段的条件表达式
     */
    private void appendFieldExpSql(FieldExp exp, StringBuffer sb)
    {
        final ExpSqlGenerator expGen = getSqlGenerator(exp);
        sb.append(expGen.getExpressionSql(exp));
    }

    /**
     * 获得转换后fieldName应该使用的名称。若未设定对应的名称即为
     */
    private String getRealFieldName(String fieldName)
    {
        if (fieldNameMap.containsKey(fieldName))
            return fieldNameMap.get(fieldName);
        return fieldName;
    }

    private List<FieldExp> transedExps()
    {
        if (this.transedExps == null)
        {
            this.transedExps = New.arrayList(this.exps.size());
            for (FieldExp exp : this.exps)
            {
                final ExpSubstituter subst = substituterMap.get(exp.getFieldName());
                final FieldExp transedExp = (subst != null) ? subst.replace(exp) : exp;
                if (transedExp != null)
                {
                    this.transedExps.add(transedExp);
                }
            }
        }
        return this.transedExps;
    }

    /** 外界传入的exp列表 */
    private List<FieldExp> exps;
    /** 加入Exp substitor 转换后的列表 */
    private List<FieldExp> transedExps = null;

    private Map<String, String> fieldNameMap;
    private Map<String, ExpSqlGenerator> generatorMapByFieldName = New.hashMap();
    private Map<Operator, ExpSqlGenerator> generatorMapByOp = New.hashMap();
    private ExpSqlGenerator defaultGenerator = new DefaultExpSqlGenerator();
    private Map<String, ExpSubstituter> substituterMap = New.hashMap();

    /**
     * 处理两个字段EQ,IN操作的表达式生成内，生成型如: <br/>
     * ((field1 = ?) and (field2 = ?)) or ((field1 = ?) and (field2 = ?)) or
     * ((field1 = ?) and (field2 = ?)) ... <br/>
     * 这样的SQL表达式
     */
    public static class DualFieldExpGenerator implements ExpSqlGenerator
    {
        /** serialVersionUID */
        private static final long serialVersionUID = -7404660013849758659L;

        public DualFieldExpGenerator(String fieldName1, String fieldName2)
        {
            this.fieldName1 = fieldName1;
            this.fieldName2 = fieldName2;
        }

        @Override
        public String getExpressionSql(FieldExp exp)
        {
            StringBuilder sb = new StringBuilder("(");
            boolean notFirst = false;
            for (int i = 0; i < this.getOperand(exp).length; i++)
            {
                if (notFirst)
                {
                    sb.append(" OR ");
                }
                notFirst = true;
                sb.append("(");
                sb.append("(").append(fieldName1).append(" = ?)");
                sb.append(" AND ");
                sb.append("(").append(fieldName2).append(" = ?)");
                sb.append(")");
            }
            sb.append(")");
            return sb.toString();
        }

        @Override
        public int getParamCount(FieldExp exp)
        {
            return this.getOperand(exp).length * 2;
        }

        @Override
        public int assignParameter(FieldExp exp, PreparedStatement stmt, int startPos) throws SQLException
        {
            int index = startPos;
            for (Pair< ? , ? > p : this.getOperand(exp))
            {
                stmt.setObject(index++, p.fst);
                stmt.setObject(index++, p.snd);
            }
            return index;
        }

        private Pair< ? , ? >[] getOperand(FieldExp exp)
        {
            if (exp.getOp() == Operator.IN)
            {
                Object[] arr1 = ((Object[]) exp.getValue());
                Pair< ? , ? >[] arr2 = new Pair< ? , ? >[arr1.length];
                System.arraycopy(arr1, 0, arr2, 0, arr1.length);
                return arr2;
            }
            else if (exp.getOp() == Operator.EQ)
            {
                Pair< ? , ? >[] arr = new Pair< ? , ? >[] { (Pair< ? , ? >) exp.getValue() };
                return arr;
            }
            else
            {
                throw new RuntimeException("Unsupported op " + exp.getOp() + " for field " + exp.getFieldName());
            }
        }

        private String fieldName1;
        private String fieldName2;
    };

    /**
     * 一个字段用多个前缀进行条件判定的SQL生成器。 <br/>
     * 生成形如 "(f1 like "xx%s") or (f1 like "yyy%s) ..."这样的SQL表达式
     * @version $Rev: 1262 $
     * @since 2011-11-23
     */
    public class StartWithExpSqlGenerator implements ExpSqlGenerator
    {
        /** SerialVersionUID */
        private static final long serialVersionUID = 4663336569777726766L;

        /***
         * @see com.zte.ums.u32.web.iface.common.ExpressionSqlBuilder.ExpSqlGenerator#getExpressionSql(com.zte.ums.u32.web.iface.common.FieldExp)
         */
        @Override
        public String getExpressionSql(FieldExp exp)
        {
            StringBuilder sb = new StringBuilder("(");
            boolean notFirst = false;

            for (int i = this.getParamCount(exp); i > 0; i--)
            {
                if (notFirst)
                {
                    sb.append(" OR ");
                }
                notFirst = true;
                final String realFieldname = ExpressionSqlBuilder.this.getRealFieldName(exp.getFieldName());
                sb.append("(").append(realFieldname).append(" like ? )");
            }
            sb.append(")");
            return sb.toString();
        }

        /***
         * @see com.zte.ums.u32.web.iface.common.ExpressionSqlBuilder.ExpSqlGenerator#getParamCount(com.zte.ums.u32.web.iface.common.FieldExp)
         */
        @Override
        public int getParamCount(FieldExp exp)
        {
            return operandAsStringArray(exp).length;
        }

        /***
         * @see com.zte.ums.u32.web.iface.common.ExpressionSqlBuilder.ExpSqlGenerator#assignParameter(com.zte.ums.u32.web.iface.common.FieldExp,
         * java.sql.PreparedStatement, int)
         */
        @Override
        public int assignParameter(FieldExp exp, PreparedStatement stmt, int startPos) throws SQLException
        {
            int index = startPos;
            for (String s : operandAsStringArray(exp))
            {
                stmt.setObject(index++, s + "%");
            }
            return index;
        }

        private String[] operandAsStringArray(FieldExp exp)
        {
            Constraint.assureNotNull(exp.getValue(), "value of " + exp.getFieldName());
            if (!exp.getValue().getClass().isArray())
            {
                throw new IllegalArgumentException("Error when process \"" + exp.getFieldName() +
                                                   "\". value field of STARTWITH should be String array");
            }
            Object[] arr1 = ((Object[]) exp.getValue());
            String[] arr2 = new String[arr1.length];
            System.arraycopy(arr1, 0, arr2, 0, arr1.length);
            return arr2;
        }
    }

    /**
     * 默认的单个字段的表达式生成器
     * @author gaoyuan
     * @version $Rev: 1262 $
     * @since 2011-8-11
     */
    private class DefaultExpSqlGenerator implements ExpSqlGenerator
    {
        /** SerialVersionUID */
        private static final long serialVersionUID = 2544987310390940817L;

        /***
         * @see com.zte.ums.u32.web.iface.common.ExpressionSqlBuilder.ExpSqlGenerator#getExpressionSql(com.zte.ums.u32.web.iface.common.FieldExp)
         */
        @Override
        public String getExpressionSql(FieldExp exp)
        {
            StringBuilder sb = new StringBuilder();
            //是否反转
            if (exp.isInvert())
            {
                sb.append("(NOT ");
            }
            //前一半 "(field "
            sb.append("(").append(ExpressionSqlBuilder.this.getRealFieldName(exp.getFieldName()));
            //操作符
            sb.append(" ").append(getOpSymbol(exp.getOp())).append(" ");
            //操作数
            // 特殊情况 IN
            if (exp.getOp() == Operator.IN)// "(?, ?, ?, ?)"
            {
                sb.append("(");
                Object[] params = (Object[]) exp.getValue();
                for (int i = 0; i < params.length; i++)
                {
                    if (i > 0)
                        sb.append(", ");
                    sb.append("?");
                }
                sb.append(")");
            }
            else if (exp.getOp() != Operator.ISNULL)
            // 一般的就是一个"?"(排除isnull)
            {
                sb.append("?");
                // 特殊情况 BETWEEN
                if (exp.getOp() == Operator.BETWEEN)
                {
                    sb.append(" AND ?");
                }
                else if (exp.getOp() == Operator.ISEMPTY)
                {
                    //特殊情况 isEmpty
                    sb.append(" OR " + ExpressionSqlBuilder.this.getRealFieldName(exp.getFieldName()) + " " +
                              getOpSymbol(Operator.ISNULL));
                }
            }
            sb.append(")");

            //是否反转        
            if (exp.isInvert())
            {
                sb.append(" )");
            }
            return sb.toString();
        }

        /***
         * @see com.zte.ums.u32.web.iface.common.ExpressionSqlBuilder.ExpSqlGenerator#getParamCount(com.zte.ums.u32.web.iface.common.FieldExp)
         */
        @Override
        public int getParamCount(FieldExp exp)
        {
            switch (exp.getOp())
            {
                case BETWEEN:
                    return 2;
                case IN:
                    return ((Object[]) exp.getValue()).length;
                case ISNULL:
                    return 0;
                default:
                    return 1;
            }
        }

        /***
         * @see com.zte.ums.u32.web.iface.common.ExpressionSqlBuilder.ExpSqlGenerator#assignParameter(com.zte.ums.u32.web.iface.common.FieldExp,
         * java.sql.PreparedStatement, int)
         */
        @Override
        public int assignParameter(FieldExp fieldExp, PreparedStatement stmt, int startPos) throws SQLException
        {
            int index = startPos;
            if (fieldExp.getOp() == Operator.BETWEEN)
            {
                @SuppressWarnings("unchecked")
                Pair<Object, Object> range = (Pair<Object, Object>) fieldExp.getValue();
                stmt.setObject(index, range.fst);
                stmt.setObject(index + 1, range.snd);
                index += 2;
            }
            else if (fieldExp.getOp() == Operator.IN)
            {
                final Object[] values = (Object[]) fieldExp.getValue();
                for (int i = 0; i < values.length; i++)
                {
                    stmt.setObject(index + i, values[i]);
                }
                index += values.length;
            }
            else if (fieldExp.getOp() == Operator.CONTAINS)
            {
                stmt.setObject(index, "%" + fieldExp.getValue() + "%");
                index += 1;
            }
            else if (fieldExp.getOp() == Operator.STARTWITH)
            {
                stmt.setObject(index, fieldExp.getValue() + "%");
                index += 1;
            }
            else if (fieldExp.getOp() == Operator.ISEMPTY)
            {
                stmt.setObject(index, "");//为空
                index += 1;
            }
            else if (fieldExp.getOp() != Operator.ISNULL)
            {
                stmt.setObject(index, fieldExp.getValue());
                index += 1;
            }
            return index;
        }

        /**
         * op对应的SQL操作符
         */
        private String getOpSymbol(Operator op)
        {
            switch (op)
            {
                case BETWEEN:
                    return "BETWEEN";
                case LE:
                    return "<=";
                case LT:
                    return "<";
                case GE:
                    return ">=";
                case GT:
                    return ">";
                case IN:
                    return "IN";
                case NE:
                    return "<>";
                case EQ:
                    return "=";
                case LIKE:
                    return "LIKE";
                case ISNULL:
                    return "IS NULL";
                case ISEMPTY:
                    return "=";//
                case CONTAINS:
                    return "LIKE";
                case STARTWITH:
                    return "LIKE";
                case TIMELATEST:
                    return ">=";
                default:
                    throw new RuntimeException("unknown operator " + op.symbol());
            }
        }
    }

    /**
     * 
     */
    private static final long serialVersionUID = -5025280419347864080L;

}
