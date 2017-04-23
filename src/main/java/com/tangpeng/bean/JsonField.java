package com.tangpeng.bean;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 添加了此注解的实例变量会被添加到JSON字段
 * @author tangpeng
 */
@Target(value = { ElementType.FIELD })
@Retention(value = RetentionPolicy.RUNTIME)
public @interface JsonField {
	String field() default "" ;
}
