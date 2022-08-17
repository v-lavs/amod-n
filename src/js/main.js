/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../lib/swiper/swiper-bundle.min.js


// CUSTOM SCRIPTS


//destroy slider

function destroySwiper(sliderInstance) {
    if (sliderInstance && sliderInstance instanceof Swiper && sliderInstance.initialized) {
        sliderInstance.destroy(true, true);
    }
}


$(document).ready(function () {
    //MOBILE MENU
    const nav = $('nav');
    $('.btn_burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
        $('.btn_close').show();
    });

    $('.btn_close, .menu__link, .backdrop').click(function (e) {
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
        $('.btn_close').hide();
    });

    $('.sub-menu__toggle').click(function (e) {
        $(this).toggleClass('sub-menu__toggle_active')
    });

// // SMOOTH SCROLL TO ANCHOR
    let smoothScroll = location.hash;
    let offsetSize = $("header").innerHeight();
    location.hash = '';
    if (smoothScroll[1] != undefined) {
        $('html, body').animate({scrollTop: $(smoothScroll).offset().top - offsetSize}, 1500);
    }
    ;

    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                let target = $(this.hash);
                target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - offsetSize
                    }, 2000, function () {
                        let $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex', '-1');
                            $target.focus();
                        }
                        ;
                    });
                }
            }
        });

    //    HEADER SCROLL
    const header = $(".header");
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 100) {
            header.addClass('decor');
        } else {
            header.removeClass('decor');
        }
    });

    //ACCORDION
    function handleAccordion(selector) {
        const firstAcc = $(selector + ' ' + '.panel__heading').get(0);

        $(selector + ' ' + '.panel__heading').on('click', function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).siblings('.panel-collapse').slideUp(500);
                $(selector + ' ' + '.panel__heading .open-panel').removeClass('open-panel').addClass('open-panel');
            } else {
                $(selector + ' ' + '.panel__heading .open-panel').removeClass('open-panel').addClass('open-panel');
                $(this).find('open-panel').removeClass('open-panel').addClass('open-panel');
                $(selector + ' ' + '.panel__heading').removeClass('open');
                $(this).addClass('open');
                $(selector + ' ' + '.panel-collapse').slideUp(500);
                $(this).siblings('.panel-collapse').slideDown(500)
            }
        });
    }

    handleAccordion('#accordion1');
    handleAccordion('#accordion2');


