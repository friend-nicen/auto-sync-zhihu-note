/*
* @author 友人a丶
* @date 2022-08-12
* 弹出层
* */


/*
* 配置antd
* */
let message = antd.message;
let Modal = antd.Modal;

message.config({
    top: `50px`,
    duration: 3,
    maxCount: 3,
});

let hide = 0; //弹出的个数
let key = "loading"; //弹窗的key值
let close = null; //关闭的回调

let load = {

    loading(text = '加载中...') {
        close = message.loading({
            content: text,
            key: key,
            duration: 0
        })
        hide++;
    },
    loaded() {
        if (hide > 0) {
            hide--;
            if (hide == 0 && !!close) close();
        } else {
            if (!!close) close();
        }
    },
    success(text = '加载成功！') {
        message.success(text);
    },
    error(text = '加载异常') {
        message.error(text);
    },
    info(text = '加载异常') {
        message.info(text);
    },
    confirm(text, callback = null, cancel = null) {
        Modal.confirm({
            title: '提示',
            centered: true,
            content: text,
            maskClosable: false,
            onOk: (close) => {
                close(); //关闭
                if (callback) {
                    callback()
                }
            }, onCancel: (close) => {
                close(); //关闭
                if (cancel) {
                    cancel()
                }
            }
        })
    }
}
