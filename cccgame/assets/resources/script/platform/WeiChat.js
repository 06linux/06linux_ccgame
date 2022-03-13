/**
 * 微信平台接口函数
 * 微信小游戏
 */
export class WeChat {
    
    //使用严格模式
    'use strict'

    /**
     * 初始化
     */
    constructor() {
        console.log("WeChat constructor");
    }

    /**
     * 微信游戏打开的时候传递的路径参数
     */
    static OnShowQuery = {};

    /**
     * 监听微信的显示函数
     */
    OnShow() {

        wx.onShow(function (res) {
            //配置详情页
            console.log(" wx.onShow res", res);
            WeChat.OnShowQuery = res.query;
        }); 

    }

    /**
     * 监听微信的隐藏函数
     */
    OnHide() {

        wx.onHide((res) => {
            console.log('weixin onhide res', res);
        })

    }

    /**
     * 获取设备信息同步接口
     */
    GetSystemInfoSync() {
        return wx.getSystemInfoSync();
    }

    /**
     * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
     */
    GetMenuButtonBoundingClientRect() {
        return wx.getMenuButtonBoundingClientRect();
    }

    /**
     * 加载分包
     */
    LoadSubpackage(_subPackageName, _callFun) {
        //加载子包
        cc.loader.downloader.loadSubpackage(_subPackageName, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('load subpackage successfully.');
            _callFun(err);
        });
    }

    /**
     * 在用户授权的情况下获取用户信息
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    GetUserInfo(_onSuccess, _onFail) {

        wx.getUserInfo({
            success: (res) => {
                _onSuccess(res.userInfo);
            },
            fail: (err) => {
                _onFail(err);
            }
        })
    }

    /**
     * 请求授权接口
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    Authorize(_onSuccess, _onFail) {
        // 可以通过 qq.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
        wx.getSetting({
            success: (res) => {
                // console.log("qq.getSetting success res.authSetting", res.authSetting);
                if (res.authSetting['scope.userInfo']) {
                    _onSuccess();
                }
                else {
                    _onFail();
                }
            },
            fail: (err) => {
                _onFail(err);
            }
        })
    }

    /**
     * 创建授权按钮
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    CreateUserInfoButton(_onSuccess, _onFail) {

        cc.loader.loadRes("data/img_authorize/game_btn_authorize.png", (err, texture) => {
            if (err) {
                _onFail("授权按钮创建失败");
                return;
            }
            //设计宽
            let viewwidth = cc.visibleRect.width;
            //设计高
            let viewheight = cc.visibleRect.height;
            //实际视图
            var size = cc.view.getFrameSize();

            let width = texture.width / (viewwidth / cc.view.getFrameSize().width)
            let height = texture.height / (viewheight / cc.view.getFrameSize().height)

            let button = wx.createUserInfoButton({
                type: 'image',
                image: texture.url,
                style: {
                    left: cc.view.getFrameSize().width / 2 - width / 2,
                    top: cc.view.getFrameSize().height / 2,
                    width: width,
                    height: height,
                }
            })

            button.show();
            button.onTap((res) => {
                console.log(res)
                button.destroy();
                if (res.userInfo) {
                    _onSuccess(res.userInfo);
                } else {
                    _onFail("拒绝授权");
                }
            })
        });
    }

    /**
     * 微信分享转发监听
     */
    InitWxShare() {

        //显示当前转发按钮
        wx.showShareMenu({
            withShareTicket: true,
            success: function () {
                // console.log("wei xin showShareMenu success....");
            },
            fail: function () {
                // console.log("wei xin showShareMenu fail....");
            },
            complete: function () {
                // console.log("wei xin showShareMenu complete....");
            }
        });

        //被动转发的设置
        wx.onShareAppMessage(() => ({
            title: BaseConfig.ShareTextData.ShareText2,
            imageUrl: BaseConfig.Global.NetRoot + BaseConfig.Global.NetRes + 'wx_share/' + BaseConfig.ShareImgData.ShareImg1 // 图片 URL
        }))
    }

    /**
     * 分享 
     * @param {string} _title
     * @param {string} _imageUrl
     * 
     */
    ShareAppMessage(_title, _imageUrl) {

        wx.shareAppMessage({
            title: _title,
            // imageUrlId: '转发标题',
            imageUrl: _imageUrl // 图片 URL
        })

    }

    /**
     *  截图功能
     * 
     *  @param {number} x 	 	0 	否 	截取 canvas 的左上角横坐标
     *  @param {number} y 	 	0 	否 	截取 canvas 的左上角纵坐标
     *  @param {number} width 	 	canvas 的宽度 	否 	截取 canvas 的宽度
     *  @param {number} height 	 	canvas 的高度 	否 	截取 canvas 的高度
     *  @param {number} destWidth 	canvas 的宽度 	否 	目标文件的宽度，会将截取的部分拉伸或压缩至该数值
     *  @param {number} destHeight  canvas 的高度 	否 	目标文件的高度，会将截取的部分拉伸或压缩至该数值
     *  @param {string} fileType 	png 	否 	目标文件的类型
     *  @param {number} quality 	1.0 	否 	jpg图片的质量，仅当 fileType 为 jpg 时有效。取值范围为 0.0（最低）- 1.0（最高），不含 0。不在范围内时当作 1.0
     */
    RenderTexture(_x = 0, _y = 0, _width = 200, _height = 150, _destWidth = 500, _destHeight = 400, _fileType = "png", _quality = 1.0) {
        // console.log("_x", _x, "_y", _y, "_width", _width, "_height", _height, "_destWidth", _destWidth, "_destHeight", _destHeight);
        const tempFilePath = canvas.toTempFilePathSync({
            x: _x,
            y: _y,
            width: _width,
            height: _height,
            destWidth: _destWidth,
            destHeight: _destHeight,
            fileType: _fileType,
            quality: _quality,
        })
        return tempFilePath;
    }

    /**
     * 加快触发 JavaScriptCore 垃圾回收（Garbage Collection）
     * GC 时机是由 JavaScriptCore 来控制的，并不能保证调用后马上触发 GC。
     * wx.triggerGC()
     */
    TriggerGC() {
        wx.triggerGC()
    }

    /**
     * 向子域发送消息
     * @param {BaseConfig.OpenDataMessageData} _messagedata
     */
    OpenDataContextPostMessage(_messagedata) {
        wx.getOpenDataContext().postMessage(_messagedata);
    }

    /**
     * 对用户托管数据进行写数据操作。允许同时写多组 KV 数据
     * @param {JSON} _kvDataList
     */
    UploadUserCloudData(_kvDataList) {

        let userdata = {
            KVDataList: _kvDataList,
            success: function (res) {
                console.log("success：res", res);
            },
            fail: function (res) {
                console.log("fail：res", res);
            },
            complete: function (res) {
                console.log("complete：res", res);
            },
        }

        wx.setUserCloudStorage(userdata);
    }

    /**
     * 创建一个banner广告
     * @param {string} _adUnitId
     * @param {number} _left
     * @param {number} _top
     * @param {number} _width
     * @param {number} _height
     * 
     * 
     */
    CreateBannerAd(_adUnitId, _left, _top, _width, _height) {

        if (this.m_BannerADUnitId == _adUnitId) {
            return;
        }

        this.m_BannerADUnitId = _adUnitId;

        if (this.m_BannerAD) {
            this.m_BannerAD.destroy();
        }

        this.m_BannerAD = wx.createBannerAd({
            adUnitId: _adUnitId,
            style: {
                left: _left,
                top: _top,
                width: _width,
                height: _height
            }
        })

        this.m_BannerAD.onLoad(() => {
            console.log('banner 广告加载成功');
        })

        this.m_BannerAD.onError((err) => {
            console.log(err);
        });

        this.m_BannerAD.onResize((res) => {
            // BaseConfig.Global.BannerHeight = res.height;
            // Uitls.ZjKjServer.ResizeTgBar();
            // console.log("WeChat.Instance().GetSystemInfoSync().screenHeight - res.height", WeChat.Instance().GetSystemInfoSync().screenHeight, "res.height", res.height)

            // this.m_BannerAD.style.width = res.width;
            // this.m_BannerAD.style.height = res.height;
            this.m_BannerWidth = res.width;
            this.m_BannerHeight = res.height;

            this.m_BannerAD.style.top = this.GetSystemInfoSync().screenHeight - res.height;

            // console.log(res.width, res.height)
            // console.log(this.m_BannerAD.style.realWidth, this.m_BannerAD.style.realHeight)
        })
    }

    /**
     * 显示广告
     * 
     */
    ShowBannerAd() {

        if (this.m_BannerAD) {
            this.m_BannerAD.show().catch(err => console.log(err))
        }
    }

    /**
     * 隐藏广告
     * 
     */
    HideBannerAd() {
        if (this.m_BannerAD) {
            this.m_BannerAD.hide().catch(err => console.log(err))
        }
    }

    /**
     * 创建视频广告
     * @param {string} _adUnitId
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    CreateRewardedVideoAd(_adUnitId, _onSuccess, _onFail) {

        if (this.m_RewardedVideoAdUnitId == _adUnitId) {
            return;
        }

        if (this.m_RewardedVideoAd) {
            this.m_RewardedVideoAd.destroy();
        }

        this.m_RewardedVideoAdUnitId = _adUnitId;
        this.m_RewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: _adUnitId
        })

        this.m_RewardedVideoAd.onLoad(() => {
            console.log('激励视频 广告加载成功');
            _onSuccess();
        })

        this.m_RewardedVideoAd.onError(err => {
            console.log("m_RewardedVideoAd onError", err);
            _onFail(err);
            //没有适合的广告
            // if (err.errCode == 1004) {
            // }
        })
    }

    /**
     * 显示视频广告
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    ShowRewardedVideoAd(_onSuccess, _onFail) {

        if (!this.m_RewardedVideoAd) {
            _onFail("this.m_RewardedVideoAd is null");
            return;
        }

        //广告显示
        this.m_RewardedVideoAd.show().then(() => {
            // console.log("m_RewardedVideoAd.show()",res)
        }).catch(err => {
            console.log("m_RewardedVideoAd.show()", err);
            this.m_RewardedVideoAd.load().then(() => this.m_RewardedVideoAd.show())
                .catch(err => {
                    _onFail(err);
                    console.log('激励视频 广告显示失败')
                })
        })

        if (this.onCloseCallFun) {
            console.log("注销 监听")
            this.m_RewardedVideoAd.offClose(this.onCloseCallFun);
        }
        //广告关闭监听
        this.m_RewardedVideoAd.onClose(this.onCloseCallFun = res => {

            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                _onSuccess();
            } else {
                // 播放中途退出，不下发游戏奖励
                _onFail();
            }
        })
    }

    /**
     * 创建插屏广告
     * @param {string} _adUnitId
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    CreateInterstitialAd(_adUnitId, _onSuccess, _onFail) {

        if (this.m_InterstitialAdUnitId == _adUnitId) {
            return;
        }

        if (this.m_InterstitialAd) {
            this.m_InterstitialAd.destroy();
        }

        this.m_InterstitialAdUnitId = _adUnitId;
        this.m_InterstitialAd = wx.createInterstitialAd({
            adUnitId: _adUnitId
        })

        this.m_InterstitialAd.onLoad(() => {
            console.log('插屏 广告加载成功');
            _onSuccess();
        })

        this.m_InterstitialAd.onError(err => {
            console.log("m_InterstitialAd onError", err);
            _onFail(err);
            //没有适合的广告
            // if (err.errCode == 1004) {
            // }
        })
    }

    /**
     * 显示插屏广告
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    ShowInterstitialAd(_onSuccess, _onFail) {

        if (!this.m_InterstitialAd) {
            _onFail("this.m_InterstitialAd is null");
            return;
        }

        //广告显示
        this.m_InterstitialAd.show().then(() => {
            // console.log("m_RewardedVideoAd.show()",res)
        }).catch(err => {
            console.log("m_RewardedVideoAd.show()", err);
            this.m_InterstitialAd.load().then(() => this.m_InterstitialAd.show())
                .catch(err => {
                    _onFail(err);
                    console.log('插屏 广告显示失败')
                })
        })

        if (this.onInterstitiaCloseCallFun) {
            console.log("注销 监听")
            this.m_InterstitialAd.offClose(this.onInterstitiaCloseCallFun);
        }
        //广告关闭监听
        this.m_InterstitialAd.onClose(this.onInterstitiaCloseCallFun = res => {

            console.log('插屏 广告关闭');
            _onSuccess();
        })
    }

    /**
     * 分享 
     * @param {string} _imageUrl
     */
    PreviewImage(_imageUrl) {

        return new Promise((resolve, reject) => {
            wx.previewImage({
                urls: [_imageUrl],
                success: () => {
                    console.log("wei xin previewImage success....");
                    resolve("success");
                },
                fail: () => {
                    reject("fail");
                }
            })
        })

    }

    /**
     * 跳转到其他小游戏
     * 小游戏的appid一定要在game.json 的配置列表里
     * @param {string} _appid
     * @param {string} _path
     * @param {string} _extData
     * @param {string} _envVersion
     * @param {function} _onSuccess    成功返回函数
     * @param {function} _onFail       失败返回函数
     */
    JumpToMiniProgram(_appid, _path, _extData = "", _envVersion = 'release', _onSuccess = null, _onFail = null) {
        wx.navigateToMiniProgram(
            {
                appId: _appid,
                path: _path,
                extraData: _extData,
                envVersion: _envVersion,
                success: (data) => {
                    console.log("navigateToMiniProgram success", data);
                    if (_onSuccess) {
                        _onSuccess();
                    }
                },
                fail: (err) => {
                    console.log("navigateToMiniProgram fail", err);

                    if (_onFail) {
                        _onFail();
                    }
                }
            }
        );
    }

    /**
     * 发送一个请求
     * @param {string} _url  设置请求响应的URL, 例如： http://xxxx/xxx.php
     * @param {string} _data  发送请求数据转换为字符串， 格式：pid=10003&appid=cycckhlb&appChannel=weixin
     * 
     * @param {function} _cbSuccess 请求成功回调函数，函数格式：success(data)
     * @param {function} _cbFail 请求失败回调函数 ,函数格式： fail(_info)
     * 
     * @param {string} _mothed 请求方式， 'GET', 'POST'
     * @param {number} _retry 超时重连次数
     * @param {number} _timeout 超时时间设置 (超时时间在微信配置文件里面设置，此处无效)
     * 
     */
     HttpRequest(_url, _data, _cbSuccess, _cbFail, _mothed = 'GET', _retry = 3, _timeout = 1000 ) {

        if ("GET" == this.m_type) {
            wx.request({
                url: _url,
                data: _data,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: "GET",
                success: (res) => {
                    // console.log("HttpRequest success", res);
                    if (_cbSuccess) {
                        _cbSuccess(res.data);
                    }
                },
                fail: (err) => {
                    console.log("HttpRequest fail", err);
                    if (err.errMsg.search(/timeout/g)) {
                        _retry--;
                        console.log("超时次数", _retry);
                        if (_retry <= 0) {
                            if (_cbFail) {
                                _cbFail("请求超时次数已达上限");
                            }
                        }
                        else {
                            this.HttpRequest(_url, _data, _cbSuccess, _cbFail, _mothed, _retry, _timeout);
                        }
                    }
                    else {
                        if (_cbFail) {
                            _cbFail(err);
                        }
                    }
                },
                complete: (data) => {
                    // console.log("HttpRequest complete", data);
                }
            })
        }
        else {
            wx.request({
                url: _url, //仅为示例，并非真实的接口地址
                data: _data,
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded' // 默认值
                },
                method: "POST",
                success: (res) => {
                    // console.log("HttpRequest success", res);
                    if (_cbSuccess) {
                        _cbSuccess(res.data);
                    }
                },
                fail: (err) => {
                    console.log("HttpRequest fail", err);
                    if (err.errMsg.search(/timeout/g)) {
                        _retry--;
                        console.log("超时次数", _retry);
                        if (_retry <= 0) {
                            if (_cbFail) {
                                _cbFail("请求超时次数已达上限");
                            }
                        }
                        else {
                            console.log("HttpRequest fail", this);
                            this.HttpRequest(_url, _data, _cbSuccess, _cbFail, _mothed, _retry, _timeout);
                        }
                    }
                    else {
                        if (_cbFail) {
                            _cbFail(err);
                        }
                    }
                },
                complete: (data) => {
                    console.log("HttpRequest complete", data);
                }
            })
        }
    }

    /**
     * 读取存档
     * @param {string} _savName 存档名称
     * @returns 存档记录（string 格式）
     */
    Read(_savName){
        return wx.getStorageSync(_savName);
    }

    /**
     * 写存档
     * @param {string} _savName 存档名称
     * @param {string} _str 存档的内容
     */
    Write(_savName, _str){
        try {
            wx.setStorageSync(_savName, _str)
        } catch (e) {
            console.log("WeiCha.Write, wx.setStorageSync", e);
        }
    }

    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new WeChat();
        }
        return this.m_Instance;
    }
}