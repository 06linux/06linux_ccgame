
/**
 * 工具类
 * 常用工具函数的封装
 */
export class BaseUtil {

    //使用严格模式
    'use strict'

    /**
     * 返回一个随机数
     * @param {number} _min 
     * @param {number} _max 
     * 返回一个整数
     */
    static RandNum(_min, _max) {

        if (_max < _min) {
            return Math.round(_max) + Math.round(Math.random() * (_min - _max));
        }
        else if (_max === _min) {
            return Math.round(_min);
        }
        else {
            return Math.round(_min) + Math.round(Math.random() * (_max - _min));
        }
    }

    /**
     * 返回一个随机数
     * @param {Float} _min 
     * @param {Float} _max 
     * 返回一个浮点数
     */
    static RandFloat(_min, _max) {

        if (_max < _min) {
            return _max + Math.random() * (_min - _max);
        }
        else if (_max === _min) {
            return _min;
        }
        else {
            return _min + Math.random() * (_max - _min);
        }
    }

    /**
     * 返回一个随机弧度
     * 范围(-π,+π)
     * 返回一个浮点数
     */
    static RandRadian() {
        return Math.random() > 0.5 ? Math.random() % Math.PI : -Math.random() % Math.PI;
    }

    /**
     * 判读对象是否为空
     * @param {object} _arr 
     */
    static IsNull(_value) {

        if (_value === null ||
            _value === "" ||
            _value === "null" ||
            _value === "Null" ||
            _value === "NULL" ||
            _value === undefined
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 深度拷贝对象
     * @param {object} obj 
     */
    static CloneObj(obj) {
        var newObj = {};
        if (obj instanceof Array) {
            newObj = [];
        }
        for (var key in obj) {
            var val = obj[key];
            if (val === null) {
                newObj[key] = null;
            }
            else {
                newObj[key] = typeof val === 'object' ? this.CloneObj(val) : val;
            }
        }
        return newObj;
    }

    /**
     * 返回一个唯一的uuid
     * 
     */
    static GetUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    /**
     * 返回一个字符串对应字节的长度的片段
     * @param {string} _str 
     * @param {number} _bytes
     * 
     */
    static GetStringCutOut(_str, _bytes = 10) {

        let result = "";

        if (_str == null) {
            return result;
        }

        var len = 0;
        for (var i = 0; i < _str.length; i++) {

            if (_str.charCodeAt(i) > 127 || _str.charCodeAt(i) == 94) {
                len += 2;

            } else {
                len++;
            }

            if (len <= _bytes) {
                result += _str.charAt(i);
            }
        }

        if (result.length < _str.length) {
            result += "...";
        }

        // console.log("GetStringTrim result",result);

        return result;
    }

    /**
     * 返回字符串根据 字符 分割数组
     * @param {string} _str 
     * @param {string} _key 
     */
    static GetStringToArray(_arr, _key = ';') {

        if (BaseUtil.IsNull(_arr)) {
            return [];
        }

        return _arr.split(_key);
    }

    /**
     * 返回弧度对应长度的位置 
     * 默认为1长度
     * @param {Float} _eadian 
     */
    static RadianToVec2(_eadian, _lenght = 1) {
        return cc.v2(Math.cos(_eadian) * _lenght, Math.sin(_eadian) * _lenght);
    }

    /**
     * 返回角度对应的弧度
     * @param {Float} _angle
     */
    static AngleToRadian(_angle) {
        return _angle / 180 * Math.PI// (_eadian/Math.PI)*180;
    }

    /**
     * 返回弧度对应的角度
     * @param {Float} _eadian 
     */
    static RadianToAngle(_eadian) {
        return (_eadian / Math.PI) * 180;
    }

    /**
     * 返回两个向量的距离
     * @param {Float} _eadian 
     */
    static Vec2Distance(_vec21, _vec22) {
        let out = cc.v2(0, 0);
        out.x = _vec21.x - _vec22.x;
        out.y = _vec21.y - _vec22.y;
        // let length =  Math.sqrt(_vec2.x * _vec2.x + _vec2.y * _vec2.y);
        return Math.sqrt(out.x * out.x + out.y * out.y);
    }

    /**
     * 返回二维向量的减法
     * @param {cc.Vec2} _vec21
     * @param {cc.Vec2} _vec22 
     * 
     */
    static Vec2Sub(_vec21, _vec22) {
        let out = cc.v2(0, 0);
        out.x = _vec21.x - _vec22.x;
        out.y = _vec21.y - _vec22.y;
        return out;
    }

    /**
     * 返回二维向量的弧度
     * @param {cc.Vec2} _vec2 
     */
    static Vec2Radian(_vec2) {
        return Math.atan2(_vec2.y, _vec2.x);
    }

    /**
     * 返回二维向量的长度
     * @param {cc.Vec2} _vec2 
     */
    static Vec2Lenght(_vec2) {
        return Math.sqrt(_vec2.x * _vec2.x + _vec2.y * _vec2.y);
    }

    /**
     * 返回二维向量归一化
     * @param {cc.Vec2} _vec2 
     */
    static Vec2Normalize(_vec2) {
        let out = cc.v2(0, 0);
        var magSqr = _vec2.x * _vec2.x + _vec2.y * _vec2.y;
        if (magSqr === 1.0)
            return _vec2;

        if (magSqr === 0.0) {
            return _vec2;
        }

        var invsqrt = 1.0 / Math.sqrt(magSqr);
        out.x = _vec2.x * invsqrt;
        out.y = _vec2.y * invsqrt;

        return out;
    }

    /**
     * 返回二维向量的缩放
     * @param {cc.Vec2} _vec2 
     * @param {Number} _lenght 
     * 
     */
    static Vec2Mul(_vec2, _lenght) {
        let out = cc.v2(0, 0);
        out.x = _vec2.x * _lenght;
        out.y = _vec2.y * _lenght;
        return out;
    }

    /**
     * 将毫秒数转换成时间格式 2019:05:30:10:12:10
     * @param {number} _time
     */
    static GetTimeFormat(_time) {
        var now = new Date(_time),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }

    /**
     * 将秒数转换成时间格式 10:50 秒
     * @param {number} _time 
     */
    static GetTimeMinutesSeconds(_time) {
        let minutes = Math.floor(_time / 60);
        let seconds = _time - (minutes * 60);
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }

    /**
     * 将毫秒数转换成时间格式  分钟
     * @param {number} _time 
     */
    static GetTimeMinutes(_time) {
        return Math.ceil(_time / 60);
    }

    /**
     * 将毫秒数转换成时间格式  天
     * @param {number} _time 
     */
    static GetTimeDay(_time) {
        return Math.ceil(_time / 1000 / 60 / 60 / 24);
    }

    /**
     * 将毫秒数转换成时间格式  小时
     * @param {number} _time 
     */
    static GetTimeHour(_time) {
        return Math.ceil(_time / 1000 / 60 / 60);
    }

    /**
     * 数字字符串相加
     * @param {String} _strA
     * @param {String} _strB
     * 
     */
    static StringCalculateSum(_strA, _strB) {

        //先判断是否是字符串
        if (typeof _strA !== 'string') {
            _strA = _strA + '';
        }

        if (typeof _strB !== 'string') {
            _strB = _strB + '';
        }

        let raList = _strA.split(''),
            rbList = _strB.split(''),
            result = '',
            count = 0;
        // console.log('StringCalculateAddition  raList', raList, 'rbList', rbList);

        while (raList.length || rbList.length || count) {
            // BaseUtil.CCLogCount('StringCalculateSum whiel')
            count += ~~raList.pop() + ~~rbList.pop();
            result = count % 10 + result;
            count = count > 9;
        }
        // console.log('StringCalculateSum  raList', raList, 'rbList', rbList, 'result', result);

        return result;

    }

    /**
     * 数字字符串相减
     * @param {String} _strA 被减数
     * @param {String} _strB 减数
     * 
     */
    static StringCalculateSub(_strA, _strB) {

        //先判断是否是字符串
        if (typeof _strA !== 'string') {
            _strA = _strA + '';
        }

        if (typeof _strB !== 'string') {
            _strB = _strB + '';
        }
        let raList = _strA.split(''),
            rbList = _strB.split(''),
            result = '',
            count = 0,
            desc = 0;

        if (parseInt(_strA) < parseInt(_strB)) {
            // console.log('_strA < _strB');
            let temp = raList;
            raList = rbList;
            rbList = temp;
            desc = -1;
        }
        else if (_strA == _strB) {
            return 0;
        }

        console.log('StringCalculateAddition  raList', raList, 'rbList', rbList);

        while (raList.length || rbList.length || count) {
            BaseUtil.CCLogCount('StringCalculateSub whiel');
            let ad = ~~raList.pop() - ~~rbList.pop() - count;
            console.log('ad', ad, 'count', count);
            result = (ad < 0 ? 10 + ad : ad) + result;
            count = ad < 0;
        }

        let relist = result.split('');

        for (let index = 0; index < relist.length; index++) {
            const element = relist[index];
            if (element != 0) {
                relist.splice(0, index)
                break;
            }

            if (index == relist.length - 1) {
                relist.splice(0, relist.length - 1);
                break;
            }
        }

        if (desc == -1) {
            relist.splice(0, 0, '-');
        }
        console.log('StringCalculateSub  raList', raList, 'rbList', rbList, 'result', result, 'relist.join', relist.join(''));

        return relist.join('');
    }

    /**
     * 返回换算后的字符串
     * @param {String} _strA 
     * 
     */
    static StringGetConversionUnit(_strA) {

        //先判断是否是字符串
        if (typeof _strA !== 'string') {
            _strA = _strA + '';
        }

        let unitSymbols = ['', 'K', 'B', 'M', 'T', 'P', 'E', 'Z', 'Y', 'S', 'L', 'X', 'D'],
            ra = _strA.replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')),
            result = '',
            desc = 0;

        let splitArray = ra.split(',');
        if (splitArray.length > unitSymbols.length) {
            splitArray.splice(splitArray.length - unitSymbols.length, unitSymbols.length - 1);
            desc = unitSymbols[unitSymbols.length - 1];
        }
        else {
            desc = unitSymbols[splitArray.length - 1];
            splitArray.splice(1, splitArray.length - 1);
        }

        result = splitArray.join('') + desc;

        // raList.splice(raList.length - unitindex * 3, raList.length - 1);
        // console.log('StringGetConversionUnit ra', ra, 'splitArray', splitArray, 'desc', desc);
        return result;
    }
}
