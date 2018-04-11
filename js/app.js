(function ($) {

	"use strict";

	/*
	======================================
		On Scroll Functions
	======================================
	*/
	(function() {

		$(window).on('scroll', function() {
			/*
			======================================
				Fixed Header Init
			======================================
			*/
		    if ($(window).scrollTop() > 175) {
		       $('.salmond-navbar').addClass('fixed-header');
		       $('.salmond-navbar-initial').addClass('fixed-header animated fadeIn');
		       $('.header-top').addClass('fixed-header');
		    }
		    else {
		       $('.salmond-navbar').removeClass('fixed-header');
		       $('.salmond-navbar-initial').removeClass('fixed-header animated fadeIn');
		       $('.header-top').removeClass('fixed-header');
		    }

		    var $header = jQuery('.header-area').height();
		    if ($(window).scrollTop() > $header) {
		       $('.header-top').addClass('fixed-header-bg');
		    }
		    else {
		       $('.header-top').removeClass('fixed-header-bg');
		    }


			/*
			======================================
				ScrollTop Visibility Init
			======================================
			*/
			var $scrollTop 	= jQuery(window).scrollTop();
			var $top 		= jQuery('.back-to-top');
			
			if( $scrollTop > 500 ) {
				$top.fadeIn(500);
			} else {
				$top.fadeOut(500);
			}


			/*
			======================================
				Active Class On Scroll
			======================================
			*/
			$('.salmond-one-page-nav li:first-child >a').addClass('active');
		    var position = $(this).scrollTop();

		    $('section').each(function() {
		        var target = $(this).offset().top - 150;
		        var id = $(this).attr('id');

		        if (position >= target) {
		            $('.salmond-one-page-nav li > a').removeClass('active');
		            $('.salmond-one-page-nav li > a[href="#' + id + '"]').addClass('active');
		        }
		    });

		});

	})();



	/*
	======================================
		On Load Functions
	======================================
	*/
	(function() {

		$(window).on('load', function() {

			/*
			======================================
				Preloader Init
			======================================
			*/
			$('#salmond-status').fadeOut();
			$('.salmond-preloader').delay(1000).fadeOut('slow');


			/*
			======================================
				Isotop Init
			======================================
			*/
			$('#portfolio-container').isotope({
			  // set itemSelector so .grid-sizer is not used in layout
			  itemSelector: '.grid-item',
			  percentPosition: true,
			  masonry: {
			    // use element for option
			    columnWidth: '.grid-sizer'
			  }
			});

		});

	})();


	/*
	======================================
		theiaStickySidebar Init
	======================================
	*/
	(function() {
	    $('.salmond-blog-posts, .widget-area').theiaStickySidebar();
	})();


	/*
	======================================
		ScrollTop Init
	======================================
	*/
	(function() {
		$('.back-to-top').on('click', function(){
			$('html, body').animate({'scrollTop': '0px'}, 2000, "easeInOutExpo");
			return false;
		});
	})();


	/*
	======================================
		ScrollTop Init
	======================================
	*/
	(function() {
		$('#menu-primary').slicknav({
			label: ''
		});
		$('#primary-menu').slicknav({
			label: ''
		});
	})();



	/*
	======================================
		Isotop Click Event
	======================================
	*/
	(function() {
		$('.portfolio-nav ul li').on('click', function() {
			var $this = $(this);
			$this.siblings('.active').removeClass('active');
			$this.addClass('active');
			var selector = $this.attr('data-filter');

			$('#portfolio-container').isotope({
				filter: selector
			});
		});
	})();


	/*
	======================================
		Author Area Carousel Init
	======================================
	*/

	(function() {
		$('.salmond-author-area').owlCarousel({
			items: 1,
			autoplay: false,
			dots: false,
			loop: true,
			navText: ['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>','<i class="fa fa-long-arrow-right" aria-hidden="true"></i>']
		});
	})();


	/*
	======================================
		Testimonial Carousel Init
	======================================
	*/

	(function() {
		$('.testimonial-container').owlCarousel({
			items: 1,
			autoplay: false,
			nav: false,
			dots: true,
			dotsEach: true,
			lazyLoad: true
		});
	})();


	/*
	======================================
		One Page Init
	======================================
	*/
	(function() {
		var $root = $('html, body');
		$('.salmond-one-page-nav a[href^="#"]').on('click', function () {
		    $root.animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top
		    }, 1000);

		    return false;
		});

	})();



	/*
	======================================
		Fancybox Init
	======================================
	*/
	(function() {
		if( $("[data-fancybox]").length ) {
			$("[data-fancybox]").fancybox();
		}
	})();


	/*
	======================================
		Wow Init
	======================================
	*/
	(function() {
		new WOW().init();
	})();


	/*
	======================================
		Form Process
	======================================
	*/
	(function() {

		$('#contact-form').on('submit', function (e) {
			var fname = $('#author');
			var email = $('#email');
			var message = $('#message');
			var status = $('#status');
			var loader = $('.loader', '#contact-form');
			if( fname.val() == 0 || email.val() == 0 || message.val() == 0 ) {
				$('#contact-form').addClass('shake animated').one('animationend webkitAnimationEnd oAnimationEnd', function () {
					$(this).removeClass('shake animated');
				});
				status.html('<span class="error">One or more field may empty!</span>');
			} else {
				$.ajax({
					'url'	: 'process.php',
					'type'	: 'POST',
					'data'	: $(this).serialize(),
					'success' : function ( output ) {
						loader.hide();
						fname.val('');
						email.val('');
						message.val('');
						status.html('Thanks for response. I will shout up soon!');
					}
				});
			}
			e.preventDefault();
		});
	
	})();


})(jQuery);