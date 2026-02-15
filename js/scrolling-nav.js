
// jQuery for page scrolling feature - requires jQuery Easing plugin
jQuery(function($) {

	$('header.onepage .sp-megamenu-parent li a, .offcanvas-menu .menu li a').addClass("page-scroll");
	$('header.onepage .sp-megamenu-parent > li:first-child').addClass("active");

    $('.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutCubic');
		window.location.hash = ''; // for older browsers, leaves a # behind
		history.pushState('', document.title, window.location.pathname); // nice and clean
        event.preventDefault();
	});
	
  //one page nav with smoth scroll and active nav
    $('header.onepage .sp-megamenu-parent, .offcanvas-menu .menu').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 900,
        scrollOffset: 30,
        scrollThreshold: 0.5,
        filter: '.page-scroll'
    });
	//Push first link to the very top
	$('header.onepage .sp-megamenu-parent > li:first-child > a, header.onepage .sp-megamenu-parent li:first-child a[href="#home-wrapper"]').on('click', function(event){
		
		$('html, body').stop().animate({
			scrollTop: 0 ,
		 	}, 1000, 'easeInOutCubic');
		event.preventDefault();
	});
	
    var stickyNavTop = $('body').offset().top;

    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $('#sp-header').removeClass('menu-fixed-out')
            .addClass('menu-fixed');
			$('header.onepage .sp-megamenu-parent li a[href="#home-wrapper"]').removeClass("page-scroll");
        } else {
            if($('#sp-header').hasClass('menu-fixed')) {
                $('#sp-header').removeClass('menu-fixed').addClass('menu-fixed-out');
            }
        }
    };
    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });
    var stickyNavTop = $('body').offset().top;
    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            $('#sp-header').removeClass('menu-fixed-out')
            .addClass('menu-fixed');
        } else {
            if($('#sp-header').hasClass('menu-fixed')) {
                $('#sp-header').removeClass('menu-fixed').addClass('menu-fixed-out');
            }
        }
    };
    stickyNav();
	
    $(window).scroll(function() {
        stickyNav();
    });
		
});

