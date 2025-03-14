$(document).ready(function () {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  let isSwiperActive = false;

  // fullpage 설정
  $("#container").fullpage({
    anchors: ["sec1", "sec3", "sec4", "sec5", "sec6"],
    menu: "#menu",
    scrollingSpeed: 1000,
    onLeave: function (index, nextIndex, direction) {
      if (!isSwiperActive) {
        $.fn.fullpage.setAllowScrolling(true);
      }
      resetSwiper(index);
    },
    afterLoad: function (anchorLink, index) {
      if (!isSwiperActive) {
        $.fn.fullpage.setAllowScrolling(true);
      }
    },
  });

  // Swiper 설정 함수
  function initSwiper(selector, length) {
    return new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 70,
      freeMode: false,
      speed: 1000,
      mousewheel: true,
      on: {
        slideChangeTransitionStart: function () {
          const idx = this.activeIndex;

          if (length === 2) {
            // 🔥 Swiper4, Swiper5 인덱스 개수가 2개일 경우 처리
            if (idx === 0) {
              isSwiperActive = false;
              $.fn.fullpage.setAllowScrolling(true);
            } else {
              isSwiperActive = true;
              $.fn.fullpage.setAllowScrolling(false);
            }
          } else {
            // 일반 Swiper 처리
            if (idx === 0 || idx === length - 1) {
              isSwiperActive = false;
              $.fn.fullpage.setAllowScrolling(true);
            } else {
              isSwiperActive = true;
              $.fn.fullpage.setAllowScrolling(false);
            }
          }
        },
        slideChangeTransitionEnd: function () {
          const idx = this.activeIndex;

          if (length === 2) {
            // 🔥 마지막 슬라이드에서 아래로 스크롤 시 fullpage 실행
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

          if (length === 2) {
            // ✅ 마지막 슬라이드에서 아래로 스크롤 시 fullpage 실행
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
  const swiper = initSwiper(".sec3-container", 5);
  const swiper4 = initSwiper(".sec4-container", 2);
  const swiper5 = initSwiper(".sec5-container", 2);

  // Swiper 리셋 함수
  function resetSwiper(index) {
    setTimeout(() => {
      if (index === 3) swiper.slideTo(0, 0, false);
      if (index === 4) swiper4.slideTo(0, 0, false);
      if (index === 5) swiper5.slideTo(0, 0, false);
    }, 500);
  }

  // 키보드 이벤트 처리
  $(document).on("keydown", function (e) {
    const activeSection = $(".section.active");
    let activeSwiper = null;

    if (activeSection.hasClass("sec3")) activeSwiper = swiper;
    if (activeSection.hasClass("sec4")) activeSwiper = swiper4;
    if (activeSection.hasClass("sec5")) activeSwiper = swiper5;

    if (activeSwiper) {
      if (e.key === "ArrowRight" && !activeSwiper.isEnd) {
        activeSwiper.slideNext();
      } else if (e.key === "ArrowLeft" && !activeSwiper.isBeginning) {
        activeSwiper.slidePrev();
      }
    }
  });

  // 마우스 오버 시 스크롤 방지
  $(".img-box").on("mouseenter", function () {
    $.fn.fullpage.setAllowScrolling(false);
    isSwiperActive = true;

    $(this)
      .children(".img-wrap")
      .css("overflow", "auto")
      .on("scroll mousewheel", function (event) {
        event.stopPropagation();
      });
  });

  // 마우스가 떠났을 때 상태 처리
  $(".img-box").on("mouseleave", function () {
    const activeSection = $(".section.active");
    let activeSwiper = null;

    if (activeSection.hasClass("sec3")) activeSwiper = swiper;
    if (activeSection.hasClass("sec4")) activeSwiper = swiper4;
    if (activeSection.hasClass("sec5")) activeSwiper = swiper5;

    if (activeSwiper) {
      const idx = activeSwiper.activeIndex;
      const length = activeSwiper.slides.length;

      if (length === 2) {
        // 🔥 Swiper4, Swiper5에서 마지막 인덱스 처리
        if (idx === length - 1) {
          isSwiperActive = false;
          $.fn.fullpage.setAllowScrolling(true);
        } else {
          isSwiperActive = true;
          $.fn.fullpage.setAllowScrolling(false);
        }
      } else {
        if (idx === 0 || idx === length - 1) {
          isSwiperActive = false;
          $.fn.fullpage.setAllowScrolling(true);
        }
      }
    }

    $(this).children(".img-wrap").css("overflow", "").off("scroll mousewheel");
  });
});
