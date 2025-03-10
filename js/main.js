$(document).ready(function() {
    // fullpage 설정
    $('#container').fullpage({
        anchors: ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6'],
        menu: '#menu',
        scrollingSpeed: 1000,
        onLeave: function() {
            // fullpage에서 빠져나갈 때 스크롤 방지
            $('#container').on('scroll touchmove mousewheel', function(event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            });
            swiper.mousewheel.disable();
            swiper4.mousewheel.disable();
            swiper5.mousewheel.disable();
            
        },
        afterLoad: function() {
            // 전환 후 스크롤 방지 해제
            $('#container').off('scroll touchmove mousewheel');
            if (swiper) swiper.mousewheel.enable();
            if (swiper4) swiper4.mousewheel.enable();
            if (swiper5) swiper5.mousewheel.enable();

            if (!$(".sec3, .sec4, .sec5").hasClass("active")) {
                $.fn.fullpage.setAllowScrolling(true);
            }
        }
    });

    // Swiper 설정 (sec3)
    var swiper = new Swiper('.sec3-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        freeMode: false,
        speed: 1000,
        mousewheel: true,
        on: swiperEvents(swiper)
    });

    // Swiper 설정 (sec4)
    var swiper4 = new Swiper('.sec4-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        freeMode: false,
        speed: 1000,
        mousewheel: true,
        on: swiperEvents(swiper4)
    });

    // Swiper 설정 (sec5)
    var swiper5 = new Swiper('.sec5-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        freeMode: false,
        speed: 1000,
        mousewheel: true,
        on: swiperEvents(swiper5)
    });

    // Swiper 이벤트 핸들러 공통 함수
    function swiperEvents(currentSwiper) {
        return {
            slideChange: function() {
                var idx = currentSwiper.activeIndex;
                var length = currentSwiper.slides.length;

                if (idx !== 0 && idx !== length - 1) {
                    $.fn.fullpage.setAllowScrolling(false);
                }
            },
            slideChangeTransitionEnd: function() {
                var idx = currentSwiper.activeIndex;
                var length = currentSwiper.slides.length;

                if (idx === 0 || idx === length - 1) {
                    $.fn.fullpage.setAllowScrolling(true);
                }
            },
            touchStart: function(e) {
                this.startY = e.touches[0].clientY;
            },
            touchEnd: function(e) {
                var endY = e.changedTouches[0].clientY;
                if (this.startY - 10 > endY) {
                    this.slideNext();
                } else if (this.startY + 10 < endY) {
                    this.slidePrev();
                }
                
            }
        };
    }

    // 키보드 이벤트로 슬라이드 전환
    $(document).on('keydown', function(e) {
        // KeyDown 이벤트를 처리할 때, 스와이퍼에 대해 개별적으로 동작하도록 설정
        if (e.key === 'ArrowRight') {
            // 현재 섹션에 해당하는 swiper 인스턴스만 이동
            if ($('.sec3').hasClass('active')) {
                swiper.slideNext();
            } else if ($('.sec4').hasClass('active')) {
                swiper4.slideNext();
            } else if ($('.sec5').hasClass('active')) {
                swiper5.slideNext();
            }
        } else if (e.key === 'ArrowLeft') {
            // 현재 섹션에 해당하는 swiper 인스턴스만 이동
            if ($('.sec3').hasClass('active')) {
                swiper.slidePrev();
            } else if ($('.sec4').hasClass('active')) {
                swiper4.slidePrev();
            } else if ($('.sec5').hasClass('active')) {
                swiper5.slidePrev();
            }
        }
    });

    // img-box에 마우스가 올라가면 fullpage.js 및 Swiper 비활성화, 기본 스크롤 허용
    $('.img-box').on('mouseenter', function() {
        $.fn.fullpage.setAllowScrolling(false);
        swiper.mousewheel.disable();
        swiper4.mousewheel.disable();
        swiper5.mousewheel.disable();

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
        swiper4.mousewheel.enable();
        swiper5.mousewheel.enable();

        // 원래 overflow 설정으로 복귀
        $(this).css('overflow', '');

        // 이벤트 핸들러 제거
        $(this).off('scroll mousewheel');
    });
});
