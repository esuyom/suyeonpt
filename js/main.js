$(document).ready(function () {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  let activeSwiper = null;
  let isFullpageScrollAllowed = true;
  let triggeredByUserClick = false;

  $("#menu a").on("click", function () {
    triggeredByUserClick = true;
  });

  $("#container").fullpage({
    anchors: ["sec1", "sec3", "sec4", "sec5", "sec6"],
    menu: "#menu",
    scrollingSpeed: 1000,
    onLeave: function (index, nextIndex, direction) {
      if (!isFullpageScrollAllowed && !triggeredByUserClick) {
        return false; // fullpage 스크롤 방지
      }
      resetSwiper(index);
      
    },
    afterLoad: function (anchorLink, index) {
      isFullpageScrollAllowed = true; // 페이지 로드 후 다시 스크롤 허용
      triggeredByUserClick = false; // 사용자 클릭 상태 초기화
      if (index === 1 ){
        $("#menu").fadeOut(300);
      }else{
        $("#menu").fadeIn(300);
      }
    },
  });

  function initSwiper(selector) {
    let swiperInstance = new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 70,
      freeMode: false,
      speed: 1000,
      mousewheel: true,
      on: {
        slideChangeTransitionStart: function () {
          activeSwiper = this;
          const idx = this.activeIndex;
          const length = this.slides.length;

          isFullpageScrollAllowed = false;
          
          setTimeout(() => {
            $(".img-wrap").animate({ scrollTop: 0 }, 500);
          }, 500);

          if (idx === 0) {
            $.fn.fullpage.setAllowScrolling(true);
          } else {
            $.fn.fullpage.setAllowScrolling(false);
          }
        },
        slideChangeTransitionEnd: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;
        
          if (idx === 0 || idx === length - 1) {
            isFullpageScrollAllowed = true;
            $.fn.fullpage.setAllowScrolling(true);
          } else {
            isFullpageScrollAllowed = false;
            $.fn.fullpage.setAllowScrolling(false);
          }
        },        
        touchStart: function () {
          isFullpageScrollAllowed = false;
          $.fn.fullpage.setAllowScrolling(false);
        },
        touchEnd: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;

          if (idx === 0 || idx === length - 1) {
            isFullpageScrollAllowed = true;
            $.fn.fullpage.setAllowScrolling(true);
          }
        },
      },
    });

    return swiperInstance;
  }

  const swiper = initSwiper(".sec3-container");
  const swiper4 = initSwiper(".sec4-container");
  const swiper5 = initSwiper(".sec5-container");

  function resetSwiper(index) {
    if (index === 3) swiper.slideTo(0, 0, false);
    if (index === 4) swiper4.slideTo(0, 0, false);
    if (index === 5) swiper5.slideTo(0, 0, false);
  }

  $(".img-box").on("mouseenter", function () {
    $.fn.fullpage.setAllowScrolling(false);
    isFullpageScrollAllowed = false;

    $(this)
      .children(".img-wrap")
      .css("overflow", "auto")
      .on("scroll mousewheel", function (event) {
        event.stopPropagation();
      });

  });

  $(".img-box").on("mouseleave", function () {
    if (activeSwiper) {
      const idx = activeSwiper.activeIndex;
      const length = activeSwiper.slides.length;

      if (idx === 0 || idx === length - 1) {
        isFullpageScrollAllowed = true;
        $.fn.fullpage.setAllowScrolling(true);
      }

          $(this).children(".img-wrap").css("overflow", "").off("scroll mousewheel");

    }
  });


});
