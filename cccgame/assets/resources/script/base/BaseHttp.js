import { WeChat } from "../platform/WeiChat";
import { Platform } from "../platform/Platform";



/**
 * http 联网函数封装
 * 
 * 
 * 使用方法举例： 
    let http = new BaseHttp();
    
    http.AddParam("pid", "10006");
    http.AddParam("game_id", 'xxxx');
    http.AddParam("uid", 'zhangsan');
    let url = "http://xxxxx.com/10006.php";

    http.m_method = 'POST';
    http.Request(url, (data) => {
        console.log(data)
    }, (err) => {
        console.error(err)
    })
 */
export class BaseHttp {

    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        this.m_data = new Map();        // 请求的参数数据
        this.m_method = "POST";           // 请求类型， 默认为 POST ，可以手动设置成 GET 方式请求
    }

    /**
     * 增加一个提交参数
     * @param {string} _key 
     * @param {string} _value 
     */
    AddParam(_key, _value) {
        this.m_data.set(_key, _value);
    }

    /**
     * 发送一个请求
     * @param {string} _url  设置请求响应的URL, 例如： http://xxxx/xxx.php
     * 
     * @param {function} _cbSuccess 请求成功回调函数，函数格式：success(data)
     * @param {function} _cbFail 请求失败回调函数 ,函数格式： fail(_info)
     *      
     * @param {number} _retry 超时重连次数(超时默认3次重连机制)
     * @param {number} _timeout 超时时间,单位：毫秒 （超时重连机制，优化网络异常情况出现）
     */
    Request(_url, _cbSuccess, _cbFail, _retry = 3, _timeout = 1000) {

        // 发送请求数据转换为字符串， 格式：pid=10003&appid=cycckhlb&appChannel=weixin
        let postData = "";
        this.m_data.forEach(function (value, key, mapObj) {
            if (postData != "") {
                postData += '&&';
            }
            postData += (key + '=' + value);
        });

        //微信平台直接调用微信的网络请求接口
        if (Platform.IsWeiChat())
        {
            WeChat.Instance().HttpRequest(_url, postData, _cbSuccess, _cbFail, this.m_method, _retry, _timeout);
            return;
        }

        let xmlHttp = new XMLHttpRequest();         // 网络访问句柄  
        xmlHttp.timeout = _timeout; // 超时时间，单位是毫秒

        // 设置处理响应的回调函数
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status < 400)) {
                if (_cbSuccess) {
                    _cbSuccess(JSON.parse(xmlHttp.responseText));  // 返回请求结果
                    return;
                }
            }
        };

        xmlHttp.ontimeout = () => {
            console.error('BaesHttp.Request Timeout!!');
            _retry--;
            if (_retry <= 0) {
                if (_cbFail) {
                    _cbFail("请求超时次数已达上限");
                }
            }
            else {
                console.log("BaesHttp.Request fail", this);
                this.Request(_url, _cbSuccess, _cbFail, _retry, _timeout);
            }
        };

        // console.log("BaesHttp.Request postData="+postData);
        if ("GET" == this.m_method) {

            xmlHttp.open("GET", _url + "?" + postData, true);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttp.send();
        }
        else if ("DELETE" == this.m_method) {
            xmlHttp.open("DELETE", _url, true);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlHttp.send(postData);
        }
        else {
            xmlHttp.open("POST", _url, true);  // 设置以POST方式发送请求，并打开连接
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // xmlHttp.send("pid=10003&appid=cycckhlb&appChannel=weixin");
            xmlHttp.send(postData);
        }
    }

}