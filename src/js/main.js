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

// SMOOTH SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            let anchor = $.attr(this, 'href');
            let offsetSize = $("header").innerHeight();

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - offsetSize
                }, 2000);
                nav.removeClass('open');
                jQuery('.backdrop').fadeOut();
                $('body').removeClass('modal_open');
            }
        });
    }

    let myHash = location.hash;
    location.hash = '';
    let offsetSize = $("header").innerHeight();
    if (myHash[1] != undefined) {
        $('html, body').animate({scrollTop: $(myHash).offset().top - offsetSize}, 2000);
    }
    smoothScrollToAnchor('.menu__link');

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
        $(firstAcc).addClass('open');
        $(firstAcc).siblings('.panel-collapse').slideDown(500);

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

            if (!aboutSlider && aboutSelector) {
                aboutSlider = new Swiper(".about-slider", {
                    spaceBetween: 20,
                    slidesPerView: 1,
                    pagination: {
                        el: ".about-slider .swiper-pagination",
                    },
                });
            }
        } else {
            destroySwiper(stepSlider);
            stepSlider = null;

            destroySwiper(opportunitiesSlider);
            opportunitiesSlider = null;

            destroySwiper(aboutSlider);
            aboutSlider = null;
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
        introSpecSlider.allowTouchMove = !$(parent).hasClass('flip-card_active');

    });

    $('.flip-card__slider').each(function (i, el) {
        const slidesCount = $(el).find('.flip-card__content').length;
        if (slidesCount > 1) {
            new Swiper(el, {
                nested: true,
                spaceBetween: 20,
                slidesPerView: 1,
                slideClass: 'flip-card__content',
                pagination: {
                    el: '.flip-card__slider .swiper-pagination',
                    clickable: true,
                    type: "fraction",
                },
            });
        }
    })

    // Popover

    $('.trigger-popover').click(function (e) {
        e.preventDefault();
        $('.trigger-popover').not(this).toggleClass('hide');
        $(this).toggleClass('active');

        const popover = $(this).siblings('.popover');
        popover.toggleClass('active');

        if ($(this).hasClass('active')) {
            const btnData = $(this).get(0).getBoundingClientRect();
            const margin = 5;
            const popoverWidth = popover.outerWidth();
            const windowW = $(window).width();

            const isRight = windowW - btnData.x - btnData.width - margin;
            const isLeft = btnData.x - margin;

            if (isRight > popoverWidth) {
                popover.css({left: btnData.width + margin, top: 23});
            } else if (isLeft > popoverWidth) {
                popover.css({left: -(popoverWidth + margin), top: 23});
            } else {
                popover.css({top: btnData.height + margin, left: -(btnData.x - popoverWidth - btnData.width - margin)});
            }
        }
    });

    // POPUP
    const $alertPopup = $('.alert-popup');

    if ($alertPopup.get(0)) {
        function openAlertPopup() {
            $('body').addClass('modal-open');
            $alertPopup.fadeIn();
            $('.backdrop').fadeIn();
        }

        function closeAlertPopup() {
            $alertPopup.fadeOut();
            $('.backdrop').fadeOut();
            $('body').removeClass('modal-open');
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
        $("body").addClass("modal-open");
    });

    $('.btn_close, .backdrop').on('click', function (e) {
        e.preventDefault();
        $('.rules-list__text').removeClass('show');
        jQuery('.backdrop').fadeOut();
        $("body").removeClass("modal-open");
    });
});

