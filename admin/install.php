<?php
/*
* @author 友人a丶
* @date ${date}
* 插件安装时写入默认配置
*/


/*
 * 初始化默认配置
 * */
function nicen_sync_install() {
	foreach ( nicen_sync_CONFIG as $key => $value ) {
		add_option( $key, $value ); //添加配置参数，和默认值
	}
}

nicen_sync_install(); //插件自动设置




