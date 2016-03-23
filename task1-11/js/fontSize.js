//动态设置html的字体大小，默认html{font-size:50px}
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth; html.style.fontSize = windowWidth / 7.5 + 'px';
        //等价于html.style.fontSize = windowWidth / 720 * 100 + 'px';
        //同理可设6.4为640对应的情况
    }, false);
})();