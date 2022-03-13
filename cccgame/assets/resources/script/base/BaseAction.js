/**
 * 常用的动作，简单的封装
 */
export class BaseAction {

    //使用严格模式
    'use strict'

    /**
     * 移动到目标位置
     * @param {cc.Node} _node node 对象
     * @param {number} _time  时间，单位：秒
     * @param {cc.Vec2} _pos   _pos
     * @param {Function} _callFun 回调函数
     * 
     * 使用举例：
     * BaseAction.MoveTo(this.m_Npc, 0.5, cc.v2(200,200), ()=>{
                console.log('move to succ');
           });
     */
    static MoveTo(_node, _time, _pos, _callFun) {
        if(_node){
            if(_callFun){
                cc.tween(_node).to(_time, {position:_pos}).call(_callFun).start();
            }
            else{
                cc.tween(_node).to(_time, {position:_pos}).start();
            }
        }
    }

    /**
     * 移动 (向前移动)
     * @param {cc.Node} _node 要移动的node
     * @param {number} _time    移动的时间，单位：秒
     * @param {cc.Vec2} _pos   _pos
     * @param {Function} _callFun 回调函数
     * 
     * 使用举例：
     * BaseAction.MoveBy(this.m_Npc, 0.5, cc.v2(50,50), ()=>{
            console.log('move by succ');
          });
     */
    static MoveBy(_node, _time, _pos, _callFun) {

        if(_node){
            if(_callFun){
                cc.tween(_node).by(_time, {position:_pos}).call(_callFun).start();
            }
            else{
                cc.tween(_node).by(_time, {position:_pos}).start();
            }
        }
    }

    /**
     * 循环移动 （从当前位置到 pos 位置，AB两点位置循环移动）
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {cc.Vec2} _pos   _pos
     * @param {Function} _callFun 回调函数
     * 
     * 备注：
     * cc.tween 中的 repeatForever 函数有bug ，所以使用 cc.action 函数实现
     * 
     * 使用举例：
     * BaseAction.MoveToLoop(this.m_Npc, 1, cc.v2(200,200), ()=>{
            console.log('move to loop succ');
        });
     */
    static MoveToLoop(_node, _time, _pos, _callFun = null) {
        if(_node){

            if(_callFun){
                let act = cc.sequence(
                    cc.moveTo(_time/2,_pos), 
                    cc.moveTo(_time/2,_node.getPosition()),
                    cc.callFunc(_callFun)
                    );
                _node.runAction(cc.repeatForever(act));
            }
            else
            {
                let act = cc.sequence(
                    cc.moveTo(_time/2,_pos), 
                    cc.moveTo(_time/2,_node.getPosition())
                    );
                _node.runAction(cc.repeatForever(act));
            }
        }
    }


    /**
     * 循环移动, 一直向前移动， 每次位置增加 _pos 
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {cc.Vec2} _pos   _pos
     * @param {Function} _callFun 回调函数
     * 
     * 备注：
     * cc.tween 中的 repeatForever 函数有bug ，所以使用 cc.action 函数实现
     * 
     * 使用举例：
        BaseAction.MoveByLoop(this.m_Npc, 1, cc.v2(100,100), ()=>{
            console.log('move by loop succ');
        });
     */
    static MoveByLoop(_node, _time, _pos, _callFun = null) {
        if(_node){

            if(_callFun){
                let act = cc.sequence(
                    cc.moveBy(_time, _pos), 
                    cc.callFunc(_callFun),
                    );
                _node.runAction(cc.repeatForever(act));
            }
            else
            {
                let act = cc.sequence(
                    cc.moveBy(_time, _pos),
                    );
                _node.runAction(cc.repeatForever(act));
            }
        }
    }


    /**
     * 缩放
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {number} _scaleX    x 轴缩放
     * @param {number} _scaleY    x 轴缩放
     * @param {Function} _callFun 回调函数
     */
    static ScaleTo(_node, _time, _scaleX, _scaleY, _callFun) {
        if(_node){
            if(_callFun){
                cc.tween(_node).to(_time, {scaleX:_scaleX, scaleY:_scaleY}).call(_callFun).start();
            }
            else{
                cc.tween(_node).to(_time, {scaleX:_scaleX, scaleY:_scaleY}).start();
            }
        }
    }


    /**
     * 缩放 
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {number} _scaleX    x 轴缩放
     * @param {number} _scaleY    x 轴缩放
     * @param {Function} _callFun 回调函数
     */
    static ScaleBy(_node, _time, _scaleX, _scaleY, _callFun) {
        if(_node){
            if(_callFun){
                cc.tween(_node).by(_time, {scaleX:_scaleX, scaleY:_scaleY}).call(_callFun).start();
            }
            else{
                cc.tween(_node).by(_time, {scaleX:_scaleX, scaleY:_scaleY}).start();
            }
        }
    }

