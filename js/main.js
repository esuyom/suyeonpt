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
      // Swiper가 있는 섹션을 떠날 때 해당 Swiper를 초기화
      resetSwiper(index);
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
        slideChangeTransitionStart: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;

          if (length === 2) {
            isSwiperActive = idx !== 0;
            $.fn.fullpage.setAllowScrolling(idx === 0);
          } else {
            if (idx !== 0 && idx !== length - 1) {
              isSwiperActive = true;
              $.fn.fullpage.setAllowScrolling(false);
            }
          }

          $(".img-box").animate({ scrollTop: 0 }, 500);
        },
        slideChangeTransitionEnd: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;

          if (length === 2) {
            isSwiperActive = idx !== 0;
            $.fn.fullpage.setAllowScrolling(idx === 0);

            // ✅ 마지막 슬라이드에서 다음 섹션으로 넘어가게 처리
            if (idx === length - 1) {
              isSwiperActive = false;
              $.fn.fullpage.setAllowScrolling(true);
            }
          } else {
            if (idx === 0 || idx === length - 1) {
              isSwiperActive = false;
              $.fn.fullpage.setAllowScrolling(true);
            }
          }
        },
        touchStart: function () {
          isSwiperActive = true;
          $.fn.fullpage.setAllowScrolling(false);
        },
        touchEnd: function () {
          const idx = this.activeIndex;
          const length = this.slides.length;

          if (length === 2) {
            isSwiperActive = idx !== 0;
            $.fn.fullpage.setAllowScrolling(idx === 0);

            // ✅ 마지막 슬라이드에서 다음 섹션으로 넘어가게 처리
            if (idx === length - 1) {
              isSwiperActive = false;
              $.fn.fullpage.setAllowScrolling(true);
            }
          } else if (idx === 0 || idx === length - 1) {
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

  // Swiper 리셋 함수
  function resetSwiper(index) {
    setTimeout(() => {
      if (index === 3) swiper.slideTo(0, 0, false);
      if (index === 4) swiper4.slideTo(0, 0, false);
      if (index === 5) swiper5.slideTo(0, 0, false);
    }, 500); // 애니메이션이 끝난 후 리셋되도록 약간의 지연 추가
  }

  // 키보드 이벤트 처리 개선
  $(document).on("keydown", function (e) {
    const activeSection = $(".section.active");
    let activeSwiper = null;

    if (activeSection.hasClass("sec3")) activeSwiper = swiper;
    if (activeSection.hasClass("sec4")) activeSwiper = swiper4;
    if (activeSection.hasClass("sec5")) activeSwiper = swiper5;

    if (activeSwiper) {
      if (e.key === "ArrowRight") {
        if (!activeSwiper.isEnd) {
          activeSwiper.slideNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (!activeSwiper.isBeginning) {
          activeSwiper.slidePrev();
        }
      }
    }
  });

  // 마우스 오버 시 스크롤 방지 개선
  $(".img-box").on("mouseenter", function () {
    $.fn.fullpage.setAllowScrolling(false);
    isSwiperActive = true;

    $(this)
      .css("overflow", "auto")
      .on("scroll mousewheel", function (event) {
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
