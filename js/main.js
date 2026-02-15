/**
 * Flex
 * Template Name - Flex
 * @author Aplikko http://www.aplikko.com
 * @copyright Copyright (c) 2016 Aplikko
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
*/

jQuery(function($) {
	
	<!-- Site Preloader -->
	$(window).load(function() {	
		$('#preloader').fadeOut('slow', function(){
			$(this).remove();
		}); 
	});	

    var $body = $('body'),
    $wrapper = $('.body-innerwrapper'),
    $toggler = $('#offcanvas-toggler'),
    $close = $('.close-offcanvas'),
    $offCanvas = $('.offcanvas-menu');

    $toggler.on('click', function(event){
        event.preventDefault();
        stopBubble (event);
        setTimeout(offCanvasShow, 50);
    });

    $close.on('click', function(event){
        event.preventDefault();
        offCanvasClose();
    });

    var offCanvasShow = function(){
        $body.addClass('offcanvas');
        $wrapper.on('click',offCanvasClose);
        $close.on('click',offCanvasClose);
        $offCanvas.on('click',stopBubble);

    };

    var offCanvasClose = function(){
        $body.removeClass('offcanvas');
        $wrapper.off('click',offCanvasClose);
        $close.off('click',offCanvasClose);
        $offCanvas.off('click',stopBubble);
    };

    var stopBubble = function (e) {
        e.stopPropagation();
        return true;
    };
	
	$(".social-icons > li > a[href=#],.sp-megamenu-parent .separator > a,.sppb-person-social > li > a[href=#],.sppb-addon-content > a[href=#],a.sppb-btn[href=#],.slick-img > a[href=#],.sp-layer a[href=#],[data-toggle=\"popover\"],.flex-icons a[href=#]").click(function(e){
    	e.preventDefault();
	});
	
	
		
	//AP Smart LayerSlider hash
	$('a[href^=\"#ap-smart-layerslider-\"]').click(function(e){
		if ( window.history && window.history.pushState ) { 
			window.history.pushState('', '', window.location.pathname);
		} else { 
			window.location.href = window.location.href.replace(/#.*$/, '#'); 
		}
	});

    //Mega Menu
    $('.sp-megamenu-wrapper').parent().parent().css('position','static').parent().css('position', 'relative');
    $('.sp-menu-full').each(function(){
        $(this).parent().addClass('menu-justify');
    });

	$(document).ready(function(){	
        $("body.sticky-header").find('#sp-header').sticky({topSpacing:0});
    });

    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();
	
	//Popover
  	$('[data-toggle="popover"]').popover();

    
    $(document).on('click', '.sp-rating .star', function(event) {
        event.preventDefault();

        var data = {
            'action':'voting',
            'user_rating' : $(this).data('number'),
            'id' : $(this).closest('.post_rating').attr('id')
        };

        var request = {
                'option' : 'com_ajax',
                'plugin' : 'helix3',
                'data'   : data,
                'format' : 'json'
            };

        $.ajax({
            type   : 'POST',
            data   : request,
            beforeSend: function(){
                $('.post_rating .ajax-loader').show();
            },
            success: function (response) {
                var data = $.parseJSON(response.data);

                $('.post_rating .ajax-loader').hide();

                if (data.status == 'invalid') {
                    $('.post_rating .voting-result').text('You have already rated this entry!').fadeIn('fast');
                }else if(data.status == 'false'){
                    $('.post_rating .voting-result').text('Somethings wrong here, try again!').fadeIn('fast');
                }else if(data.status == 'true'){
                    var rate = data.action;
                    $('.voting-symbol').find('.star').each(function(i) {
                        if (i < rate) {
                           $( ".star" ).eq( -(i+1) ).addClass('active');
                        }
                    });

                    $('.post_rating .voting-result').text('Thank You!').fadeIn('fast');
                }

            },
            error: function(){
                $('.post_rating .ajax-loader').hide();
                $('.post_rating .voting-result').text('Failed to rate, try again!').fadeIn('fast');
            }
        });
    });
	jQuery('body').append('<a href=\"#top\" id=\"scroll-top\"><i class=\"pe-7s-angle-up\"></i></a>');
	jQuery('ul.sppb-flickr-gallery > li > a').append('<i class="fa fa-joomla"></i>');

	
	/*------------- Scroll to Top ------------------*/
			jQuery(window).scroll(function(){if(!jQuery('body').hasClass('whatever')){if(jQuery(this).scrollTop()>700){jQuery('a#scroll-top').addClass('open')}else{jQuery('a#scroll-top').removeClass('open')}}else{jQuery('a#scroll-top').removeClass('open')}});jQuery('a#scroll-top').on('click',function(){if(!jQuery('body').hasClass('whatever')){jQuery('html, body').animate({scrollTop:0},700);return false}});
			
//======== CSS Browser Selector v0.4.0 (https://github.com/rafaelp/css_browser_selector) ==========//
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+(/trident\/4\.0/.test(ua) ? '8' : RegExp.jQuery1)):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.jQuery1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.jQuery2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.jQuery1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);	


});