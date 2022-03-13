import { NativeAndrid } from "./NativeAndroid";
import { NativeIos } from "./NativeIos";

/**
 * 游戏运行平台相关的函数，代码，判定逻辑等等
 */


// 自定义平台类型，主要自定义的类型
// 如果系统底层已经存在类型判定，在 IsXXXChanelName() 函数中直接使用系统底层的类型判定
export var PlatformType = {
    
    NULL: 10000,
   
    // 小游戏渠道
    YXY_ChannelName1:20001,
    YXY_ChannelName2:20002,
      
    // h5 渠道(web)
    WEB_ChannelName1:30001,
    WEB_ChannelName2:30002,

    // 原生 android 渠道
    ANDROID:40001,
    ANDROID_233:40002,
    ANDROID_Test1:40003,
    ANDROID_Test2:40004,
  
    // 原生 Ios 渠道
    IOS:50001,
    IOS_AppStore:50002,
    IOS_ChannelName1:50003,
}

/**
 * 平台判定，平台函数的封装
 */
export class Platform {

    //使用严格模式
    'use strict'

    /**
     * 自定义当前游戏的打包渠道
     */
    static TYPE = PlatformType.NULL;

    // 初始化(初始化调用平台相关代码)
    static _Init_(){

        if (this.IsWeiChat()) 
        {
            WeChat.Instance().OnShow();
            WeChat.Instance().OnHide();
            WeChat.Instance().InitWxShare();
        }
        else if (this.IsAndroid()) {
            //调用Android的回调绑定
            NativeAndrid.Instance().NativeCallBack();
        }
        else if(this.IsIPhone()) {
            NativeIos.Instance().NativeCallBack();
        }
        else 
        {
        }
    }

    /**
     * 当前运行环境判定
     * 微信小游戏
     */
    static IsWeiChat(){
        if(cc.sys.platform == cc.sys.WECHAT_GAME){
            return true;
        }
        return false;
    }

    /**
     * 当前运行环境判定
     * QQ小游戏
     */
    static IsQQ(){
        if(cc.sys.platform == cc.sys.QQ_PLAY){
            return true;
        }
        return false;
    }

    /**
     * 当前运行环境判定
     * 原生 android 环境
     */
    static IsAndroid(){
        if(cc.sys.platform == cc.sys.ANDROID){
            return true;
        }
        return false;
    }

    /**
     * 当前运行环境判定
     * 自定义渠道判定
     */
    static IsAndroid233(){
        if(PlatformType.ANDROID_233 == this.TYPE){
            return true;
        }
        return false;
    }

    /**
     * 当前运行环境判定
     * 原生 android 环境
     */
    static IsIPhone(){
        if(cc.sys.platform == cc.sys.IPHONE){
            return true;
        }
        return false;
    }

}

// 初始化
Platform._Init_();