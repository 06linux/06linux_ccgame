/**
 * 游戏统计模块入口
 * 
 * 备注：游戏中所有和统计打点相关的逻辑函数统一调用此接口中封装的函数。禁止游戏逻辑中直接调用平台相关的接口函数
 */

import { StatZjsdk } from "./StatZjsdk";
import { StatAld } from "./StatAld";
import { Platform } from "../platform/Platform";

export class Stat {

    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        // console.log("StatUmeng constructor");
    }

    /**
     * 新增用户统计
     */
    NewUser(_game_id, _tg_code, _uid) {

        if(Platform.IsWeiChat())
        {
            StatZjsdk.Instance().NewUser(_game_id, _tg_code, _uid);
        }

        if(Platform.IsAndroid())
        {
        }
    }

    /**
     * 授权用户统计
     */
    AuthUser(_game_id, _tg_code, _uid) {

        if(Platform.IsWeiChat())
        {
            StatZjsdk.Instance().AuthUser(_game_id, _tg_code, _uid);
        }
    }


    /**
     * 自定义事件统计：游戏盒子 
     * @param {object} _appdata
     */
    EventGameBox(_appdata, _menuname = null){
        if(Platform.IsWeiChat())
        {
            StatAld.Instance().EventGameBox(_appdata, _menuname);
        }
    }

    /**
     * 自定义事件统计：界面打点统计
     * @param {string} _menuname
     */
    EventMenu(_menuname) {
        if(Platform.IsWeiChat())
        {
            StatAld.Instance().EventMenu(_menuname);
        }
    }

    /**
     * 自定义事件统计：皮肤打点
     * @param {string} _skinname
     */
    EventSkin(_skinname) {
        if(Platform.IsWeiChat())
        {
            StatAld.Instance().EventSkin(_menuname);
        }
    }

    /**
     * 关卡统计 关卡开始
     * @param {string} _stageId     关卡ID      该字段只能是 1 , 2 , 3 , 1.1 , 1.2 , 1.3 格式 最多支持 32 个字符 
     * @param {string} _stageName   关卡名字     最多支持 32 个字符
     * 
     */
    Stage_OnStart(_stageId = "1", _stageName = "第一关") {

        if(Platform.IsWeiChat())
        {
            StatAld.Instance().Stage_OnStart(_stageId, _stageName);
        }

    }

     /**
     * 关卡统计 关卡中使用道具
     * @param {string} _stageId     关卡ID      该字段只能是 1 , 2 , 3 , 1.1 , 1.2 , 1.3 格式 最多支持 32 个字符 
     * @param {string} _stageName   关卡名字     最多支持 32 个字符 
     * @param {string} _event       事件类型     payStart:发起支付 paySuccess:支付成功 payFail:支付失败 tools:使用道具 revive:复活 award:奖励
     * @param {string} _itemName    物品名字     
     * @param {string} _itemId      物品id     
     * @param {number} _itemCount   物品数量         
     * @param {string} _itemdesc    物品描述     
     * @param {number} _itemMoney   物品价格     
     * 
     */
    Stage_OnRunning(_stageId = "1", _stageName = "第一关", _event = "tools", _itemName = "物品名字", _itemId = "110", _itemCount = 1, _itemdesc = "描述", _itemMoney = 100) {
     
        if(Platform.IsWeiChat())
        {
            StatAld.Instance().Stage_OnRunning(_stageId, _stageName, _event, _itemName, _itemId, _itemCount, _itemdesc, _itemMoney);
        }
    }

    /**
     * 关卡统计 关卡结束
     * @param {string} _stageId     关卡ID      该字段只能是 1 , 2 , 3 , 1.1 , 1.2 , 1.3 格式 最多支持 32 个字符 
     * @param {string} _stageName   关卡名字     最多支持 32 个字符 
     * @param {string} _event       事件类型     complete:成功 fail:失败 
     * @param {string} _stageDesc   原因描述     
     * 
     */
    Stage_OnEnd(_stageId = "1", _stageName = "第一关", _event = "complete", _stageDesc = "关卡完成") {

        if(Platform.IsWeiChat())
        {
            StatAld.Instance().Stage_OnEnd(_stageId, _stageName, _event, _stageDesc);
        }
    }


    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new Stat();
        }
        return this.m_Instance;
    }
}