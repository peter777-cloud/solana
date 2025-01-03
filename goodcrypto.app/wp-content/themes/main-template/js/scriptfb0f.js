jQuery(window).on('load', function () {

    //single post content menu
    $('.content-menu .nav-item a').click(function (e) {
        e.preventDefault();

        let link = $(this).attr('href'),
            offset = $(link).offset().top,
            controlHeight = 0,
            bannerHeight = $('.banner-line.active').length ? $('.banner-line').outerHeight() : 0;

        if ($(window).width() < 1200) {
            controlHeight = $('.manage').outerHeight();
        } else {
            controlHeight = $('.header').outerHeight();
        }

        controlHeight = controlHeight + bannerHeight;

        $('html, body').animate({
            scrollTop: offset - controlHeight
        }, 400);
    });

    // аккордион внутри статьи блога
    $('.accordion-list').wrap('<div class="accordion-wrapper">').wrap('<div class="accordion-content">');
    $('.accordion-wrapper').each(function () {
        let accordion = $(this),
            content = accordion.find('.accordion-content'),
            list = accordion.find('.accordion-list'),
            activeToggle = list.hasClass('no-active') ? '' : ' active';

        accordion.prepend('<button type="button" class="accordion-btn' + activeToggle + '"><p class="ac-1 d-none">Show table of contents</p><p class="ac-2">Hide table of contents</p></button>');

        if (activeToggle != ' active') {
            content.hide();
            $(this).find('.accordion-btn p').toggleClass('d-none');
        }

        let btnw = accordion.find('.accordion-btn');

        $(btnw).on('click', function (e) {
            $(this).toggleClass('active');
            $(this).find('p').toggleClass('d-none');
            content.slideToggle();
        });

    });

    //передаресация с формы GET THE PRINT VERSION
    document.addEventListener('wpcf7mailsent', function (event) {
        console.log(event.detail.contactFormId);
        if (event.detail.contactFormId == 2965) {
            window.location.href = "https://goodcrypto.app/thanks/";
        }
        if (event.detail.contactFormId == 2966) {
            window.location.href = "https://goodcrypto.app/ru/thanks-ru/";
        }
    }, false);

    $('.wpcf7 input[type="file"]').each(function () {
        $(this).addClass('opacity0');
        $(this).on('change', function () {
            if ($(this).val() == '') {
                $(this).addClass('opacity0');
                $(this).parents('.attachblock').find('.attach-text').removeClass('d-none');
            } else {
                $(this).removeClass('opacity0');
                $(this).parents('.attachblock').find('.attach-text').addClass('d-none');
            }
        });
    });

    if ($(window).width() < 576 && window.Swiper) {

        $('.about-team .at-block').each(function () {
            $(this).wrap('<div class="swiper-slide"></div>');
        });

        $('.about-team .swiper-slide').appendTo('.about-team .swiper-wrapper');

        var swiper = new Swiper('.swiper-team', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            autoHeight: true,

            navigation: {
                nextEl: '.team-next',
                prevEl: '.team-prev',
            },
        });
    }

    $(document).on('click', '.searching form button', function (e) {

        if (!$('.searching form').hasClass('active')) {
            e.preventDefault();
            $('.searching form').addClass('active');
        }
    });

    $('.searching form .closing').click(function () {
        $('.searching form').removeClass('active');
    });

    if ($(window).width() < 1200) {
        $('.header .menu-wrapper').prependTo('.left-menu .links');
    }

    if (!$('.digest-row').length) {
        $('.blog-entries .row > div:first-of-type').removeClass('col-sm-6');
        $('.blog-entries .row').addClass('change-row');
    } else {
        $('.digest-row .row > div:first-of-type').removeClass('col-sm-6');
        $('.blog-entries .row').removeClass('change-row');
        $('.digest-row .row').addClass('change-row');
    }

    var hoverTimeout;

    $('.menu-item-has-children > a').on('mouseenter', function () {
        clearTimeout(hoverTimeout);

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
            $(this).siblings('.sub-menu').slideDown().addClass('active');
        }
    });

    $('.menu-item-27374').on('mouseleave', function () {
        var $parent = $(this);

        hoverTimeout = setTimeout(function () {
            if ($parent.hasClass('active')) {
                $parent.removeClass('active');
                $parent.find('.sub-menu').slideUp().removeClass('active');
            }
        }, 300); // Adjust the timeout as needed, e.g., 300 milliseconds
    });

    $('.menu-item-62342').on('mouseleave', function () {
        var $parent = $(this);

        hoverTimeout = setTimeout(function () {
            if ($parent.hasClass('active')) {
                $parent.removeClass('active');
                $parent.find('.sub-menu').slideUp().removeClass('active');
            }
        }, 300); // Adjust the timeout as needed, e.g., 300 milliseconds
    });
	$('.menu-item-117844').on('mouseleave', function () {
        var $parent = $(this);

        hoverTimeout = setTimeout(function () {
            if ($parent.hasClass('active')) {
                $parent.removeClass('active');
                $parent.find('.sub-menu').slideUp().removeClass('active');
            }
        }, 300); // Adjust the timeout as needed, e.g., 300 milliseconds
    });
	$('.menu-item-27450').on('mouseleave', function () {
        var $parent = $(this);

        hoverTimeout = setTimeout(function () {
            if ($parent.hasClass('active')) {
                $parent.removeClass('active');
                $parent.find('.sub-menu').slideUp().removeClass('active');
            }
        }, 300); // Adjust the timeout as needed, e.g., 300 milliseconds
    });

    if (window.Swiper) {
        var swiper = new Swiper('.swiper-reviews', {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
            breakpoints: {
                // when window width is <= 320px
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is <= 480px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is <= 640px
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 70
                }
            },

            navigation: {
                nextEl: '.reviews-next',
                prevEl: '.reviews-prev',
            },
        });
    }

    if ($(window).width() < 768 && window.Swiper) {
        var swiper = new Swiper('.swiper-categories', {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,

            navigation: {
                nextEl: '.categories-next',
                prevEl: '.categories-prev',
            },
        });
    }
    // подгрузка постов (disabled for static)
    // $('.misha_loadmore').click(function (e) {
    //     e.preventDefault();

    //     var text = $(this).data('text'),
    //         loads = $(this).data('load');

    //     var button = $(this),
    //         data = {
    //             'action': 'loadmore',
    //             'query': misha_loadmore_params.posts, // that's how we get params from wp_localize_script() function
    //             'page': misha_loadmore_params.current_page
    //         };

    //     $.ajax({ // you can also use $.post here
    //         url: misha_loadmore_params.ajaxurl, // AJAX handler
    //         data: data,
    //         type: 'POST',
    //         beforeSend: function (xhr) {
    //             button.text(loads); // change the button text, you can also add a preloader image
    //         },
    //         success: function (data) {
    //             if (data) {
    //                 button.text(text);
    //                 $('#more-posts').append(data);
    //                 // insert new posts
    //                 misha_loadmore_params.current_page++;

    //                 if (misha_loadmore_params.current_page == misha_loadmore_params.max_page)
    //                     button.remove(); // if last page, remove the button

    //                 // you can also fire the "post-load" event here if you use a plugin that requires it
    //                 // $( document.body ).trigger( 'post-load' );
    //             } else {
    //                 button.remove(); // if no data, remove the button as well
    //             }

    //         }
    //     });
    // });


    //моб.меню
    $('.manage .humb').click(function () {
        $('.left-menu').addClass('active');
    });
    $('.close-menu').click(function () {
        $('.left-menu').removeClass('active');
    });

    // SEND FORMS
    $('.send-ajax').click(function () {
        $(this).prop('disabled', true);
        $(this).addClass('disabled');

        var form = $(this).closest('form');
        var redirect = form.find('input[name="redirect"]').val();
        var thanks = form.find('input[name="thanks_modal"]').val();

        if (form.valid()) {
            var actUrl = form.attr('action');

            $.ajax({
                url: actUrl,
                type: 'post',
                dataType: 'html',
                data: form.serialize(),
                success: function (data) {
                    $('.modal').modal('hide');
                    setTimeout(function () {
                        $('.for-success').show(500);
                        setTimeout(function () {
                            $('.for-success').hide(500);
                        }, 3000);
                    });
                },
                error: function () {}
            });
            $(form)[0].reset();
        } else {
            $(this).prop('disabled', false);
            $(this).removeClass('disabled');
        }
    });

    jQuery('.send').click(function () {
        var form = jQuery(this).closest('form');

        if (form.valid()) {
            form.submit();
        }
    });


});

