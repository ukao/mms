/**
 * 
 */
package com.tangpeng.auth;

/**
 * @author tangpeng
 *
 */
public enum RightType {
	
	/** Equal */
    MENU( 1), //
    /** Less Equal */
    OPERATION( 2 );
	
	RightType(int type)
    {
        this.type = type;
    }
    
    public int type()
    {
        return type;
    }
    
    private int type;
}
