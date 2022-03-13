import { BaseMenu, BaseMenu_List } from "../../base/BaseMenu";
import { BaseAction } from "../../base/BaseAction";

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.on(cc.Node.EventType.TOUCH_START, this.TouchesBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TouchesMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.TouchesEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchesCancel, this);

        // 缩放进入
        this.node.scale =0.1;
        BaseAction.ScaleTo(this.node, 0.2, 1.0, 1.0);

    },

    start () {

    },

    // update (dt) {
    //     console.log('update', dt);
    // },


    /**
     * 按钮点击事件
     * @param {cc.Touch} touch 
     */
    OnClick(touch) {
        console.log("DemoMenu OnClick:", touch.target.name, touch );
        if (touch.target.name == 'btn_close') {
            
            // 缩放退出
            BaseAction.ScaleTo(this.node, 0.2, 0.1, 0.1, ()=>{
                BaseMenu.Instance().PrefebFree(this.node);
            });
        }

        if (touch.target.name == 'btn_ok') {
            BaseMenu.Instance().PrefebFreeByUrl(this.node.parent, BaseMenu_List.DemoMenu);
        }
        
        if (touch.target.name == 'btn_test') {
            console.log('this', this );
            console.log('this.node', this.node );

            let obj = BaseMenu.Instance().PrefabGet(this.node.parent, BaseMenu_List.DemoMenu);
            console.log('obj',obj);

            // 测试界面叠加
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.DemoMenu, ()=>{
                console.log("load menu succ", BaseMenu_List.DemoMenu );
            });
        }
    },

    /**
     * 触摸按下
     * @param {cc.touch} touch 
     */
    TouchesBegin(touch) {
        // console.log("DemoMenu TouchesBegin:", touch.target.name, touch );
    },

    /**
     * 触摸移动
     * @param {cc.touch} touch
     */
    TouchesMoved(touch) {
        // console.log("DemoMenu TouchesMoved:", touch.target.name, touch );
    },

    /**
     * 触摸抬起
     * @param {cc.touch} touch 
     */
    TouchesEnded(touch) {
        // console.log("DemoMenu TouchesEnded:", touch.target.name, touch );
    },

    /**
     * 触摸取消
     * @param {cc.touch} touch 
     */
    TouchesCancel(touch) {
    },
});