$(document).ready(function () {

    $('.gradient-btn').each(function () {
        let text = $(this).text();
        $(this).html('<p data-text="' + text + '">' + text + '</p>');
    });

    /* enable transition */
    $('body').removeClass('transition-off');

    var lineHeight, headerHeight, manageHeight, link, header1, header2, block, btnHeight, offsetTop;

    window.HEADER_SLIDE_TIMEOUT = 3000;
    $('.banner-line').addClass('active');

    lineHeight = $('.banner-line').outerHeight();
    headerHeight = $('.header').outerHeight();
    manageHeight = $('.manage').outerHeight();

    if ($('.fixed-banner').length) {
        $('.header, .manage').css({
            top: lineHeight + 'px'
        });

        if ($(window).width() > 1199) {
            $('body').css({
                paddingTop: lineHeight + headerHeight + 'px'
            });
        } else {
            $('body').css({
                paddingTop: lineHeight + manageHeight + 'px'
            });
        }

    } else {
        if ($(window).width() > 1199) {
            $('body').css({
                paddingTop: headerHeight + 'px'
            });
        } else {
            $('body').css({
                paddingTop: manageHeight + 'px'
            });
        }
    }


    if (!$('body').hasClass('single') && !$('.category-menu .current-menu-item')[0]) {
        $('.category-menu .for-all').addClass('current-menu-item');
    }

    if (!$('.faq-category .active')[0]) {
        $('.cat-block.for-all').addClass('active');
    }

    var url = document.location.toString();
    if (url.match('#') && $('.accordion').length) {
        link = $('.accordion .card #' + url.split('#')[1]);
        console.log(url.split('#')[1]);
        /*var text = $(link).text();
        	$('.st-1').text(text);*/
        $(link).collapse('show');

    }

    // $('.accordion').on('shown.bs.collapse', function () {
    //     header1 = $('.header').outerHeight();
    //     block = $(this);
    //     btnHeight = block.find('.collapse.show').siblings('.btn').outerHeight();
    //     offsetTop = block.find('.collapse.show').offset().top;

    //     $('html, body').animate({
    //         scrollTop: (offsetTop - btnHeight) - header1
    //     }, 400);
    // });

    $('.banner-line .for-close').click(function () {
        $(this).parent().slideUp(100).removeClass('active');
        $('.header, .manage').css({
            top: 0
        });

        setTimeout(() => {
            header1 = $('.header').outerHeight();
            header2 = $('.manage').outerHeight();

            if ($(window).width() > 1199) {
                $('body').css({
                    paddingTop: header1 + 'px',
                    transition: '0.2s'
                });
            } else {
                $('body').css({
                    paddingTop: header2 + 'px',
                    transition: '0.2s'
                });
            }
        }, 100);
    });


    $('.plans-table').each(function () {
        let table = $(this),
            textCol = table.find('.text-column .column-chain');

        textCol.each(function (index) {
            if ($(this).hasClass('soon')) {
                table.find('.cch-' + (index + 1)).addClass('soon');
            }
        });
    });

    // price tables
    for (let index = 0; index < 100; index++) {
        setHeight('.table-template', '.column-head');
        setHeight('.table-template', '.cch-' + index);
    }
    // remove show class from collapses
    // $('.plans-table .collapse-block:not(:first-of-type) .collapse').removeClass('show');

    

});

