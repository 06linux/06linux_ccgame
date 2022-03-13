/**
 * 友盟统计接口
 */
export class StatUmeng {

    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        // console.log("StatUmeng constructor");
    }

    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new StatUmeng();
        }
        return this.m_Instance;
    }
}