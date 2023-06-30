<?php
/*
 * @author 友人a丶
 *
 * 将config配置的后台元素输出成表单元素
 * 初始化config内的所有配置
*/

/*
 * 注册菜单
 * */
function nicen_sync_menu_register() {
	foreach ( PLUGIN_nicen_sync as $item ) {
		add_menu_page(
			$item['page_title'],
			$item['menu_title'],
			$item['capablity'],
			$item['id'],
			$item['callback']
		);
	}
}

add_action( 'admin_menu', 'nicen_sync_menu_register' );


/*
 * 注册表单
 * */
function nicen_sync_config_register() {

	/* 自定义注册 */
	register_setting( 'nicen_sync_plugin', 'nicen_sync_param_answer' ); //问题


	foreach ( PLUGIN_nicen_sync as $item ) {
		/*
		 * 如果有分节
		 * */
		if ( isset( $item['sections'] ) ) {

			foreach ( $item['sections'] as $section ) {

				/*
				 * 循环注册分节
				 * */
				add_settings_section(
					$section['id'],
					$section['title'],
					function () use ( $section ) {
						return $section['callback'] ?? [];
					},
					$item['id']
				);

				/*
				 * 如果有字段
				 * */
				if ( isset( $section['fields'] ) ) {

					foreach ( $section['fields'] as $field ) {

						/*
						 * 注册字段
						 * */
						register_setting( $item['id'], $field['id'] ); //主题首页副标题

						/*
						 * 添加字段
						 * */
						add_settings_field(
							$field['id'],
							$field['title'],
							$field['callback'],
							$item['id'],
							$section['id'],
							$field['args'] ?? []
						);
					}
				}
			}
		}
	}
}


/*
 * 初始化主题设置
 * */
add_action( 'admin_init', 'nicen_sync_config_register' );