$(window).on('load resize', function () {
    setHeight('.faq-category', '.cat-block');

    if ($(window).width() > 767) {
        setHeight('.reviews', '.review');
        setHeight('.faq-category', '.name');
    }
    if ($(window).width() > 575) {
        setHeight('.row', '.csp-block');
    }

    setHeight('.row', '.csp-block');

    // period change
    $('.packet').each(function () {
        let block = $(this),
            periodBtn = block.find('.p-btn.active');

        getData(periodBtn, block)
    });

    $('.period-line .p-btn').click(function () {
        let periodBtn = $(this),
            block = periodBtn.parents('.packet');

        block.find('.p-btn').removeClass('active');

        periodBtn.addClass('active');

        getData(periodBtn, block);
    });

    function getData(btn, block) {
        let btnTxt = btn.data('btn'),
            price = btn.data('price'),
            note = btn.data('note'),
            list = btn.data('list');

        if (price) block.find('.price').html(price);
        if (btnTxt) block.find('.cl-btn').html('<p data-text="' + btnTxt + '">' + btnTxt + '</p>');
        if (list) block.find('.check-list').html(list);

        block.find('.note').html(note);
    }

    //fixed sidebar on scroll
    // let sideBar = $(window).width() > 991 ? $('.single-sidebar') : false; //$('.accordion-menu');
    let sideBar = $('.single-sidebar');
    if (sideBar.length) {
        let sidebarHeight = sideBar.outerHeight(),
            sidebarWidth = sideBar.outerWidth(),
            windowHeight = $(window).height(),
            offsetLefts = $(window).width() > 991 ? sideBar.offset().left : 0,
            bannerHeight = $('.banner-line.active').length ? $('.banner-line').outerHeight() : 0,
            headerHeight = $(window).width() < 1200 ? $('.manage').outerHeight() : $('.header > .container').outerHeight();

        //wrap sidebar in div to prevent drops on scroll
        sideBar.wrap('<div class="single-sidebar-wrapper"></div>');
        let sidebarWrapper = $('.single-sidebar-wrapper');

        //set width & height of sidebar on different window sizes
        if ($(window).width() > 991) {
            sideBar.css({
                width: sidebarWidth + 'px'
            });

        } else {
            sideBar.css({
                width: 100 + '%'
            });
            sidebarWrapper.css({
                height: sidebarHeight + 'px'
            });
        }

        //add scroll to sidebar if it has height bigger than visible window space
        if (sidebarHeight >= windowHeight - (headerHeight + bannerHeight)) {
            sideBar.addClass('srollHeight');

            sideBar.css({
                height: windowHeight - (headerHeight + bannerHeight) + 'px'
            })
        }
        console.log(headerHeight);
        console.log(bannerHeight);
        //scroll function
        $(window).scroll(function () {
            //dynamically get data
            let singleHeight = $('.for-single').outerHeight(),
                // windowHeight = $(window).height(),
                sidebarTop = sidebarWrapper.offset().top,
                bannerHeight = $('.banner-line.active').length ? $('.banner-line').outerHeight() : 0;

            //dynamically add scroll to sidebar if it has height bigger than visible window space
            // if (sidebarHeight >= windowHeight - (headerHeight + bannerHeight)) {
            //     sideBar.addClass('srollHeight');

            //     sideBar.css({
            //         height: windowHeight - (headerHeight + bannerHeight) + 'px'
            //     })
            // }

            //add fixed or relative styles for sidebar on scroll
            if ($(window).scrollTop() >= sidebarTop - (headerHeight + bannerHeight)) {
                sideBar.addClass('active');

                sideBar.css({
                    position: 'fixed',
                    top: bannerHeight + headerHeight + 'px',
                    left: offsetLefts
                });
            } else {
                sideBar.removeClass('active');

                sideBar.css({
                    position: 'relative',
                    top: 'initial',
                    left: 'initial'
                });
            }

            //hide sidebar on hidepoint
            if ($(window).scrollTop() >= singleHeight - sidebarHeight) {
                sideBar.css({
                    opacity: 0
                });
            } else {
                sideBar.css({
                    opacity: 1
                });
            }

        });

    }

});

