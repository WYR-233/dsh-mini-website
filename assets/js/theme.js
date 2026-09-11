/* 亮色/暗色主题开关(深海工坊 2.0)
   - data-theme 由 <head> 里的防闪脚本先定好,这里管按钮图标、手动切换与跟随系统
   - 用事件委托监听,不依赖绑定时机 */
(function () {
    function sysTheme() {
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
    }
    function readSaved() {
        try { return localStorage.getItem('wm-theme'); } catch (e) { return null; }
    }
    function paint(t) {
        document.documentElement.dataset.theme = t;
        document.querySelectorAll('.js-theme').forEach(function (b) {
            b.textContent = (t === 'light') ? '☀️' : '🌙';
        });
        var m = document.querySelector('meta[name="theme-color"]');
        if (m) m.setAttribute('content', (t === 'light') ? '#eef4fa' : '#081120');
    }
    paint(document.documentElement.dataset.theme || sysTheme());

    document.addEventListener('click', function (e) {
        var b = e.target && e.target.closest ? e.target.closest('.js-theme') : null;
        if (!b) return;
        var next = (document.documentElement.dataset.theme === 'light') ? 'dark' : 'light';
        try { localStorage.setItem('wm-theme', next); } catch (err) { }
        paint(next);
    });

    try {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function () {
            var s = readSaved();
            if (s !== 'light' && s !== 'dark') paint(sysTheme());
        });
    } catch (e) { }
})();
