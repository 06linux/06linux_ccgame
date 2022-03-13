/**
 * Base 模块初始化设置
 */
export class Base {

    //使用严格模式
    'use strict'

    static Init(){
        console.log("Base.Init ...");
    }

    static Destory(){
        console.log("Base.Destory ...");
    }

    static OnShow(){
        console.log("Base.OnShow ...");
    }

    static OnHidden(){
        console.log("Base.OnHidden ...");
    }
}
