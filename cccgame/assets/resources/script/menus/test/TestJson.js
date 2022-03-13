import { BaseJson, BaseJson_List } from "../../base/BaseJson";
import { BaseAction } from "../../base/BaseAction";
import { BaseMenu } from "../../base/BaseMenu";

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
            BaseAction.ScaleTo(this.node, 0.2, 0.3, 0.1, ()=>{
                BaseMenu.Instance().PrefebFree(this.node);
            });

        }
        
        if (touch.target.name == 'btn_test1') {

            // BaseJson.Instance().Load(BaseJson_List.Test1,(res)=>{
            //     console.log('load json', res);
            // });

            BaseJson.Instance().LoadMore(['test1','test2'],()=>{
                console.log('load more succ..');
                }
            );
        }

        if (touch.target.name == 'btn_test2') {
            BaseJson.Instance().LoadNet('test1001.json', (res)=>{
                console.log('LoadNet succ..',res);
            });

            // BaseJson.Instance().LoadNetMore(['test1001.json','test1002.json'],()=>{
            //     console.log('load more succ..');
            //     }
            // );
        }

        if (touch.target.name == 'btn_test3') {
            BaseJson.Instance().DebugPrint();

            console.log('Get test:', BaseJson.Instance().Get(BaseJson_List.Test1));
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