$(document).ready(function () {
    setHeader();

    var rangeSlider = $('input[type="range"]');

    rangeSlider.each(function () {

        var it = $(this),
            inputParent = it.parents('.for-range'),
            inputVal = inputParent.find('input.vals');


        if (it.length) {

            it.rangeslider({
                polyfill: false,
                onInit: function () {
                    inputParent.find('.rangeslider__handle').append('<div class="qua"> 1</div>');

                },
                onSlide: function (position, value) {
                    inputVal.val(value);
                    inputParent.find('.qua').text(value);
                },
            })
        }

    });
});

function setHeader() {
    var header1 = $('.header').outerHeight();
    var header2 = $('.manage').outerHeight();
    var lineHeight = $('.top-line').length ? $('.top-line').outerHeight() : 0;

    // if ($(window).width() < 1200) {
    //     return;
    //     $('body').css({
    //         paddingTop: header2 + 'px',
    //         //transition: '1s'
    //     });
    // }

    var blockHeader = $(window).width() < 1200 ? header2 : header1;

    $('body').css({
        //paddingTop: blockHeader + 'px',
    });

    $('.header').css({
        position: 'fixed',
    });

    $(".go-to-block").click(function (e) {
        e.preventDefault();
        var target = $(this).data('target'),
            offset = $(target).offset().top;

        $('html, body').animate({
            scrollTop: offset - blockHeader
        }, 400);
    });
}

function setHeight(parent, block) {

    $(parent).each(function () {

        var height = 0,
            blockk = $(this).find(block);

        blockk.each(function () {

            var blockHeight = $(this).outerHeight();

            if (height < blockHeight) {
                height = blockHeight;
            }

        });

        blockk.css({
            height: height
        });


    });
}

jQuery(document).ready(function ($) {
    $('.to-play').on('click', function () {
        let videoID = $(this).data('video'),
            playerID = $(this).data('id');
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        let player;
        player = new YT.Player(playerID, {
            playerVars: {
                'controls': 0,
                'showinfo': 0,
                'disablekb': 1,
                'rel': 0,
                'playsinline': 1,

            },
            videoId: videoID,
            events: {
                'onReady': onPlayerReady,
            }
        });
        $(this).addClass('removed');
    });
});

function onPlayerReady(event) {
    event.target.playVideo();
}

// function menuFixed(menu, offseting) {
//     var height = $(menu).outerHeight(),
//         offsetParametr = offseting,
//         offsetTop = $(menu).offset().top + offsetParametr,
//         wrapper = 'wrapper-' + $(menu).attr('class');
//     $(menu).wrap('<div class="' + wrapper + '"></div>');
//     $('.' + wrapper).css({
//         minHeight: height
//     });
//     $(window).scroll(function () {
//         if ($(window).scrollTop() >= offsetTop) {
//             $(menu).addClass('active');
//         } else {
//             $(menu).removeClass('active');
//         }
//     });
// }