//    SLIDERS
    let howWorkSlider;
    let stepSlider;
    let opportunitiesSlider;
    let aboutSlider;
    let introSpecSlider;

    const howWorkSelector = $('.how-work').get(0);
    const stepSelector = $('.step-slider').get(0);
    const opportunitiesSelector = $('.opportunities-slider').get(0);
    const aboutSelector = $('.about-slider').get(0);
    const introSpecSliderSelector = $('.specialist-intro__slider-wrap').get(0);

    function handleResponsive() {

        if ($(window).outerWidth() <= 1160) {
            if (!aboutSlider && aboutSelector) {
                aboutSlider = new Swiper(".about-slider", {
                    spaceBetween: 20,
                    slidesPerView: 1,
                    pagination: {
                        el: ".wrap-slider .swiper-pagination",
                    },
                });
            }
        } else {
            destroySwiper(aboutSlider);
            aboutSlider = null;
        }

        if ($(window).outerWidth() <= 1024) {
            if (!howWorkSlider && howWorkSelector) {
                howWorkSlider = new Swiper(".how-work", {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: ".how-work .swiper-pagination",
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: "auto",
                            spaceBetween: 20,
                        }
                    }
                });
            }
        } else {
            destroySwiper(howWorkSlider);
            howWorkSlider = null;
        }

        if ($(window).outerWidth() <= 992) {
            if (!introSpecSlider && introSpecSliderSelector) {
                introSpecSlider = new Swiper(".specialist-intro__slider-wrap", {
                    spaceBetween: 20,
                    slidesPerView: 1,
                    clickable: true,
                    pagination: {
                        el: ".specialist-intro__slider-wrap .swiper-pagination",
                    },
                });
            }
        } else {
            destroySwiper(introSpecSlider);
            introSpecSlider = null;
        }

        if ($(window).outerWidth() <= 767) {
            if (!stepSlider && stepSelector) {
                stepSlider = new Swiper(".step-slider", {
                    spaceBetween: 20,
                    slidesPerView: 1,
                    pagination: {
                        el: ".step-slider .swiper-pagination",
                    },
                });
            }

            if (!opportunitiesSlider && opportunitiesSelector) {
                opportunitiesSlider = new Swiper(".opportunities-slider", {
                    spaceBetween: 20,
                    slidesPerView: 1,
                    pagination: {
                        el: ".opportunities-slider .swiper-pagination",
                    },
                });
            }


        } else {
            destroySwiper(stepSlider);
            stepSlider = null;

            destroySwiper(opportunitiesSlider);
            opportunitiesSlider = null;

        }
    }


    let resizeId;

    handleResponsive();

    $(window).on('resize', () => {
        clearTimeout(resizeId);
        resizeId = setTimeout(() => handleResponsive(), 300);
    });

    // Flipping cards
    $('.specialist-intro__slider-btn').click(function (e) {
        e.preventDefault();
        const parent = $(this).parents('.flip-card');
        $(parent).toggleClass('flip-card_active');
    });



    // Popover
    $('.popover__close').click(function (e) {
        e.preventDefault();
        $(this).parents('.popover').removeClass('active');
    })

    $('.trigger-popover, .steps-list__thumb').click(function (e) {
        e.preventDefault();

        const $parent = $(this).closest('.steps-list__item');
        const target = !$(this).hasClass('trigger-popover') ?$parent.find('.trigger-popover').get(0) : this;
        const popover = $parent.find('.popover');

        $('.popover').removeClass('active right left');
        popover.addClass('active');

        if (popover.hasClass('active')) {
            const btnData = $(target).get(0).getBoundingClientRect();
            const margin = 5;
            const popoverWidth = popover.outerWidth();
            const windowW = $(window).width();

            const isRight = windowW - btnData.x - btnData.width - margin;
            const isLeft = btnData.x - margin;
            const top = btnData.height + 10;

            if (isRight > popoverWidth) {
                popover.css({left: btnData.width + margin, top: top});
                popover.addClass('left')
            } else if (isLeft > popoverWidth) {
                popover.css({left: -(popoverWidth + margin), top: top});
                popover.addClass('right')
            } else {
                popover.css({top: btnData.height + margin, left: -(btnData.x - popoverWidth - btnData.width - margin)});
            }
        }
    });

    // POPUP
    const $alertPopup = $('.alert-popup');

    if ($alertPopup.get(0)) {
        function openAlertPopup() {
            $('body').addClass('modal_open');
            $alertPopup.fadeIn();
            $('.backdrop').fadeIn();
        }

        function closeAlertPopup() {
            $alertPopup.fadeOut();
            $('.backdrop').fadeOut();
            $('body').removeClass('modal_open');
        }


        const isMedSpecialist = sessionStorage.getItem('isMedSpecialist');

        if (!isMedSpecialist) {
            openAlertPopup();
        }

        $('#acceptAction').click(function () {
            // save flag to session storage
            sessionStorage.setItem('isMedSpecialist', '1');
            closeAlertPopup();
        });
    }

//    SMALL POPUP
    $('.btn-view').on('click', function (e) {
        e.preventDefault();

        const modalID = $(this).data('modal');
        const modal = $('#' + modalID);
        modal.addClass('show');

        jQuery('.backdrop').fadeIn();
        $("body").addClass("modal_open");
    });

    $('.btn_close, .backdrop').on('click', function (e) {
        e.preventDefault();
        $('.rules-list__text').removeClass('show');
        jQuery('.backdrop').fadeOut();
    });

    $('.btn-chart').on('click', function (e) {
        e.preventDefault();
        const modalID = $(this).data('modal');
        const modal = $('#' + modalID);

        modal.fadeIn();
        jQuery('.overlay').fadeIn();
    });
    $('.popover__close, .overlay').on('click', function (e) {
        e.preventDefault();
        $('.flip-card__popover').fadeOut();
        jQuery('.overlay').fadeOut();
    });

    // POPUP-CONTACTS
    $('.popup-trigger').click(function (e) {
        e.preventDefault();
        $('#popupContacts').fadeIn();
        $('.backdrop').fadeIn();
        $('body').addClass('modal_open');
    })

    $('#closePopup,  .backdrop').click(function () {
        $('#popupContacts').fadeOut();
        $('.backdrop').fadeOut();
        $('body').removeClass('modal_open');
    });
});

