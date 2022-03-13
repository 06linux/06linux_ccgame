
export var BaseMenu_List = {

    MainMenu: 'script/menus/MainMenu',
    GamePlay: 'script/gameplay/GamePlay',
    
    // 功能测试页面
    DemoMenu: 'script/menus/test/DemoMenu',         //demo 页面
    TestMenuMain: 'script/menus/test/TestMenuMain',  // 测试模块入口
    TestMnu: 'script/menus/test/TestMenu',           //测试页面
    TestMusic: 'script/menus/test/TestMusic',       //音乐音效测试
    TestAction: 'script/menus/test/TestAction',     //简单的 Action 封装测试
    TestHttp: 'script/menus/test/TestHttp',         //Http联网请求测试
    TestSave: 'script/menus/test/TestSave',         //玩家存档读写测试
    TestJson: 'script/menus/test/TestJson',         //配置文件加载测试
    TestUtil: 'script/menus/test/TestUtil',         //工具函数测试
    TestNpc: 'script/menus/test/TestNpc',           //npc 加载测试

}


/**
 * 界面跳转函数封装
 */
export class BaseMenu {

    //使用严格模式
    'use strict'

    /**
     * 加载本地图片
     * @param {string} _url        //资源地址
     * @param {function} _callFun     //资源加载回调
     */
    LoadImg(_url, _callFun = null) {
        cc.loader.loadRes(_url, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error(err);
            }
            if (_callFun) {
                _callFun(spriteFrame);
            }
        });
    }

    /**
     * 加载网络图片
     * @param {string} _netUrl        //资源地址
     * @param {function} _callFun  //资源加载回调
     */
    LoadImgNet(_netUrl, _callFun = null) {

        cc.loader.load({ url: _netUrl, type: 'png' }, (err, texture) => {
            if (err) {
                console.error(err)
            }

            if (_callFun) {
                _callFun(texture);
            }
        });
    }

    /**
     * 设置图片
     * @param {cc.Node} _node 
     * @param {string} _url        //资源地址
     * @param {function} _callFun  //资源加载回调
     */
    SetSprite(_node, _url, _callFun = null) {

        this.LoadImg(_url, (spriteFrame) => {
            var sprite = _node.getComponent(cc.Sprite);
            if (sprite) {
                sprite.spriteFrame = spriteFrame;
            }
            else 
            {
                _node.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            if (_callFun) {
                _callFun();
            }
        });
    }

    /**
     * 设置图片
     * @param {cc.Node} _node 
     * @param {string} _netUrl        //网络资源地址
     * @param {function} _callFun  //资源加载回调
     */
    SetSpriteNet(_node, _netUrl, _callFun = null) {

        this.LoadImgNet(_url, (texture) => {
            let spriteFrame = new cc.SpriteFrame(texture);
            var sprite = _node.getComponent(cc.Sprite);
            if (sprite) {
                sprite.spriteFrame = spriteFrame;
            }
            else {
                _node.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
            if (_callFun) {
                _callFun();
            }
        });
    }

    /**
     * 加载预制体 （本地资源）
     * @param {cc.Node} _parentNode   父亲节点 (当前与肢体要加载到哪里)
     * @param {string}  _url   预制体资源路径名称
     * @param {Function} _callFun  加载成功后的回掉函数
     * 
     *  使用举例：
            BaseMenu.Instance().PrefabLoad(this.node, 'script/menus/test/DemoMenu', ()=>{
                console.log("load success" );
            });
     */
    PrefabLoad(_parentNode, _url,  _callFun = null) {

        if (_parentNode == null) {
            console.log('Error, BaseMenu.LoadPrefab _parentNode is null');
            return;
        }

        cc.loader.loadRes(_url, cc.prefab, (err, assets) => {
            if (err) {
                console.error(err)
                return;
            }

            let obj = cc.instantiate(assets);
            obj.__PrefabUrl__ = _url;   // 存储对应的路径名称，释放的时候用到
            _parentNode.addChild(obj);

            if (_callFun) {
                _callFun(obj);
            }
        });
    }

    /**
     * 释放之前加载的预制体对象
     * @param {cc.Node} _obj 要释放的预制体对象
     * 
     * 使用举例：
     *  
     *  BaseMenu.Instance().PrefebFree(this.node); // 释放当前页面
     */
    PrefebFree(_objNode)
    {
        if(_objNode)
        {
            _objNode.destroy();
        }
    }

    /**
     * 释放之前加载的预制体对象
     * @param {cc.Node} _parentNode 父亲节点
     * @param {string}  _url   预制体资源路径名称
     * 
     * 使用举例：
     */
    PrefebFreeByUrl(_parentNode, _url)
    {
        let obj = this.PrefabGet(_parentNode, _url);
        if(obj)
        {
            obj.destroy();
        }
    }

    /**
     * 得到一个预制体对象（查找已经加载到内存中的对象）
     * @param {cc.Node} _parentNode 父亲节点
     * @param {string}  _url   预制体资源路径名称
     * 
     * 使用举例：
     *  let obj = BaseMenu.Instance().PrefabGet(this.node, 'script/menus/test/DemoMenu');
     */
    PrefabGet(_parentNode, _url){

        let retObj = null;
        if (_parentNode) {
            _parentNode.children.forEach(obj => {

                // console.log('PrefabGet', obj);
                if(obj.__PrefabUrl__ && _url ==  obj.__PrefabUrl__)
                {
                    retObj = obj;
                    return;
                }
            });
        }
        return retObj;
    }

    /**
     * 获取主摄像机
     */
    GetCameraMain() {
        return cc.find('Canvas/Main Camera');
    }

    /**
     * 获取界面摄像机
     */
    GetCameraGamePlay() {
        return cc.find('Canvas/GamePlay Camera');
    }

    /**
     * 界面默认绑定的根节点 
     * Canvas 为所有界面的根结点
     */
    GetRootNode() {
        return cc.find("Canvas");;
    }

    /**
     * 预加载场景
     * @param {string} _sceneName 场景名字
     * @param {Function} _onSuccess 回调成功函数
     * 
     */
    PreLoadScene(_sceneName, _onSuccess) {
        cc.director.preloadScene(_sceneName, () => {
            if (_onSuccess) {
                _onSuccess();
            }
        });
    }

    /**
     * 切换场景后前一个场景会将所有界面销毁
     * @param {string} _sceneName 场景名字
     * @param {Function} _onSuccess 回调成功函数
     */
    SwitchScene(_sceneName, _onSuccess) {

        cc.director.loadScene(_sceneName, (data) => {
            if (_onSuccess) {
                _onSuccess();
            }
        });
    }

    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new BaseMenu();
        }
        return this.m_Instance;
    }
}
