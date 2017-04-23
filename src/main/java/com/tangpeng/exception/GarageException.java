package com.tangpeng.exception;

/**
 * 异常
 * @author tangpeng
 */
public class GarageException extends Exception {
	
	int code;
	
	/**
	 * 
	 * @param code 错误码 ErrorCode#
	 * @param e 异常详细信息
	 */
	public GarageException(int code,Exception e)
	{
		super(getDesc(code),e);
		this.code = code;
	}

	/**
	 * @param code  ErrorCode#
	 */
	public GarageException(int code)
	{
		super(getDesc(code));
		this.code = code;
	}
	
	/**
	 * 获取错误码描述
	 * @return
	 */
	public String getDisplayDesc()
	{
		return getDesc(code);
	}
	
	private static String getDesc(int code)
	{
		return "";
	}
	

	/**
	 * 
	 */
	private static final long serialVersionUID = -364545370296439168L;

}
