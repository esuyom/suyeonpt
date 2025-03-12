$(document).ready(function () {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  let isSwiperActive = false;

  // fullpage 설정
  $("#container").fullpage({
    anchors: ["sec1", "sec2", "sec3", "sec4", "sec5", "sec6"],
    menu: "#menu",
    scrollingSpeed: 1000,
    onLeave: function (index, nextIndex, direction) {
      if (!isSwiperActive) {
        $.fn.fullpage.setAllowScrolling(true);
      }
      
      $(".img-box").animate({ scrollTop: 0 }, 1000);
    },
    afterLoad: function (anchorLink, index) {
      if (!isSwiperActive) {
        $.fn.fullpage.setAllowScrolling(true);
      }
    },
  });

  // Swiper 설정 함수
  function initSwiper(selector) {
    return new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 70,
      freeMode: false,
      speed: 1000,
      mousewheel: true,
      on: {
        slideChange: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;

          // 중간 슬라이드일 때 fullpage 스크롤 비활성화
          if (idx !== 0 && idx !== length - 1) {
            $.fn.fullpage.setAllowScrolling(false);
            isSwiperActive = true;
          }
          
          $(".img-box").animate({ scrollTop: 0 }, 1000);
        },
        slideChangeTransitionEnd: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;

          // 첫 번째나 마지막 슬라이드일 때만 fullpage 스크롤 활성화
          if (idx === 0 || idx === length - 1) {
            $.fn.fullpage.setAllowScrolling(true);
            isSwiperActive = false;
          }
          
        },
        touchStart: function () {
          isSwiperActive = true;
          $.fn.fullpage.setAllowScrolling(false);
        },
        touchEnd: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;

          // 첫 번째나 마지막 슬라이드일 때만 상태 변경 허용
          if (idx === 0 || idx === length - 1) {
            isSwiperActive = false;
            $.fn.fullpage.setAllowScrolling(true);
          }
        },
      },
    });
  }

  // Swiper 인스턴스 생성
  const swiper = initSwiper(".sec3-container");
  const swiper4 = initSwiper(".sec4-container");
  const swiper5 = initSwiper(".sec5-container");

  // 키보드 이벤트 처리 개선
  $(document).on("keydown", function (e) {
    if (isSwiperActive) return;

    const activeSection = $(".section.active");
    let activeSwiper = null;

    if (activeSection.hasClass("sec3")) activeSwiper = swiper;
    if (activeSection.hasClass("sec4")) activeSwiper = swiper4;
    if (activeSection.hasClass("sec5")) activeSwiper = swiper5;

    if (activeSwiper) {
      if (e.key === "ArrowRight") {
        activeSwiper.slideNext();
      } else if (e.key === "ArrowLeft") {
        activeSwiper.slidePrev();
      }
    }
  });

  // 마우스 오버 시 스크롤 방지 개선
  $(".img-box").on("mouseenter", function () {
    $.fn.fullpage.setAllowScrolling(false);
    isSwiperActive = true;

    $(this).css("overflow", "auto").on("scroll mousewheel", function (event) {
      event.stopPropagation();
    });
  });

  // 마우스가 떠났을 때 상태를 제대로 처리
  $(".img-box").on("mouseleave", function () {
    const activeSection = $(".section.active");
    let activeSwiper = null;

    if (activeSection.hasClass("sec3")) activeSwiper = swiper;
    if (activeSection.hasClass("sec4")) activeSwiper = swiper4;
    if (activeSection.hasClass("sec5")) activeSwiper = swiper5;

    // Swiper 인덱스가 0 또는 마지막일 때만 fullpage 스크롤 활성화
    if (activeSwiper) {
      const idx = activeSwiper.activeIndex;
      const length = activeSwiper.slides.length;

      if (idx === 0 || idx === length - 1) {
        isSwiperActive = false;
        $.fn.fullpage.setAllowScrolling(true);
      }
    }

    $(this).css("overflow", "").off("scroll mousewheel");
  });
});
