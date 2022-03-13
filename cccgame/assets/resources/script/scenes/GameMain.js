
import {BaseConfig} from '../base/BaseConfig'
import {BaseMenu, BaseMenu_List} from '../base/BaseMenu';

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        console.log('GameMain start');
        BaseMenu.Instance().PrefabLoad(this.node, BaseMenu_List.MainMenu, ()=>{
            console.log('GameMain load menu success', BaseMenu_List.MainMenu);
        });
    },

    // update (dt) {},



});
