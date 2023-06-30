<?php
/*
* @author 友人a丶
* @date ${date}
* 外部图片下载
*/


/*
 * 链接提交
 * */

class NicenSyncResponse {

	private static $self;
	private $private;

	private function __construct() {
		$this->private = get_option( "nicen_sync_plugin_private" );
	}

	/**
	 * 接收响应
	 * */
	public function response() {


		global $table_prefix; //获取数据表前缀

		/*
		 * 接手响应
		 * */

		try {


			/**
			 * 开始本地化
			 * */
			if ( isset( $_GET['nicen_sync_zhihu'] ) && isset( $_GET['id'] ) && isset( $_GET['page'] ) ) {

				$this->auth(); //权限验证
				$ID = sanitize_text_field( $_GET['id'] ); //文章ID


				$note = ( Nicen_Sync_Zhihu::getInstance() )->getNote( $ID, $_GET['page'] );
				

				/*
				 * 返回结果
				 * */
				exit( json_encode( [
					'code'   => 1,
					'data'   => $note,
					'errMsg' => "ok"
				] ) );

			}


		} catch ( \Throwable $e ) {
			exit( json_encode( [
				'code'   => 0,
				'errMsg' => $e->getMessage()
			] ) );
		}


	}

	/**
	 * 验证接口权限
	 * */
	public function auth() {

		if ( empty( $_GET['private'] ) && empty( $_POST['private'] ) ) {
			exit( json_encode( [
				'code'   => 0,
				'errMsg' => "密钥为空"
			] ) );
		}

		if ( ( $_GET['private'] ?? "" ) != $this->private && ( $_POST['private'] ?? "" ) != $this->private ) {
			exit( json_encode( [
				'code'   => 0,
				'errMsg' => "密钥有误"
			] ) );
		}
	}

	/**
	 * 获取单例
	 * */
	public static function getInstance() {
		/*如果实例不存在*/
		if ( ! self::$self ) {
			self::$self = new self();
		}

		return self::$self;
	}


}


( NicenSyncResponse::getInstance() )->response(); //接收请求