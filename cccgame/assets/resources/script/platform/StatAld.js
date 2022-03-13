
import { Platform } from "./Platform";
import { BaseSav } from "../base/BaseSav";

/**
 * 阿拉丁统计 (微信小游戏使用)
 */
export class StatAld {

    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        console.log("TgSDKServer constructor");
    }

    /**
     * 自定义事件统计：游戏盒子 
     * @param {object} _appdata
     */
    EventGameBox(_appdata, _menuname = null) {

        console.log('EventGameBox:', _appdata);
        // var data_name = data.name_skip?data.name_skip:_appdata.name;
        // 统计所有游戏
        wx.aldSendEvent('自研盒子v201905-点击统计', {
            "自研游戏名称": BaseConfig.Global.Game_Name,
            "推广游戏名称": _appdata.name_skip ? _appdata.name_skip : _appdata.name,
            "位置统计": _menuname ? _menuname : _appdata.tjwz,
        });

        // 统计当前游戏
        wx.aldSendEvent('自研盒子v201905-游戏统计', {
            "贪吃蛇大激战": _appdata.name_skip ? _appdata.name_skip : _appdata.name,
            "贪吃蛇大激战_位置": _menuname ? _menuname + '_' + BaseConfig.Global.Game_Name : _appdata.tjwz + '_' + BaseConfig.Global.Game_Name,
        });
    }

    /**
     * 自定义事件统计：界面打点统计
     * @param {string} _menuname
     */
    EventMenu(_menuname) {
        // 统计所有游戏
        wx.aldSendEvent('界面统计', {
            "自研游戏名称": BaseConfig.Global.Game_Name,
            "界面名字": _menuname,
        });
    }

    /**
     * 自定义事件统计：皮肤打点
     * @param {string} _skinname
     */
    EventSkin(_skinname) {

       // 统计所有游戏
       wx.aldSendEvent('皮肤统计', {
        "自研游戏名称": BaseConfig.Global.Game_Name,
        "皮肤名字": _skinname,
        });
    
    }

    /**
     * 关卡统计 关卡开始
     * @param {string} _stageId     关卡ID      该字段只能是 1 , 2 , 3 , 1.1 , 1.2 , 1.3 格式 最多支持 32 个字符 
     * @param {string} _stageName   关卡名字     最多支持 32 个字符
     * 
     */
    Stage_OnStart(_stageId = "1", _stageName = "第一关") {
        console.log('Stage_OnStart _stageId:', _stageId, "_stageName:", _stageName);
        //关卡开始
        wx.aldStage.onStart({
            stageId: _stageId,     //关卡ID 该字段必传
            stageName: _stageName, //关卡名称  该字段必传
            userId: BaseSav.Instance().GetUUID //用户ID 可选
        })
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
        console.log('Stage_OnRunning _stageId:', _stageId, "_stageName:", _stageName);
        //关卡中
        wx.aldStage.onRunning({
            stageId: _stageId,
            stageName: _stageName,
            userId: BaseSav.Instance().GetUUID,
            event: _event,
            params: {
                itemName: _itemName,
                itemId: _itemId,
                itemCount: _itemCount,
                desc: _itemdesc,
                itemMoney: _itemMoney,

            }
        })
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
        console.log('Stage_OnEnd _stageId:', _stageId, "_stageName:", _stageName);
        //关卡完成
        wx.aldStage.onEnd({
            stageId: _stageId,    //关卡ID 该字段必传
            stageName: _stageName, //关卡名称  该字段必传
            userId: BaseSav.Instance().GetUUID,  //用户ID 可选
            event: _event,   //关卡完成  关卡进行中，用户触发的操作    该字段必传
            params: {
                desc: _stageDesc   //描述
            }
        })
    }

    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new StatAld();
        }
        return this.m_Instance;
    }
}
