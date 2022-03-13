import { BaseConfig } from "./BaseConfig";
import { BaseHttp } from "./BaseHttp";

 /**
 * 本地的配置文件列表
 * 备注：本地资源文件不需要文件后缀名称
 */
export var BaseJson_List = {
    Test1: "test1",
    Test2: "test2",
}


// 本地件存放的路径
export const BaseJson_LocalPath = '/data/json/'

// 网络存放路径
export const BaseJson_NetPath = BaseConfig.Global.NetRoot + BaseConfig.Global.NetRes + '/json/'


/**
 *  配置表格加载封装
 *  备注：所有的数据表配置统一使用 json 格式
 */
export class BaseJson {

    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        // console.log("BaseJson constructor");
        this.m_JsonData = new Map();
    }

    /**
     * 加载json文件
     * @param {Function} _callFun 回调函数 _callFun(res)
     * @param {string} _name  json 文件名称
     * @param {string} _path  文件路径
     * 
     * 使用举例：
     * BaseJson.Instance().Load(BaseJson_List.Test1,(res)=>{
                console.log('load json', res);
            });
     */
    Load(_name, _callFun, _path=BaseJson_LocalPath) {
        // 加载本地资源
        cc.loader.loadRes(_path + _name, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            this.m_JsonData.set(_name, res.json);

            if (_callFun) {
                _callFun(res.json);
            }
        });
    }

    /**
     * 加载json文件
     * @param {Function} _callFun 回调函数 _callFun()
     * @param {Array} _nameArr  json 文件名称
     * @param {string} _path  文件路径
     * 
     * 使用说明：
     * BaseJson.Instance().LoadMore(['test1','test2'],()=>{
                console.log('load more succ..');
                }
            );
     */
    LoadMore(_nameArr, _callFun, _path=BaseJson_LocalPath) {

        let fileCount = _nameArr.length;
        let loadSucc = 0;

        for(let i=0; i< fileCount; i++){

            this.Load(_nameArr[i], (res)=>{

                loadSucc += 1;
                // 所有文件都加载成功
                if(fileCount == loadSucc)
                {
                    _callFun();
                }

            },
            _path);
        }
    }


    /**
     * 加载json文件 （网络文件）
     * @param {Function} _callFun 回调函数 _callFun(res)
     * @param {string} _name  json 文件名称
     * @param {string} _path  文件路径
     * 
     * 使用说明：
     * BaseJson.Instance().LoadNet('test1001.json', (res)=>{
                console.log('LoadNet succ..',res);
            });
     */
    LoadNet(_name, _callFun, _path=BaseJson_NetPath) {

        let http = new BaseHttp();
        let url = _path + _name;
        http.m_method = 'GET';
        http.Request(url, (data) => {
            // console.log(data)
            this.m_JsonData.set(_name, data);
            _callFun(data);
            
        }, (err) => {
            console.error(err)
        })
    }

    /**
     * 加载json文件
     * @param {Function} _callFun 回调函数 _callFun()
     * @param {Array} _nameArr  json 文件名称
     * @param {string} _path  文件路径
     * 
     * BaseJson.Instance().LoadNetMore(['test1001.json','test1002.json'],()=>{
                console.log('load more succ..');
                }
            );
     */
    LoadNetMore(_nameArr, _callFun, _path=BaseJson_NetPath) {

        let fileCount = _nameArr.length;
        let loadSucc = 0;

        for(let i=0; i< fileCount; i++){

            this.LoadNet(_nameArr[i], (res)=>{

                loadSucc += 1;
                // 所有文件都加载成功
                if(fileCount == loadSucc)
                {
                    _callFun();
                }

            },
            _path);
        }
    }

    /**
     * 得到一个配置数据 (必须先加载成功才可以获取到)
     * @param {string} _name 
     */
    Get(_name){
        return this.m_JsonData.get(_name);
    }

    /**
     * 打印所有一件加载的文件
     */
    DebugPrint(){
        console.log('----------------------------------');
        console.log('BaseJson.DebugPrint:');
        this.m_JsonData.forEach((value,key) => {
            console.log(key,':', value);
        });
    }

   
    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new BaseJson();
        }
        return this.m_Instance;
    }
}
