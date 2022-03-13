/**
 * 配置类
 * 各种全局配置参数
 */
export class BaseConfig {

    static IsLoading = false;
    static Debug = false;

    /**
     * 全局配置参数
     */
    static Global = {

        NetRoot: "https://cathome8.com",
        NetRes: "/zjkj_h5/demo/res_1001",

        BoxMenuNetRes: "/zjkj_boxmenu/",
        BoxMenuVersion: "zy_game_ml/res_tcsdjz_1002/",

        Game_Is_Review: true,       //审核开关

        Game_Bind_App_List: [],        //绑定游戏列表（微信小游戏用到）
        Game_Query: {},
        Game_Name: "贪吃蛇大激战222",
    }

    /**
    * 微信 平台信息
    */
    static WeChatGlobal = {
        WxAppId: "wx4f585094799e2ce4",  //
        WxAppType: "zy",

        BannerAdUnitId: "adunit-5b75f5566c6d3990",           //baner 广告id adunit-
        RewardedVideoAdUnitId: "adunit-5b75f5566c6d3990",    //视频激励广告id adunit-
        InterstitialAdUnitId: "adunit-a3c388a689286227",     //插屏广告id  adunit-
        // interstitialAd
    }

    /**
     * wx分包名字
     */
    static WxSubPackageName = 'subpackage';

  
    /**
     * 分享语
     */
    static ShareTextData = {
        ShareText1: "震惊，世界上最长的蛇竟然是…",
        ShareText2: "贪吃蛇经典玩法升级，不来看看？",
        ShareText3: "开局一条鲲，变长全靠吞…",
        ShareText4: "我就是我，是颜色不一样的大蛇！",
        ShareText5: "不想当女娲的贪吃蛇不是好蛇蛇！",
    }

    /**
     * 分享图片
     * 
     */
    static ShareImgData = {
        ShareImg1: "wx_share_img_1.png",
        ShareImg2: "wx_share_img_2.png",
        ShareImg3: "wx_share_img_3.png",

    }
    
   
   

    /**------------------------------------------------------------------------------------------------------------- 
     ****************************************开放域数据*************************************************************
    ----------------------------------------------------------------------------------------------------------------/
    
    /**
     * 向开放域发送的消息类型
     * 需要在开放域里处理对应逻辑
     */
    static OpenDataMessageType = {
        GetCloudStorage: 'getcloudstorage',
        ShowEndlessRank: 'showendlessrank',
        ShowLimitTimeRank: 'showLimittimerank',
        ShowGoodTimeRank: 'showgoodtimerank',

    }

    /**
     * 向开放域发送的消息数据格式
     * 需要在开放域里读取对应数据
     */
    static OpenDataMessageData = {
        MessageType: '',
        KVDataList: [],
        Data: '',
        DataKey: '',
    }

    /**
     * 限时模式数据key值
     */
    static LimitTimeCloudDataKey = 'limittimedata';

    /**
     * 无尽模式数据key值
     */
    static EndlessCloudDataKey = 'endlessdata';

    /**
     * 娱乐模式数据key值
     */
    static GoodTimeCloudDataKey = 'goodtimedata';

    /**
     * 上传微信的数据格式
     * UUID 用户唯一id
     * Score 用户分数
     * UpdateTime 更新时间
     * 
     */
    static CloudData = {
        UUID: '',
        Score: 0,
        UpdateTime: 0,
    }

}
