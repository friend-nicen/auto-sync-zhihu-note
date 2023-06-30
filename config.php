<?php

/*
 * @author 友人a丶
 * @date 2022-08-14
 * 主题前台设置
 * 主题后台设置
 *
 * 所有表单本质都可以看做类似json的配置结构
 * */


/**
 * 已定义的表单组件
 * nicen_sync_form_input
 * nicen_sync_form_number
 * nicen_sync_form_password
 * nicen_sync_form_textarea
 * nicen_sync_form_select  @option 数组或者回调函数代表选项
 * nicen_sync_form_switch
 * nicen_sync_form_color
 * */

/*
 * 后台所有表单
 *
 * 初始化函数在admin/setting.php
 *
 * document_menu_register ,初始化菜单
 * document_config_register，表单初始化
 *
 * 初始化函数在admin/admin.php
 *
 * do_settings_sections_user ,初始化分节
 * do_settings_fields_user，初始化所有输入组件
 *
 * */
const PLUGIN_nicen_sync = [
	/*菜单设置*/
	[
		"id"         => "nicen_sync_plugin",//主题后台设置字段
		"menu_title" => '知乎笔记同步',
		'page_title' => '知乎笔记同步',
		'callback'   => 'nicen_sync_setting_load',
		'capablity'  => 'manage_options',
		/*分节*/
		"sections"   => [
			[
				"id"     => "nicen_sync_note",
				'title'  => '知乎笔记同步',
				'fields' => [
					[
						'id'       => 'nicen_sync_zhihu_cookie',
						'title'    => '知乎Cookie（保存后生效）',
						'callback' => 'nicen_sync_form_textarea',
					],
				]
			]
		]
	]
];


/**
 * 主题所有配置
 * 键=>默认值
 * */
define( 'nicen_sync_CONFIG', [
	"nicen_sync_zhihu_cookie"   => "",
	'nicen_sync_plugin_private' => md5( time() ), //初次安装时的接口密钥
] );


