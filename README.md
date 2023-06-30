闲来无事的时候喜欢看会书，知乎是平常用的较多的一个自带书城的软件，所以平常看电子书都是用知乎。

知乎的书籍在阅读过程中，可以直接选中某些内容作为笔记。看完一本书之后，很多时候都是靠笔记来回顾整本书的知识点，但是知乎的笔记查询起来，极不方便，再加上平常习惯用Wordpress做笔记，所以就有了将知乎笔记导出的想法。

在对知乎APP进行抓包分析需求的可行性的时候，发现整个需求完全可以实现，于是有了auto-sync-zhihu-note这个插件。

# auto-sync-zhihu-note

## 1. 简介

一款可以自动同步知乎书城，指定书籍的读书笔记到Wordpress文章的简易插件

Gitee：[https://gitee.com/friend-nicen/auto-sync-zhihu-note](https://gitee.com/friend-nicen/auto-sync-zhihu-note)

Github：[https://github.com/friend-nicen/auto-sync-zhihu-note](https://github.com/friend-nicen/auto-sync-zhihu-note)

## 2. 演示

![alt 演示](https://nicen.cn/collect/zhihu.gif "演示")

## 3. 使用方法

使用之前，需要手动设置知乎的Cookie，步骤如下：

打开知乎 [https://www.zhihu.com/hot](https://www.zhihu.com/hot)，按下F12。点击下图所示的位置：

![alt 演示](https://nicen.cn/wp-content/uploads/replace/2023/06/30/8eb6f22c335f4a69dc93d49effcd11e5.png "演示")

打开Wordpress插件设置，将复制好的cookie填写并保存：

![alt 演示](https://nicen.cn/wp-content/uploads/replace/2023/06/30/7d94950cd97714d2f98987bced3b120f.png "演示")

大功告成！插件已经可以正常使用了！下面去复制一个有笔记的书籍ID：

![alt 演示](https://nicen.cn/wp-content/uploads/replace/2023/06/30/93062a0dc06702e1fbd2fc9914fb1645.png "演示")

开始使用，填写书籍ID，等待同步完毕。

![alt 演示](https://nicen.cn/wp-content/uploads/replace/2023/06/30/88248f0c158054c517d1dc21b0973f81.png "演示")