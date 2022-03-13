
/**
 * ui 适配 
 *  
 * 1.微信的适配规则
 *   需要获取到胶囊位置，需要获取屏幕留海的高度，获取banner高度
 * 
 * 注意：
 *      横屏适配模式 fitheight 
 *      竖屏适配模式 fitwidth
 *      规避刘海条件
 * 
 * 胶囊体位置
 *   
 */

cc.Class({
    // extends: cc.Widget,
    extends: cc.Component,

    properties: {

        // isLeft:false,
        // Left: {
        //     default: 0,
        //     type: cc.Float,
        //     tooltip: "左边"
        // },

        // isRight:false,
        // Right: {
        //     default: 0,
        //     type: cc.Float,
        //     tooltip: "右边"
        // },

        // isTop:false,
        // Top: {
        //     default: 0,
        //     type: cc.Float,
        //     tooltip: "右边"
        // },

        // isBottom:false,
        // Bottom: {
        //     default: 0,
        //     type: cc.Float,
        //     tooltip: "右边"
        // },
        // isCapsule: {
        //     default: false,
        //     // type: cc.Boolean,
        //     tooltip: "是否以胶囊体为对齐目标"
        // },

        isCapsuleLeft: false,
        CapsuleLeft: {
            default: 0,
            type: cc.Float,
            tooltip: "胶囊左边"
        },

        isCapsuleRight: false,
        CapsuleRight: {
            default: 0,
            type: cc.Float,
            tooltip: "胶囊右边"
        },

        isCapsuleTop: false,
        CapsuleTop: {
            default: 0,
            type: cc.Float,
            tooltip: "胶囊上边"
        },

        isCapsuleBottom: false,
        CapsuleBottom: {
            default: 0,
            type: cc.Float,
            tooltip: "胶囊底边"
        },

        isLiuhai: {
            default: false,
            // type: cc.Boolean,
            tooltip: "是否受刘海影响"
        },

        _m_Widget: null,
        _m_OldTop: 0,
        _m_OldBottom: 0,
        _m_OldLeft: 0,
        _m_OldRight: 0,

        _m_Canvas: null,

        _m_Systeminfo: null,

        _m_Capsuledata: null,

        _m_DesignresolutionSize: null,

        _m_VisibleSize: null,
        _m_FramSize: null,

    },

    onLoad() {
        // console.log('UiAdapter onLoad')
    },

    start() {
        // console.log('UiAdapter start')
        //缩放模式
        this._m_Canvas = cc.find('Canvas').getComponent(cc.Canvas);
        //系统信息
        this._m_Systeminfo = BasePlatform.Instance().GetSystemInfo();
        //胶囊体
        this._m_Capsuledata = BasePlatform.Instance().GetCapsuleData();
        //屏幕设计分辨率
        this._m_DesignresolutionSize = cc.view.getDesignResolutionSize();
        //实际分辨率
        this._m_VisibleSize = cc.view.getVisibleSize();
        //dom元素的大小
        this._m_FramSize = cc.view.getFrameSize();

        //如果不是刘海屏则将依赖刘海屏的选项取消
        if (!this.GetSystemLiuHai()) {
            this.isLiuhai = false;
        }

        // console.log('Capsuledata', this._m_Capsuledata);

        this._m_Widget = this.node.getComponent(cc.Widget);
        this._m_OldTop = this._m_Widget.top;
        this._m_OldBottom = this._m_Widget.bottom;
        this._m_OldLeft = this._m_Widget.left;
        this._m_OldRight = this._m_Widget.right;
        // cc.director.on('UiAdapter', () => {
        //     this.RestPosition();
        // })
        this.RestPosition();
    },

    /**
     * 从新适配位置
     */
    RestPosition() {
        // console.log('UiAdapter RestPositio');
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            //获取banner宽高
            let bannersize = BasePlatform.Instance().GetBannerSize();
            if (!this._m_Widget) {
                console.log('WidgetComponent is null');
                return;
            }

            //top参数调整
            if (this._m_Widget.isAlignTop) {
                // WidgetComponent.bottom
                let adaptertop = this._m_OldTop - (this._m_VisibleSize.height - this._m_DesignresolutionSize.height) / 2;
                //是否躲避刘海 同时机型是否有刘海
                if (this.isLiuhai) {
                    adaptertop = this._m_Systeminfo.statusBarHeight * (this._m_DesignresolutionSize.height / this._m_FramSize.height) + adaptertop;
                }
                //以胶囊体为目标
                if (this.isCapsuleTop) {
                    adaptertop = (this._m_Capsuledata.top + this._m_Capsuledata.height / 2) * (this._m_DesignresolutionSize.height / this._m_FramSize.height) + this.CapsuleTop;
                }
                this._m_Widget.top = adaptertop;
            }

            if (this._m_Widget.isAlignBottom) {
                // WidgetComponent.bottom
                let adapterbottom = this._m_OldBottom - (this._m_VisibleSize.height - this._m_DesignresolutionSize.height) / 2;
                //是否躲避刘海 同时机型是否有刘海
                if (this.isLiuhai) {
                    adapterbottom = this._m_Systeminfo.statusBarHeight * (this._m_DesignresolutionSize.height / this._m_FramSize.height) + adapterbottom;
                }

                //以胶囊体为目标
                if (this.isCapsuleBottom) {
                    adapterbottom = (this._m_FramSize.height - this._m_Capsuledata.top - this._m_Capsuledata.height / 2) * (this._m_DesignresolutionSize.height / this._m_FramSize.height) + this.CapsuleBottom;
                }
                this._m_Widget.bottom = adapterbottom;
            }

            if (this._m_Widget.isAlignLeft) {
                // WidgetComponent.left
                //横屏
                let adapterleft = this._m_OldLeft - (this._m_VisibleSize.width - this._m_DesignresolutionSize.width) / 2;
                //是否躲避刘海 同时机型是否有刘海
                if (this.isLiuhai) {
                    adapterleft = this._m_Systeminfo.statusBarHeight * (this._m_DesignresolutionSize.width / this._m_FramSize.width) + adapterleft;
                }

                //以胶囊体为目标
                if (this.isCapsuleLeft) {
                    adapterleft = (this._m_Capsuledata.left + this._m_Capsuledata.width / 2) * (this._m_DesignresolutionSize.width / this._m_FramSize.width) + this.CapsuleLeft;
                    // console.log('adapterleft', adapterleft);
                }
                this._m_Widget.left = adapterleft;
            }

            if (this._m_Widget.isAlignRight) {
                // WidgetComponent.right
                //横屏
                let adapterright = this._m_OldRight - (this._m_VisibleSize.width - this._m_DesignresolutionSize.width) / 2;
                //是否躲避刘海 同时机型是否有刘海
                if (this.isLiuhai) {
                    adapterright = this._m_Systeminfo.statusBarHeight * (this._m_DesignresolutionSize.width / this._m_FramSize.width) + adapterright;
                }
                //以胶囊体为目标
                if (this.isCapsuleRight) {
                    adapterright = (this._m_FramSize.width - this._m_Capsuledata.left - this._m_Capsuledata.width / 2) * (this._m_DesignresolutionSize.width / this._m_FramSize.width) + this.CapsuleRight;
                    // console.log('adapterright', adapterright);
                }
                this._m_Widget.right = adapterright;
            }

            //立刻执行 widget 对齐操作。
            this._m_Widget.updateAlignment();
        }

    },

    /**
     * 返回机型是否是刘海屏
     * 
     */
    GetSystemLiuHai() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            if (!this._m_Systeminfo) {
                console.log('systeminfo is null');
                return false;
            }

            //2.0 以上的手机大部分有刘海
            console.log('this._m_VisibleSize.width / this._m_VisibleSize.height', this._m_VisibleSize.width / this._m_VisibleSize.height);
            if (this._m_VisibleSize.width / this._m_VisibleSize.height >= 2) {
                //
                if (this._m_Systeminfo.brand === 'SMARTISAN') {
                    console.log('IsLiuHai false')
                    return false;
                }
                // else if(this._m_Systeminfo.brand = 'xiaomi'){
                // }
                else {
                    console.log('IsLiuHai true');
                    return true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },

})
