<?php
/**
 * Plugin Name: auto-sync-zhihu-note
 * Plugin URI:https://nicen.cn/2893.html
 * Description: 自动同步知乎的笔记到WordPress
 * Version: 1.0.0
 * Author: 友人a丶
 * Author URI: https://nicen.cn
 * Text Domain: auto-sync-zhihu-note
 * License: GPLv2 or later
 */


define( 'nicen_sync_path', plugin_dir_path( __FILE__ ) ); //插件目录
define( 'nicen_sync_url', plugin_dir_url( __FILE__ ) ); //插件URL


include_once nicen_sync_path . '/config.php'; //加载插件配置
include_once nicen_sync_path . '/admin/install.php'; //安装时触发

/*导入模块*/
include_once nicen_sync_path . '/admin/common.php'; //公共变量和方法
include_once nicen_sync_path . '/class/instance.php'; //trait单例模式
include_once nicen_sync_path . '/class/sync.php'; //头条自动标题
include_once nicen_sync_path . '/response/response.php'; //接口响应

/*
 * 只在后台才触发
 * */
if ( is_admin() ) {
	include_once nicen_sync_path . '/admin/load.php'; //加载后台插件资源
	include_once nicen_sync_path . '/admin/form.php'; //加载后台设置表单
	include_once nicen_sync_path . '/admin/setting.php';//渲染表单
	include_once nicen_sync_path . '/admin/initialize.php'; //初始化插件功能
}
