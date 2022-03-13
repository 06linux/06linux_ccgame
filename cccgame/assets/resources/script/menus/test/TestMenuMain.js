import { BaseMenu, BaseMenu_List } from '../../base/BaseMenu';
import { BaseAction } from '../../base/BaseAction';


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

    // update (dt) {},

    /**
     * 按钮点击事件
     * @param {cc.Touch} touch 
     */
    OnClick(touch) {
        //实现方法 示例
        console.log("TestMenuMain.OnClick:", touch.target.name, touch );

        if (touch.target.name == 'btn_close') {
            
             // 缩放退出
            BaseAction.ScaleTo(this.node, 0.2, 0.1, 0.1, ()=>{
                BaseMenu.Instance().PrefebFree(this.node);
            });
        }
        else if(touch.target.name == 'btn_test_menu')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestMnu, ()=> {
                console.log("load success ", BaseMenu_List.TestMnu);
            });
        }
        else if(touch.target.name == 'btn_test_music')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestMusic,()=> {
                console.log("load success ", BaseMenu_List.TestMusic);
            });
        }
        else if(touch.target.name == 'btn_test_action')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestAction,()=> {
                console.log("load success ", BaseMenu_List.TestAction);
            });
        }
        else if(touch.target.name == 'btn_test_http')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestHttp,()=> {
                console.log("load success ", BaseMenu_List.TestHttp);
            });
        }
        else if(touch.target.name == 'btn_test_sav')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestSave,()=> {
                console.log("load success ", BaseMenu_List.TestSave);
            });
        }
        else if(touch.target.name == 'btn_test_json')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestJson,()=> {
                console.log("load success ", BaseMenu_List.TestJson);
            });
        }
        else if(touch.target.name == 'btn_test_util')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestUtil,()=> {
                console.log("load success ", BaseMenu_List.TestUtil);
            });
        }
        else if(touch.target.name == 'btn_test_npc')
        {
            BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.TestNpc,()=> {
                console.log("load success ", BaseMenu_List.TestNpc);
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
