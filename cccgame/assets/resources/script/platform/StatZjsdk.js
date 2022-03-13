import { BaseHttp } from "../base/BaseHttp";
import { BaseUtil } from "../base/BaseUtil";
import { BaseConfig } from "../base/BaseConfig";


/**
 * ZJKJ 统计接口
 */
export class StatZjsdk {

    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        // console.log("StatZjsdk constructor");

        // 请求地址格式： 'https://xxxx.com/zjserver/tgsdk/tgsdk/protocol/1000x.php'
        this.m_url = BaseConfig.Global.NetRoot + '/zjserver/tgsdk/tgsdk/protocol/'
    }

    /**
     * 新增用户统计
     * @param {string} _game_id  游戏id ，由服务器后台管理员分配
     * @param {string} _tg_code  推广码，服务器后台管理员分配
     * @param {string} _uid  用户uuid ，由客户端自己生成，上传到服务器，作为用户的唯一标识
     * 
     */
    NewUser(_game_id, _tg_code, _uid) {

        if (BaseUtil.IsNull(_game_id)) {
            console.log("Error, StatZjsdk.NewUser _game_id is null");
            return;
        }

        if (BaseUtil.IsNull(_tg_code)) {
            console.log("Error, StatZjsdk.NewUser _tg_code is null");
            return;
        }

        if (BaseUtil.IsNull(_uid)) {
            console.log("Error, StatZjsdk.NewUser _uid is null");
            return;
        }

        let http = new BaseHttp();
        http.AddParam("pid", "10006");
        http.AddParam("game_id", _game_id);
        http.AddParam("tg_code", _tg_code);
        http.AddParam("uid", _uid);

        http.SendRequest(this.m_url + "10006.php", (data) => {
            console.log(data)
        }, (err) => {
            console.error(err)
        })
    }

    /**
     * 授权用户统计
     * @param {string} _game_id  游戏id ，由服务器后台管理员分配
     * @param {string} _tg_code  推广码，服务器后台管理员分配
     * @param {string} _uid  用户uuid ，由客户端自己生成，上传到服务器，作为用户的唯一标识
     * 
     */
    AuthUser(_game_id, _tg_code, _uid) {

        if (BaseUtil.IsNull(_game_id)) {
            console.log("Error, StatZjsdk.AuthUser _game_id is null");
            return;
        }

        if (BaseUtil.IsNull(_tg_code)) {
            console.log("Error, StatZjsdk.AuthUser _tg_code is null");
            return;
        }

        if (BaseUtil.IsNull(_uid)) {
            console.log("Error, StatZjsdk.AuthUser _uid is null");
            return;
        }

        let http = new BaseHttp();
        http.AddParam("pid", "10007");
        http.AddParam("game_id", _game_id);
        http.AddParam("tg_code", _tg_code);
        http.AddParam("uid", _uid);

        http.SendRequest(this.m_url + "10006.php", (data) => {
            console.log(data)
        }, (err) => {
            console.error(err)
        })
    }

    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new StatZjsdk();
        }
        return this.m_Instance;
    }
}