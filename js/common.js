"use strict";
$(document).ready(function() {
	var $body = $('body'),
	$document = $('html, body'),
	$window = $(window),
	pageWrap = $('#page-wrap'),
	pageLoader = $('#page-loader');

	function scrollOpacity(elem, k) {
		$window.on('scroll', function() {
			var top = $window.scrollTop(),
			opacity = 1 - top * k;
			elem.css('opacity', opacity);
		})
	};

	function onScrollInit(items, trigger) {
		items.each(function() {
			var osElement = $(this),
			osAnimationClass = osElement.data('os-animation'),
			osAnimationDelay = osElement.data('os-animation-delay');

			osElement.css({
				'-webkit-animation-delay': osAnimationDelay,
				'-moz-animation-delay': osAnimationDelay,
				'animation-delay': osAnimationDelay
			});

			var osTrigger = (trigger) ? osElement.closest(trigger) : osElement;

			osTrigger.waypoint(function() {
				osElement.addClass('animated').addClass(osAnimationClass);
			},{
				triggerOnce: true,
				offset: '75%'
			})
		})
	};

	function blockSquare() {
		var blockSquare = $('.block-square');
		for (var i = 0; i < blockSquare.length; i++) {
			$(blockSquare[i]).css('height', $(blockSquare[i]).innerWidth())
		}
	};

	var sectionFix = function() {
		var section = $('.section_fixed'),
		sectionNext = section.next(),
		sectionHeight = section.innerHeight();
		sectionNext.addClass('section-padding').css({'margin-top':sectionHeight});
		if (section.length && sectionNext.offset().top < $window.scrollTop()) {
			section.css({'position':'absolute'})
		} else {
			section.css({'position':'fixed'});
		}
	};

	function equalHeight(elem) {
		var mh = 0;
		elem.height('auto');
		if ($window.width() > 767) {
			for (var y = 0; y < elem.length; y++) {
				var h_block = $(elem[y]).innerHeight();
				if (h_block > mh) {mh = h_block}
			}
			elem.height(mh);
		}
	};

	function equal(container, items) {
		for (var i = 0; i < $(container).length; i++) {
			var elemArr = $(items, $($(container)[i]));
			equalHeight(elemArr);
			$window.on('resize', function() {equalHeight(elemArr)})
		}
	};

	function responsiveText() {
		$('.responsive-text').bigtext();
	};

	setTimeout(function() {
		pageLoader.addClass('page-loader_hide');
		responsiveText();

		if ($window.width() > 767) {
			onScrollInit($('.os-animation'));
			onScrollInit($('.staggered-animation'), '.staggered-animation-container');
			scrollOpacity($('.intro__text, .intro__img, .presentation-line'), 0.0015);
			sectionFix();
			$window.on('scroll', sectionFix);
		}
	}, 800);

	// Hide placeholders on focus
	var inputs = $('.input');
	inputs.on('focus', function() {
		var input = $(this),
		label = $('.label_placeholder[for="' + input.attr('id') + '"]'),
		placeholder = $(input).attr('placeholder');
		input.addClass('focus').attr('placeholder', '');

		input.on('blur', function() {
			if(!input.val()) {
				input.removeClass('focus').attr('placeholder', placeholder)
			}
		})
	});
	for (i = 0; i < inputs.length; i++) {
		if ($(inputs[i]).val() != '') {
			$(inputs[i]).addClass('focus')
		}
	}

	// Scroll the section
	$('.scroll-section').on('click', function() {
		var height = $(this).closest('section').innerHeight();
		$document.animate({scrollTop: height}, 500);
	})

	// Toggle the menu
	var headerMenu = $('.header__menu'),
	headerMenuElems = $('.header__menu-btn, .menu-overlay');

	headerMenuElems.on('click', function() {
		headerMenu.toggleClass('header__menu_opened');
	});

		// Image popup
	$('.image-popup').magnificPopup({
		type: 'image',
		zoom: {enabled: true}
	});

	// Video popup
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});

	// Gallery
	var galleries = $('.gallery');
	for (var i = 0; i < galleries.length; i++) {
		$(galleries[i]).magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {enabled: true},
			zoom: {enabled: true}
		})
	};

	// Popup with animation
	var mfpSettings = {
		type: 'inline',
		 removalDelay: 200,
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,		
		midClick: true,
		mainClass: 'mfp-move-horizontal'
	};
	$('.popup-with-anim').magnificPopup(mfpSettings);

	var popupOpen = function(popup) {
		mfpSettings.items = {src: popup};
		$.magnificPopup.open(mfpSettings);
	}

	// Form validation
	var forms = $('.form');
	for (var i = 0; i < forms.length; i++) {
		var form = $(forms[i]);
		form.validate({
			errorPlacement: function(error, element) {},
			submitHandler: function(form) {
				$.ajax({
					url: form.action,
					type: form.method,
					data: $(form).serialize(),
					success: function() {
						$.magnificPopup.close();
						setTimeout(function() {
							popupOpen('#popup-success');
							form.reset();
							$(form).find('.input').removeClass('focus');
						}, 700)
					},
					error: function() {
						setTimeout(function() {
						popupOpen('#popup-success');
						}, 700)
					}
				});
			}
		})
	};
	$.validator.addClassRules({
		required: {
			required: true
		},
		email: {
			email: true
		}
	});

	// Masonry
	var masonry = $('.masonry'),
	order = false;
	if (masonry.data('horizontal') == true) {order = true}

	var $grid = masonry.masonry({
		itemSelector: '.masonry__item',
		columnWidth: '.masonry__sizer',
		percentPosition: true,
		horizontalOrder: order
	});

	$grid.imagesLoaded().progress(function() {
		responsiveText();
		blockSquare();
		equal('.blocks-equal', '.blocks-equal__item');
		equal('.grid__row', '.grid__item');
		$grid.masonry('layout')
	});

	// Filter
	var filter = $('#filter'),
	filterItems = $('.filter__item'),
	filterContent = $('.filter-content'),
	filterToggle = $('.filter__toggle'),
	dropdown = filter.find('.filter__wrap'),
	filterActive = dropdown.find('.opened');

	filterItems.on('click', function() {
		var tab = $(this),
		content = tab.data('target');

		filterItems.removeClass('opened');
		tab.addClass('opened');
		filter.find(filterToggle).text(tab.text());

		if (content == 'all') {
			filterContent.show();
		} else {
			filterContent.hide();
			$(content).show()
		}
		$grid.masonry('layout');
	});
	filterActive.click();	

	filterToggle.text(filterActive.text()).on('click', function() {
		dropdown.slideToggle(200);
		filterToggle.toggleClass('opened');

		$(document).mouseup(function(e) {
			if (!filter.is(e.target) && !filterToggle.is(e.target)) {
				dropdown.slideUp(200);
				filterToggle.removeClass('opened')
			}
		})
	})

	// Parallax
	var jarallax = $('.jarallax');
	if (jarallax.length) {
		jarallax.jarallax({
			speed: 0.4
		})
	};

	// Anchors
	$('.anchor').on('click', function(e) {
		e.preventDefault();
		var target = $(this).attr('href');
		$document.animate({scrollTop: $(target).offset().top - 50}, 800); 
	});

	// Footer position
	var footer = $('#footer');
	function footerPos() {
		pageWrap.css('padding-bottom', footer.innerHeight());
	};
	footerPos();

	$window.on('resize', function() {
		footerPos();
		responsiveText();
		blockSquare()
	});

	var previews = $('.preview'),
	covers = $('.cover__item');

	var changeImg = function(elem, first) {
		var active = elem.find('.active');
		active.removeClass('active');
		if (active.next().length) {
			active.next(covers).addClass('active')
		} else {
			first.addClass('active')
		}
	};
	for (var i = 0; i < previews.length; i++) {
		var preview = $(previews[i]),
		imgs = preview.find(covers);

		imgs.first().addClass('active');

		if (imgs.length > 1) {
			preview.addClass('preview_active');
		}
	};
	$('.preview_active').on('mouseenter', function() {
		var preview = $(this),
		first = preview.find(covers).eq(0),
		interval = setInterval(function(){changeImg(preview, first)}, 800);

		preview.on('mouseleave', function() {
			clearInterval(interval)
		})
	})
})