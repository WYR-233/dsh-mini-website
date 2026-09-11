// dsh-mini 官网交互脚本
(function () {
  // 移动端汉堡菜单
  var burger = document.getElementById('navBurger');
  var mobile = document.getElementById('navMobile');
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      mobile.classList.toggle('open');
    });
  }

  // 滚动淡入(IntersectionObserver,轻量)
  if ('IntersectionObserver' in window) {
    var items = document.querySelectorAll('.feature-card, .gallery-item');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.feature-card, .gallery-item').forEach(function (el) {
      el.style.opacity = '1';
    });
  }
})();
