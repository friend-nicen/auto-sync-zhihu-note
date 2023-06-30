<?php

/*
* @author 友人a丶
* @date 2022/8/27
* 表单自定义的渲染函数
*/


/**
 * 文章批量本地化
 */
function nicen_sync_form_batch() {


	echo '	<a-form-item :label-col="labelCol" label="功能说明">
	<div style="line-height: 1.8; width: 150%; overflow-wrap: break-word; word-spacing: normal; word-break: break-all;">
	点击开始，将自动通过内容为所有草稿生成标题！<a @click="toutiaoTest" style="color: #1890ff">测试</a>
	</div>
		</a-form-item>';


	echo '<a-form-item :label-col="labelCol" label="相关操作">';
	echo '<a-space>
			<a-button type="primary" :loading="batch.loading" @click="getBatch">{{batch.loading?"正在批量生成标题，点击取消运行...":"开始生成标题"}}</a-button>
			<a-button type="primary" v-if="batch.loading" @click="getBatch">取消运行</a-button>
		</a-space>';
	echo '</a-form-item>';

}


/**
 * ChatGPT测试
 */
function nicen_sync_form_test() {


	echo '<a-form-item :label-col="labelCol" label="相关操作">';
	echo '<a-space>
			<a-button type="primary" :loading="gpt.loading" @click="ChatGPT">测试运行</a-button>
		</a-space>';
	echo '</a-form-item>';
}


/**
 * @return void
 * 批量设置
 */
function nicen_sync_forms_answer() {

	/*
	 * 注册字段
	 * */
	echo '<input name="nicen_sync_param_answer" v-model="data.nicen_sync_param_answer" hidden/>';
	echo '<a-form-item :label-col="labelCol" label="预设的问题">';
	echo '<div class="column-textarea">
			<template v-for="(item,index) of answers">
				<div class="line" :key="item.value">
					  <a-textarea v-model="answers[index].label" :auto-size="{minRows: 6,maxRows:6}"></a-textarea>
					  <a class="delete" v-if="index>0" @click.prevent="deleteAnswer(index)">X</a>
				</div>	
			</template>
		 </div>';
	echo '</a-form-item>';


	echo '<a-form-item :label-col="labelCol" label="相关操作">';
	echo '<a-space>
			<a-button type="primary" @click="addAnswer">新增问题</a-button>
		</a-space>';
	echo '</a-form-item>';
}