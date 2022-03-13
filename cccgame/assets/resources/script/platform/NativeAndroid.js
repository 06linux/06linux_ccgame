/**
 * 安卓原生平台
 */
export class NativeAndrid {

    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        console.log("NativeAndrid constructor");
    }

    /**
     * jsb 调用函数
     */
    JsbMethod = {
        //()V 无参数 无返回值
        //(Ljava/lang/String;)V 参数为string 无返回值
        //()Ljava/lang/String;  无参数 返回string
        //(Ljava/lang/String;)Ljava/lang/String;  
        //org.cocos2dx.javascript/AppActivity
        classPath: "org/cocos2dx/javascript/AppActivity",

        //java 调用无参数无返回值的函数
        CALL_JAVA_Arg0_RetVoid(functionname) {
            jsb.reflection.callStaticMethod(this.classPath, functionname, "()V");
        },

        //java 调用一个参数无返回值的函数
        CALL_JAVA_Arg1_RetVoid(functionname, param1) {
            jsb.reflection.callStaticMethod(this.classPath, functionname, "(Ljava/lang/String;)V", param1);
        },

        //java 调用两个参数无返回值的函数
        CALL_JAVA_Arg2_RetVoid(functionname, param1, param2) {
            jsb.reflection.callStaticMethod(this.classPath, functionname, "(Ljava/lang/String;Ljava/lang/String;)V", param1, param2);
        },

        //java 调用三个参数无返回值的函数
        CALL_JAVA_Arg3_RetVoid(functionname, param1, param2, param3) {
            jsb.reflection.callStaticMethod(this.classPath, functionname, "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", param1, param2, param3);
        },

        //java 调用四个参数无返回值的函数
        CALL_JAVA_Arg4_RetVoid(functionname, param1, param2, param3, param4) {
            jsb.reflection.callStaticMethod(this.classPath, functionname, "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", param1, param2, param3, param4);
        },

        //java 调用无参数有返回值的函数
        CALL_JAVA_Arg0_RetArg(functionname) {
            var result = jsb.reflection.callStaticMethod(this.classPath, functionname, "()Ljava/lang/String;");
            return result;
        },

        //java 调用一个参数有返回值的函数
        CALL_JAVA_Arg1_RetArg(functionname, param1) {
            var result = jsb.reflection.callStaticMethod(this.classPath, functionname, "(Ljava/lang/String;)Ljava/lang/String;", param1);
            return result;
        },

        //java 调用两个参数有返回值的函数
        CALL_JAVA_Arg2_RetArg(functionname, param1, param2) {
            var result = jsb.reflection.callStaticMethod(this.classPath, functionname, "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", param1, param2);
            return result;
        },
    }

    /**
     * Android apk 交互相关函数
     * Java 函数调用 JavaScript 函数的封装
     *
     * 备注：回调函数必须绑定在 window 对象上，作为全局函数使用 
     */
    NativeCallBack() {
        /**
         * 视频奖励发放
         */
        window.RewardVideoADonReward = (state) => {
            console.log("RewardVideoADonReward state:", state);
            if (state == 1) {
                //视频播放成功
                NativeAndrid.Instance()._onRewardSuccess();
            }
            else {
                //视频播放失败
                NativeAndrid.Instance()._onRewardFail();
            }
        }
    }

    /*
    * 显示激励视频视频广告
    */
    GstRewardVideoAD(_onSuccess = null, _onFail = null) {
        console.log("调用java GstRewardVideoAD");
        this._onRewardSuccess = _onSuccess;
        this._onRewardFail = _onFail;

        this.JsbMethod.CALL_JAVA_Arg0_RetVoid('GstRewardVideoAD');
    }

    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new NativeAndrid();
        }
        return this.m_Instance;
    }
}