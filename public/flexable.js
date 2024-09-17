(function (d, c) {
    var e = d.documentElement,
        b = "orientationchange" in window ? "orientationchange" : "resize",
        a = function () {
            var f = e.clientWidth;
            if (!f) {
                return;
            }
            if (
                !/Android|webOS|iPhone|iPod|BlackBerry|SymbianOS|Windows Phone/i.test(
                    navigator.userAgent
                )
            ) {
                // PC端不设置，保持默认字体大小
                return;
            }
            e.style.fontSize = (f / 414) * 12 + "px";
        };
    if (!d.addEventListener) {
        return;
    }
    c.addEventListener(b, a, false);
    d.addEventListener("DOMContentLoaded", a, false);
})(document, window);