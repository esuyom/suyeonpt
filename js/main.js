$(document).ready(function () {
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
      }

    // fullpage
    $("#fullpage").fullpage({
      anchors: ["sec1", "sec2", "sec3", "sec4", "sec5", "sec6"],
      menu: "#menu",
      scrollingSpeed: 1000,
      // scrollBar: true,
      onLeave: function (origin, destination, direction) {
        // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
        $("#fullpage").on("scroll touchmove mousewheel", function (event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
        swiper.mousewheel.disable();
        setTimeout(() => {
            swiper.slideTo(0);
        }, 500);
      },
      afterLoad: function (anchorLink, index) {
        // 전환이 끝난후 이벤트풀기
        $("#fullpage").off("scroll mousewheel");
        if (!$(".fp-completely .swiper-wrapper").length > 0)
          $("#fullpage").off("touchmove"); // 모바일분기
        if (swiper) swiper.mousewheel.enable();
        if (!$(".sec5").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
      }
    });
  
    // swiper
    var length = $(".sec5 .swiper-slide").length;
    var startY = 0;
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 100,
      freeMode: false,
      speed: 1000,
      mousewheel: true,
      on: {
        slideChange: function () {
          var idx = this.activeIndex;
          // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
          if (this.activeIndex != 0 && idx != length)
            $.fn.fullpage.setAllowScrolling(false);
          if (length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false); //슬라이드가 2개밖에 없을때
          // console.log('즉시 : ' + idx);
        },
        slideChangeTransitionEnd: function () {
          var idx = this.activeIndex;
          // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
          if (idx == 0 || idx >= length - 1)
            $.fn.fullpage.setAllowScrolling(true);
          // console.log('전환후 : ' + idx);
        },
        touchStart: function (e) {
          startY = e.touches.startY;
        },
        touchEnd: function (e) {
          if (startY - 10 > e.touches.currentY) {
            swiper.slideNext();
          } else if (startY + 10 < e.touches.currentY) {
            swiper.slidePrev();
          }
          console.log(startY, e.touches.currentY);
        }
        /*
        touchMove: function(e) {       
          var startY = e.touches.startY;
          setTimeout(function(){
            if(startY > e.touches.currentY) swiper.slideNext();  
            else swiper.slidePrev();
          },100);        
        },
        */
      }
    });
  
    $(document).on("keydown", function (e) {
      if (e.key === "ArrowRight") {
        swiper.slideNext(); // 오른쪽 화살표: 다음 슬라이드
      } else if (e.key === "ArrowLeft") {
        swiper.slidePrev(); // 왼쪽 화살표: 이전 슬라이드
      }
    });

    // img-box에 마우스가 올라가면 fullpage.js 및 Swiper 비활성화, 기본 스크롤 허용
  $('.img-box').on('mouseenter', function() {
    $.fn.fullpage.setAllowScrolling(false);
    swiper.mousewheel.disable();
    // 내부 스크롤 허용을 위해 overflow 설정
    $(this).css('overflow', 'auto');

    // img-box 안에서 스크롤 이벤트가 발생하면 fullpage에 영향을 주지 않도록 처리
    $(this).on('scroll mousewheel', function(event) {
        event.stopPropagation();
    });
});

// img-box에서 마우스가 떠나면 fullpage.js 및 Swiper 다시 활성화
$('.img-box').on('mouseleave', function() {
    $.fn.fullpage.setAllowScrolling(true);
    swiper.mousewheel.enable();
    // 원래 overflow 설정으로 복귀
    $(this).css('overflow', '');

    // 이벤트 핸들러 제거
    $(this).off('scroll mousewheel');
});

  });
  