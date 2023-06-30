<?php


/*
 * 加载layer弹窗插件
 * */
function nicen_sync_load_layer() {

	wp_enqueue_style( 'layercss', 'https://cdn.bootcdn.net/ajax/libs/layer/3.5.1/theme/default/layer.css', array() );
	wp_enqueue_script( 'layerjs', 'https://cdn.bootcdn.net/ajax/libs/layer/3.5.1/layer.min.js', array( 'jquery' ) );
	wp_enqueue_script( 'clipboard', 'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/clipboard.js/2.0.10/clipboard.min.js', array( 'jquery' ) );
	wp_enqueue_script( 'load2', nicen_sync_url . 'assets/load2.js', [ 'layerjs' ], filemtime( nicen_sync_path . 'assets/load2.js' ) );
	wp_enqueue_style( 'antdcss', nicen_sync_url . 'assets/antd.css', array(), filemtime( nicen_sync_path . 'assets/antd.css' ) );
	wp_enqueue_script( 'axios', 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/axios/0.26.0/axios.min.js' );


	/*
	 * 内联的js，输出接口密钥
	 * */
	wp_add_inline_script( "layerjs", preg_replace( '/\s/', '', vsprintf( '
			window.POST_ZHIHU_KEY = "%s";
			window.PLUGIN_CONFIG=%s;
		', [
		esc_html( nicen_sync_config( 'nicen_sync_plugin_private' ) ),
		json_encode( nicen_sync_config() )
	] ), ), 'before' );
}

/*
 * 编辑器后台加载样式和脚本
 * */
if ( strpos( $_SERVER['SCRIPT_NAME'] ?? "", '/post' ) !== false ) {
	add_action( 'admin_enqueue_scripts', 'nicen_sync_load_layer' ); //加载前台资源文件
}


/*
 * 后台主题设置页面，外部文件加载
 * */
function nicen_sync_admin_load_source() {

	wp_enqueue_script( 'vuejs', nicen_sync_url . 'assets/vue.min.js', [ 'jquery' ] );

	wp_enqueue_script( 'moments', 'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/moment.js/2.29.1/moment.min.js' );

	wp_enqueue_script( 'antd', nicen_sync_url . 'assets/antd.min.js', [ 'jquery', 'vuejs' ] );

	wp_enqueue_style( 'antdcss', 'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/ant-design-vue/1.7.8/antd.min.css' );

	wp_enqueue_style( 'admincss', nicen_sync_url . 'assets/admin.css', array(), filemtime( nicen_sync_path . 'assets/admin.css' ) );
	wp_enqueue_script( 'adminjs', nicen_sync_url . 'assets/admin.js', [ 'chatjs' ], filemtime( nicen_sync_path . 'assets/admin.js' ) );
	wp_enqueue_script( 'loadjs', nicen_sync_url . 'assets/load.js', array(), filemtime( nicen_sync_path . 'assets/load.js' ) );

	wp_enqueue_script( 'axios', 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/axios/0.26.0/axios.min.js' );
	wp_enqueue_media(); //加载媒体选择器
	/*
	 * 内联的js代码
	 * */
	wp_add_inline_script( "vuejs", vsprintf( "const PLUGIN_CONFIG=%s;", [
		json_encode( nicen_sync_config() )
	] ), 'before' );


}


/*
 * 后台加载样式和脚本
 * */
if ( strpos( $_SERVER['QUERY_STRING'] ?? "", 'nicen_sync_plugin' ) !== false ) {
	add_action( 'admin_enqueue_scripts', 'nicen_sync_admin_load_source' ); //加载前台资源文件
}


