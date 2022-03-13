
import { BaseMusic, BaseMusic_List } from '../base/BaseMusic';
import { BaseMenu, BaseMenu_List } from '../base/BaseMenu';


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

    },

    start () {
    },

    // update (dt) {},

    /**
     * 按钮点击事件
     * @param {cc.Touch} touch 
     */
    OnClick(touch) {
        //实现方法 示例
        console.log("MainMenu.OnClick:", touch.target.name, touch );

        if (touch.target.name == 'btn_start') {
            
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.DemoMenu, (objMenu)=>{
                console.log("load success ", BaseMenu_List.DemoMenu);
            });
        }
        else if(touch.target.name == 'btn_test')
        {
            console.log("test .....");

            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestMenuMain, (objMenu)=>{
                console.log("load success ", BaseMenu_List.TestMenuMain);
                
            });

        }

    },

    /**
     * 触摸按下
     * @param {cc.touch} touch 
     */
    TouchesBegin(touch) {
    },

    /**
     * 触摸移动
     * @param {cc.touch} touch
     */
    TouchesMoved(touch) {
    },

    /**
     * 触摸抬起
     * @param {cc.touch} touch 
     */
    TouchesEnded(touch) {
        // BaseUtil.CCLogGroupEnd();
    },

    /**
     * 触摸取消
     * @param {cc.touch} touch 
     */
    TouchesCancel(touch) {
    },

});
