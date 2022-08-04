/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../lib/swiper/swiper-bundle.min.js


// CUSTOM SCRIPTS


$(document).ready(function () {

    //MOBILE MENU
    const nav = $('nav');
    $('.btn_burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.btn_close, .backdrop').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });

    $('.sub-menu__toggle').click(function (e) {
        $(this).toggleClass('sub-menu__toggle_active')
    });

    // SMOOTH SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            let anchor = $.attr(this, 'href');
            let offsetSize = $("header").innerHeight();

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault()
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - offsetSize
                }, 2000);
                nav.removeClass('open');
                jQuery('.backdrop').fadeOut();
                $('body').removeClass('modal_open');
            }
        })
        let myHash = location.hash;
        location.hash = '';
        let offsetSize = $("header").innerHeight();
        if (myHash[1] != undefined) {
            $('html, body').animate({scrollTop: $(myHash).offset().top - offsetSize}, 1500);
        }

    }

    smoothScrollToAnchor('.menu__link');

    //    HEADER SCROLL
    $(function () {
        const header = $(".header");
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 100) {
                header.addClass('decor');
            } else {
                header.removeClass('decor');
            }
        });
    });

//    SLIDERS
    let howWorkSlider;
    let stepSlider;

    const howWorkSelector = $('.how-work').get(0);
    const stepSelector = $('.step-slider').get(0);

//    HOW-WORK

    function handleResponsive() {
        if ($(window).outerWidth() <= 1024) {
            if (!howWorkSlider && howWorkSelector) {
                howWorkSlider = new Swiper(".how-work", {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    pagination: {
                        el: ".how-work .swiper-pagination",
                    },
                });
            } else {
                if (howWorkSlider) {
                    destroySwiper(howWorkSlider);
                    howWorkSlider = null;
                }
            }
        }
        if ($(window).outerWidth() <= 768) {
            if (!stepSlider && stepSelector) {
                stepSlider = new Swiper(".step-slider", {
                    spaceBetween: 20,
                    slidesPerView: 1,
                    pagination: {
                        el: ".step-slider .swiper-pagination",
                    },
                });
            } else {
                if (stepSlider) {
                    destroySwiper(stepSlider);
                    stepSlider = null;
                }
            }
        }
    }

    handleResponsive();
    let resizeId;


    handleResponsive();

    window.addEventListener('resize', function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(handleResponsive, 500);
    });


    //destroy slider

    function destroySwiper(sliderInstance) {
        if (sliderInstance instanceof Swiper && sliderInstance.initialized) {
            sliderInstance.destroy(true, true);
        }
    }
});

