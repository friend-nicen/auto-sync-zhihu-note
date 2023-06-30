<?php

/*
 * 公共数据和方法
 * */

global $nicen_sync_CONFIGS; //声明全局变量

$nicen_sync_CONFIGS = []; //保存所有插件配置


/*
 * 遍历整个配置
 * */
foreach ( nicen_sync_CONFIG as $key => $value ) {
	$nicen_sync_CONFIGS[ $key ] = get_option( $key );
}

/*
 * 返回指定配置
 * */
function nicen_sync_config( $key = '' ) {
	global $nicen_sync_CONFIGS;
	if ( empty( $key ) ) {
		return $nicen_sync_CONFIGS;
	} else {
		return $nicen_sync_CONFIGS[ $key ];
	}
}
