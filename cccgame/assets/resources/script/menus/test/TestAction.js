import { BaseAction } from "../../base/BaseAction";
import { BaseMenu } from "../../base/BaseMenu";

cc.Class({
    extends: cc.Component,

    properties: {
        m_Npc: cc.Node,
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
        console.log("TestAction OnClick:", touch.target.name, touch );
        if (touch.target.name == 'btn_close') {
            // 缩放退出
            BaseAction.ScaleTo(this.node, 0.2, 0.1, 0.1, ()=>{
                BaseMenu.Instance().PrefebFree(this.node);
            });
        }
        
        if (touch.target.name == 'btn_test1') {
        //    BaseAction.MoveTo(this.m_Npc, 0.5, cc.v2(200,200), ()=>{
        //         console.log('move to succ');
        //    });

        //    BaseAction.MoveBy(this.m_Npc, 0.5, cc.v2(50,50), ()=>{
        //     console.log('move by succ');
        //   });

           BaseAction.MoveToLoop(this.m_Npc, 1, cc.v2(this.m_Npc.x,this.m_Npc.y+200), ()=>{
            console.log('move to loop succ');
           });

        //    BaseAction.MoveByLoop(this.m_Npc, 1, cc.v2(100,100), ()=>{
        //     console.log('move by loop succ');
        //    });

        }
        else if (touch.target.name == 'btn_test2') {
            BaseAction.MoveBy(this.m_Npc, 0.5, cc.v2(20,20),()=>{
                console.log('move by succ');
            });
        }
        else if (touch.target.name == 'btn_test3') {

            BaseAction.Delay(this.m_Npc, 1, ()=>{
                console.log('delay succ');
            });

            BaseAction.ScaleLoop(this.m_Npc, 0.5, 1.3, 1, ()=>
            {
                console.log('ScaleLoop call....');
            });
           
        }
        else if (touch.target.name == 'btn_test4') {
            // BaseAction.ScaleBy(this.m_Npc, 0.5, 0.3, 0.3, ()=>{
            //     console.log('scale by success');
            // });

            // BaseAction.RouteTo(this.m_Npc,1, 90, ()=>{
            //     console.log(' route to success');
            // });

            // BaseAction.RouteBy(this.m_Npc,1, 60, ()=>{
            //     console.log(' route by success');
            // });

            BaseAction.RouteLoop2(this.m_Npc,1,()=>{
                console.log(' route by success');
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
