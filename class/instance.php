<?php

/*
* @author 友人a丶
* @date 2023/6/13
* 说明
*/

trait sync_instance {

	private static $self;

	/**
	 * 获取单例
	 * */
	public static function getInstance() {
		/*如果实例不存在*/
		if ( ! self::$self ) {
			self::$self = new static();
		}

		return self::$self;
	}
}