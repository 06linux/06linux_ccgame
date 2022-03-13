import { BaseConfig } from "./BaseConfig";

/**
 * 本地音乐资源 
 * 
 * 备注：本地音乐资源名称不用加后缀名
 * 
 */
export var BaseMusic_List = {
    Music_1: "music_1",
    Music_2: "music_2",
    Music_3: "music_3",

    Sound_Touch: "sound_touch",
    Sound_ReadyGo: "sound_ready_go",
}


// 本地音乐文件存放的路径
const BaseMuisc_LocalPath = '/data/music/'

// 网络音乐存放路径
const BaseMuisc_NetPath = BaseConfig.Global.NetRoot + BaseConfig.Global.NetRes + '/music/'


/**
 * 游戏音乐音效函数封装
 * 
 * 背景音乐： 可以循环播放
 * 游戏音效：只能播放一次
 */
export class BaseMusic {

    //使用严格模式
    'use strict'

    static IsOpenMusic = true;
    static IsOpenSound = true;

    /**
     * 初始化
     */
    constructor() {
        // console.log("BaseMusic constructor");

        //  存储当前已经成功加载的音乐资源
        this.m_audio_data = new Map();

        // 存档当前正在播放的背景音乐 id
        this.m_music_id = 0;

        // 存档当前正在播放的音效id
        this.m_sound_id = 0;
    }

    /**
     * 初始化，加载音乐列表中配置的音乐 （本地音乐列表加载）
     * @param {Function} _callFun  
     */
    LoadMuiscList(_callFun) {

        //加载音乐
        let temp_array = [];
        let load_num = 0;
        for (let key in BaseMusic_List) {
            //往数组中放值
            temp_array.push(BaseMusic_List[key]);
        }
        // console.log('temp_array', temp_array);

        for (let index = 0; index < temp_array.length; index++) {

            this.Load(temp_array[index], () => {
                load_num++;
                //资源加载完毕
                if (temp_array.length == load_num) {
                    if (_callFun) {
                        _callFun();
                    }
                }
            });
        }
    }

    /**
     * 加载本地音乐
     * @param {string} _name, 音乐资源文件名称， 例如： 'music_1.mp3'
     * @param {string} _path, 音乐资源的路径， 例如： '/data/muisc/'
     * @param {Function} _callFun, 加载成功后回掉函数
     */
    Load(_name, _callFun = null, _path=BaseMuisc_LocalPath) {

        // 加载本地资源
        cc.loader.loadRes(_path + _name, (err, audio) => {
            if (err) {
                console.error(err);
                return;
            }

            this.m_audio_data.set(_name, audio);
            if (_callFun) {
                _callFun(audio);
            }
        });
    }


    /**
     * 加载网络音乐资源
     * @param {string} _name, 音乐资源文件名称， 例如： 'music_1.mp3'
     * @param {string} _path, 音乐资源的路径， 例如： 'http://xxxx.com/demo/res_1001/music/'
     * @param {Function} _callFun, 加载成功后回掉函数
     */
    LoadNet(_name, _callFun = null, _path=BaseMuisc_NetPath) {
        cc.loader.load(_path + _name, (err, audio) => {
            if (err) {
                console.error(err);
                return;
            }
            this.m_audio_data.set(_name, audio);
            if (_callFun) {
                _callFun(audio);
            }
        });
    }

    
    /**
     * 播放背景音乐
     * @param {string} _name  音乐文件名称 
     */
    MusicPlay(_name) {

        if(!BaseMusic.IsOpenMusic)
        {
            return;
        }
       
        let audio = this.m_audio_data.get(_name);
        if (audio) {
            this.MusicStop();
            this.m_music_id = cc.audioEngine.playMusic(audio, true);
        }
        else {
            console.log('MusicPlay not load _musicname', _name);
        }
    }

    /**
     * 停止背景音乐
     */
    MusicStop() {
        cc.audioEngine.stopMusic();
    }

    /**
     * 暂停背景音乐
     */
    MusicPause() {
        cc.audioEngine.pauseMusic();
    }

    /**
     * 恢复背景音乐
     */
    MusicResume() {
        cc.audioEngine.resumeMusic();
    }

    /**
     * 播放音效
     * @param {string} _name  音乐文件名称 
     */
    SoundPlay(_name) {

        if(!BaseMusic.IsOpenSound)
        {
            return;
        }

        let audio = this.m_audio_data.get(_name);
        if (audio) {
            this.m_sound_id = cc.audioEngine.playEffect(audio, false);
        }
        else {
            console.log('SoundPlay not load _soundname', _name);
        }
    }
    

    /**
     * 停止音效
     */
    SoundStop() {
        cc.audioEngine.stopEffect(this.m_sound_id);
    }

    /**
     * 停止音效
     */
    SoundStopAll() {
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 暂停音效
     */
    SoundPause() {
        cc.audioEngine.pauseEffect(this.m_sound_id);
    }

    /**
     * 暂停音效
     */
    SoundPauseAll() {
        cc.audioEngine.pauseAllEffects();
    }

    /**
     * 恢复音效
     */
    SoundResume() {
        cc.audioEngine.resumeEffect(this.m_sound_id);
    }

    /**
     * 恢复音效
     */
    SoundResumeAll() {
        cc.audioEngine.resumeAllEffects();
    }

    /**
     * 音乐控制 (声音开关控制)
     * 
     * 使用举例：
     * 
        BaseMusic.IsOpenSound = !BaseMusic.IsOpenSound;
        BaseMusic.IsOpenMusic = !BaseMusic.IsOpenMusic;
        BaseMusic.Instance().MusicControl();
     */
    MusicControl() {

        if(BaseMusic.IsOpenMusic)
        {
            this.MusicResume();
        }
        else
        {
            this.MusicPause();
        }
        
        if(!BaseMusic.IsOpenSound)
        {
            this.SoundStopAll();
        }
    }


    /**
     * 返回当前实例
     */
    static Instance() {
        if (this.m_Instance == null) {
            this.m_Instance = new BaseMusic();
        }
        return this.m_Instance;
    }
}