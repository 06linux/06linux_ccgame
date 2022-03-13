
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    /**
     * 按钮点击事件
     * @param {cc.Touch} touch 
     * if (touch.target.name == 'StartGame') {
     * }
     */
    OnClick(touch) {
        //实现方法 示例
        console.log("GamePlay click event:", touch);
        if (touch.target.name == 'Btn_Back') {
        }
        
    }
});
