# 项目概要

+ 项目名称：cccgame
+ 引擎环境：cocoscreator 2.2.0
+ 开发人员：06linux


# 备忘信息

start: BaseAction

优化：将BaseConfig 中的配置全部提取到 json 表格里面。尽量少在代码里面写
优化：将BaseMusic 加载列表配置到 json 表格中

Base 拆分 

  BaseHttp  网络访问请求 --ok
  BaseMenu  界面相关函数 --ok
  BaseMusic 音乐音效 --ok
  BaseAction 动效特效 --ok
  BaseUtil  工具函数库
  BaseSav  用户存档, 使用 uuid 作为用户存档的key值，防止存档冲突 -- ok
  BaseJson 游戏中配置文件加载（统一使用 json 格式） --ok
  
  BaseConfig:  全局配置
  BaseNpc   Npc操作封装（npc缓冲池）



# 开发日志

## 2019-11-10
  + 项目初始化，代码命名重构

