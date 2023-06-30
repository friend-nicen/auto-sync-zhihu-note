(function () {

    /*
    * 警告文字块
    * ed.selection.setContent("6666666666");
    * ed.selection.select(ed.getBody(), true);
    * */
    tinymce.create('tinymce.plugins.zhihu', {
        init: function (ed, url) {


            const $ = jQuery; //jq

            /**
             * 防止内存泄漏
             */
            $.fn.removeWithLeakage = function () {
                this.each(function (i, e) {
                    $("*", e).add([e]).each(function () {
                        $.event.remove(this);
                        $.removeData(this);
                    });
                    if (e.parentNode)
                        e.parentNode.removeChild(e);
                });
            };

            /*
            * 替换编辑器内容
            * */
            function replaceC(content) {
                ed.setContent(content);
            }


            /*
            * 新增插件
            * */
            ed.addButton('zhihu', {
                title: 'zhihu',
                image: url + '/icon/zhihu.svg',
                onclick: async function () {


                    layer.prompt({title: "输入需要同步的书籍ID："}, async function (post_id, index) {

                        if (!post_id || !/\d+/.test(post_id)) {
                            load.error("请输入正确的书籍ID");
                            return;
                        }

                        /* 显示加载效果 */
                        load.loading("加载中...");

                        try {


                            let page = 1; //第几页
                            const data = []; //数据

                            while (true) {

                                /* 开始请求 */
                                let code = await new Promise(resolve => {

                                    axios.get(`/?nicen_sync_zhihu=1&id=${post_id}&private=${POST_ZHIHU_KEY}&timestamp=${(new Date()).getTime()}&page=${page}`).then((res) => {

                                        if (res.data.code) {


                                            const json = res.data.data; //数据

                                            data.push(...json['data']); //追加数据

                                            if (json.paging.is_end) {
                                                resolve(2);
                                                return;
                                            }

                                            resolve(1);


                                        } else {
                                            /* 弹出错误原因 */
                                            load.error(res.data.errMsg);
                                            resolve(0);
                                        }
                                    }).catch((e) => {
                                        /* 弹出错误原因 */
                                        load.error(e.message);
                                    })

                                });

                                /* 异常退出 */
                                if (code === 0) {
                                    /* 关闭加载效果 */
                                    load.loaded();
                                    return;

                                    /* 结束 */
                                } else if (code === 2) {
                                    break;
                                }


                                page++;

                            }


                            /* 关闭加载效果 */
                            load.loaded();


                            /**
                             * 规整
                             */
                            const notes = [];
                            let title = '';
                            let post_title = "";


                            /* 规整类型 */
                            for (let i of data) {

                                if (title != i.section_title) {

                                    post_title = i.sku_name; //书籍名称

                                    notes.push({
                                        title: i.section_title,
                                        note: []
                                    }); //新建数组
                                    title = i.section_title;  //记录章节标题
                                }
                                notes[notes.length - 1].note.push(i.content);
                            }


                            /* 替换内容 */

                            let html = `<p>[success title="摘录声明"]文章内容由程序自动从本人阅读 <a href="https://www.zhihu.com/pub/book/${post_id}" target="_blank" rel="noopener">《${post_title}》</a> 过程中，所记录的知乎笔记同步而来，如有侵权请在下方留言告知！[/success]</p>`;

                            let k = 1; //计数器

                            for (let i of notes) {

                                /* 替换数字序号 */
                                i.title = i.title.replace(/^[\d\s]+/i, "");

                                html += `<p>[h2]${k}. ${i.title}[/h2]</p>`; //记录标题


                                for (let j of i.note) {

                                    html += `<p>• ${j}</p>`; //记录标题

                                }

                                k++;
                            }

                            /* 设置文章内容 */
                            replaceC(html);
                            /* 设置文章标题 */
                            $("#title").val(`读《${post_title}》，相关笔记，持续记录`);

                            layer.close(index);

                        } catch (e) {
                            console.log(e)
                            load.error(e);
                        }
                    })
                }
            });
        },
        createControl: function (n, cm) {
            return null;
        },
    });


    tinymce.PluginManager.add('zhihu', tinymce.plugins.zhihu);
})();