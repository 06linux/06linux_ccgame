import { BaseUtil } from "./BaseUtil";
import { Platform } from "../platform/Platform";
import { WeiChat } from "../platform/WeiChat";

/**
 * 用户存档数据读取 
 * (根据实际游戏需求自己定义存档内容)
 */
 export var BaseSav_Data = {

    name: 'zhangsan',
    age: 111,
    desc: 'i am zhangsan',

 }

export class BaseSav {

    //使用严格模式
    'use strict'

    // 用户存档的 key （默认不用改变）
    static SavKey = 'sav_key_cccgame';

    /**
     * 初始化
     */
    constructor() {
        // console.log("BaseSav constructor");

        // 用户唯一的 uuid
        this.m_uuid = '';

        // 初始化用户 uuid 
        this.m_uuid = this.Read(BaseSav.SavKey);
        if(BaseUtil.IsNull(this.m_uuid))
        {
            this.m_uuid = BaseUtil.GetUUID();
            this.Write(BaseSav.SavKey, this.m_uuid);
            this.WriteData();
        }

        // 读取用户数据
        this.ReadData();
    }

    /**
     * 读用户存档 （默认的存档数据）
     */
    ReadData(){
        BaseSav_Data = JSON.parse(this.Read(this.m_uuid));
    }


    /**
     * 写用户存档 （默认的存档数据）
     */
    WriteData(){
        this.Write(this.m_uuid, JSON.stringify(BaseSav_Data));
    }

    /**
     * 读取存档
     * @param {string} _savName 存档名称
     * @returns 存档记录（string 格式）
     */
    Read(_savName){

        if(Platform.IsWeiChat())
        {
           return WeiChat.Instance().Read(_savName);
        }
        else
        {
            return cc.sys.localStorage.getItem(_savName);
        }
    }

    /**
     * 写存档
     * @param {string} _savName 存档名称
     * @param {string} _str 存档内容
     */
    Write(_savName, _str){

        if(Platform.IsWeiChat())
        {
            WeiChat.Instance().Write(_savName, _str);
        }
        else
        {
            cc.sys.localStorage.setItem(_savName, _str);
        }
    }

    /**
     * 获取用户的 uuid
     */
    GetUUID(){
        return this.m_uuid;
    }

    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new BaseSav();
        }
        return this.m_Instance;
    }

}
