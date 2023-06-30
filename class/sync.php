<?php
/**
 * @author 友人a丶
 * @date 2022/8/27
 * 头条多标题
 */

class Nicen_Sync_Zhihu {

	use sync_instance;

	private $mode;//取标题的模式
	private $headers; //请求头

	private function __construct() {

		$cookie = nicen_sync_config( 'nicen_sync_zhihu_cookie' );//cookie

		$this->headers = [
			'Accept'          => 'application/json, text/plain, */*',
			'Accept-Encoding' => 'gzip',
			'Content-type'    => 'application/json',
			'Accept-Language' => 'zh-CN,zh;q=0.9,ja;q=0.8',
			'Connection'      => 'keep-alive',
			'Cookie'          => $cookie,
			'Referer'         => 'https://zhihu.com',
			'User-Agent'      => 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
		];

	}


	/**
	 * @param $id
	 *
	 * @return mixed|string
	 * @throws Exception
	 * 获取知乎笔记
	 */
	public function getNote( $id, $page ) {


		/* 获取书籍详情 */
		$response = wp_remote_get( 'https://www.zhihu.com/api/v3/books/' . $id, [
			'timeout'   => '60',
			'headers'   => $this->headers,
			'sslverify' => false
		] );


		/* 获取请求结果 */
		if ( is_wp_error( $response ) ) {
			throw new \Exception( $response );
		}


		$json = @json_decode( wp_remote_retrieve_body( $response ), true );

		/* 获取生成的标题 */
		if ( isset( $json['error'] ) ) {
			throw new \Exception( $json['error']['message'] );
		}

		if ( ! isset( $json['sku_id'] ) ) {
			throw new \Exception( "书籍信息加载失败！" );
		}


		$start = ( $page - 1 ) * 20;

		/* 获取书籍详情 */
		$response = wp_remote_get( "https://api.zhihu.com/market/annotation_summary/sku/{$json['sku_id']}/chapter?limit=20&offset={$start}", [
			'timeout'   => '60',
			'headers'   => $this->headers,
			'sslverify' => false
		] );

		/* 获取请求结果 */
		if ( is_wp_error( $response ) ) {
			throw new \Exception( $response );
		}

		$json = @json_decode( wp_remote_retrieve_body( $response ), true );

		if ( empty( $json['data'] ) && $page == 1 ) {
			throw new \Exception( "没有找到相关的笔记！" );
		}

		return $json;


	}


}