    /**
     * 循环缩放 
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {number} _scale1   缩放1
     * @param {number} _scale2   缩放1
     * @param {Function} _callFun 回调函数
     * 
     * 备注：
     * cc.tween 中的 repeatForever 函数有bug ，所以使用 cc.action 函数实现
     */
    static ScaleLoop(_node, _time, _scale1, _scale2, _callFun = null) {
        if(_node){

            if(_callFun){
                let act = cc.sequence(
                    cc.scaleTo(_time/2,_scale1), 
                    cc.scaleTo(_time/2,_scale2),
                    cc.callFunc(_callFun)
                    );
                _node.runAction(cc.repeatForever(act));
            }
            else
            {
                let act = cc.sequence(
                    cc.scaleTo(_time/2,_scale1), 
                    cc.scaleTo(_time/2,_scale2)
                    );
                _node.runAction(cc.repeatForever(act));
            }
        }
    }

    /**
     * 旋转
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {number} _angle  角度, [0,360], 整数微顺时针方向， 负数微逆时针方向
     * @param {Function} _callFun 回调函数
     */
    static RouteTo(_node, _time, _angle, _callFun) {
        if(_node){
            if(_callFun){
                let act = cc.sequence(
                    cc.rotateTo(_time, _angle),
                    cc.callFunc(_callFun)
                    );
                _node.runAction(act);
            }
            else
            {
                let act = cc.rotateTo(_time, _angle);
                _node.runAction(act);
            }
        }
    }


    /**
     * 旋转
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {number} _angle  角度, [0,360], 整数微顺时针方向， 负数微逆时针方向
     * @param {Function} _callFun 回调函数
     */
    static RouteBy(_node, _time, _angle, _callFun) {
        if(_node){
            if(_callFun){
                let act = cc.sequence(
                    cc.rotateBy(_time, _angle),
                    cc.callFunc(_callFun)
                    );
                _node.runAction(act);
            }
            else
            {
                let act = cc.rotateBy(_time, _angle);
                _node.runAction(act);
            }
        }
    }

    /**
     * 顺时针循环旋转（转圈圈）
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {number} _angle  角度, [0,360], 整数微顺时针方向， 负数微逆时针方向
     * @param {Function} _callFun 回调函数
     * 
     * 使用举例：
     * BaseAction.RouteLoop(this.m_Npc,1,()=>{
                console.log(' route by success');
            });
     */
    static RouteLoop(_node, _time, _callFun) {
        if(_node){
            if(_callFun){
                let act = cc.sequence(
                    cc.rotateBy(_time/2, 180),
                    cc.rotateBy(_time/2, 180),
                    cc.callFunc(_callFun)
                    );
                _node.runAction(cc.repeatForever(act));
            }
            else
            {
                let act = cc.sequence(
                    cc.rotateBy(_time/2, 180),
                    cc.rotateBy(_time/2, 180),
                    );
                _node.runAction(cc.repeatForever(act));
            }
        }
    }


    /**
     * 逆时针循环旋转（转圈圈）
     * @param {cc.Node} _node  node 对象
     * @param {number} _time   时间，单位：秒
     * @param {number} _angle  角度, [0,360], 整数微顺时针方向， 负数微逆时针方向
     * @param {Function} _callFun 回调函数
     */
    static RouteLoop2(_node, _time, _callFun) {
        if(_node){
            if(_callFun){
                let act = cc.sequence(
                    cc.rotateBy(_time/2, -180),
                    cc.rotateBy(_time/2, -180),
                    cc.callFunc(_callFun)
                    );
                _node.runAction(cc.repeatForever(act));
            }
            else
            {
                let act = cc.sequence(
                    cc.rotateBy(_time/2, 180),
                    cc.rotateBy(_time/2, 180),
                    );
                _node.runAction(cc.repeatForever(act));
            }
        }
    }


    /**
     * 等待 
     * @param {cc.Node} _node  node对象
     * @param {number} _time    时间，单位：秒
     * @param {Function} _callFun 回调函数 
     */
    static Delay(_node, _time, _callFun) {

        if(_node){
            if(_callFun){
                cc.tween(_node).delay(_time).call(_callFun).start();
            }
            else{
                // cc.tween(_node).delay(_time).start();
                console.log("Error, BaseAction.Delay, _callFun is null");
            }
        }
    }




}
