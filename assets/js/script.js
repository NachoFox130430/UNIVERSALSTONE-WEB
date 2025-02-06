/*-----------------------------------------------------------------

-------------------------------------------------------------------
CSS TABLE OF CONTENTS
-------------------------------------------------------------------

01. preloader
02. header
03. swiper slider
04. animated text with swiper slider
05. shop products count
06. image src change
07. hide & show a div
08. isotope
09. add class & remove class
10. magnificPopup
11. back to top
12. data backgrund
13. coundown by click
14. remove products
15. wow animation

------------------------------------------------------------------*/

var THEMEMASCOT = {};
(function ($) {
	("use strict");

	/* ---------------------------------------------------------------------- */
	/* ----------------------------- En Demo Switcher  ---------------------- */
	/* ---------------------------------------------------------------------- */

	THEMEMASCOT.isRTL = {
		check: function () {
			if ($("html").attr("dir") === "rtl") {
				return true;
			} else {
				return false;
			}
		},
	};

	THEMEMASCOT.isLTR = {
		check: function () {
			if ($("html").attr("dir") !== "rtl") {
				return true;
			} else {
				return false;
			}
		},
	};

	// Preloader area start here ***
	const loader = () => {
		$(window).on("load", function () {
			$("#preloader").addClass("loaded");
			$("#preloader").delay(500).fadeOut();
		});
	};
	loader();
	// Preloader area end here ***

	// Color mood area start here ***
	function setThemeColor(color) {
		const root = document.documentElement;
		root.setAttribute("data-theme", color);
	}
	// Color mood area end here ***

	// Header area start here ***
	// Mobile menu
	$(".header-area nav").meanmenu();

	// Menu Fixed
	var fixed_top = $(".header-area");
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 50) {
			fixed_top.addClass("menu-fixed animated fadeInDown");
		} else {
			fixed_top.removeClass("menu-fixed fadeInDown");
		}
	});
	// Header area end here ***

	// Gsap Animation area start here ***
	gsap.utils.toArray(".gsap__parallax").forEach(function (container) {
		let image = container.querySelector("img");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: 0.5,
			},
		});
		tl.from(image, {
			yPercent: -30,
			ease: "none",
		}).to(image, {
			yPercent: 30,
			ease: "none",
		});
	});
	// Gsap Animation area end here ***

	// Mouse cursor area start here ***
	(function mousecursor() {
		if ($("body")) {
			const e = document.querySelector(".cursor-inner"),
				t = document.querySelector(".cursor-outer");
			let n,
				i = 0,
				o = !1;
			window.onmousemove = function (s) {
				o ||
					(t.style.transform =
						"translate(" + s.clientX + "px, " + s.clientY + "px)"),
					(e.style.transform =
						"translate(" + s.clientX + "px, " + s.clientY + "px)"),
					(n = s.clientY),
					(i = s.clientX);
			};
			$("body").on("mouseenter", "a, .cursor-pointer", function () {
				e.classList.add("cursor-hover");
				t.classList.add("cursor-hover");
			});
			$("body").on("mouseleave", "a, .cursor-pointer", function () {
				($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
					(e.classList.remove("cursor-hover"),
					t.classList.remove("cursor-hover"));
			});
			e.style.visibility = "visible";
			t.style.visibility = "visible";
		}
	})();
	// Mouse cursor area end here ***

	// Scroll Fade area start here ***
	$(window).scroll(function () {
		var scrolled = $(this).scrollTop();

		$(".parallaxScroll").css({
			transform:
				"translate3d(0, " +
				-(scrolled * 0.2) +
				"px, 0) rotateX(" +
				scrolled * 0.1 +
				"deg)",
			opacity: 1 - scrolled / 600,
		});

		$(".parallaxScaleScroll").css({
			transform: "scale(" + (1 + scrolled / 1500) + ")",
		});

		$(".parallaxRightScroll").css({
			transform: "translateX(" + scrolled / 2 + "px)", // Move the element to the right
		});

		$(".parallaxLeftScroll").css({
			transform: "translateX(" + -(scrolled / 2) + "px)", // Move the element to the left
		});

		$(".parallaxRoteteYScroll").css({
			transform: "rotateY(" + scrolled * 0.2 + "deg)", // 3D rotate along Y-axis
			opacity: 1 - scrolled / 500, // Fade out slowly
		});

		$(".parallaxRotete360Scroll").css({
			transform: "rotate(" + scrolled + "deg)", // Rotate 360 degrees based on scroll
		});
	});
	// Scroll Fade area end here ***

	// FullScreen search area end here ***
	var $searchWrap = $(".search-wrap");
	var $navSearch = $(".nav-search");
	var $searchClose = $("#search-close");
	$(".search-trigger").on("click", function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: "toggle" }, 500);
		$navSearch.add($searchClose).addClass("open");
	});
	$(".search-close").on("click", function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: "toggle" }, 500);
		$navSearch.add($searchClose).removeClass("open");
	});
	function closeSearch() {
		$searchWrap.fadeOut(200);
		$navSearch.add($searchClose).removeClass("open");
	}
	$(document.body).on("click", function (e) {
		closeSearch();
	});
	$(".search-trigger, .main-search-input").on("click", function (e) {
		e.stopPropagation();
	});
	// FullScreen search area end here ***

	// Banner slider area start here ***
	// Banner slider one***
	(function BannerSlider() {
		var sliderActive1 = ".banner__slider";
		// Initialize Swiper
		var sliderInit1 = new Swiper(sliderActive1, {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 1500, // Speed for the white space (slide container)
			parallax: true, // Enable parallax effect on the images
			autoplay: {
				delay: 4000, // Autoplay delay between slides
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".banner__arry-next",
				prevEl: ".banner__arry-prev",
			},
			on: {
				slideChange: function () {
					animateContent();
				},
			},
		});
		// Function to animate elements with data-animation
		function animateContent() {
			var animatedElements = $("[data-animation]");
			animatedElements.each(function () {
				var $this = $(this);
				var anim = $this.data("animation");
				var delay = $this.data("delay") || "0s";
				var duration = $this.data("duration") || "1s";

				$this
					.removeClass(anim + " animated") // Reset animation
					.css({
						webkitAnimationDelay: delay,
						animationDelay: delay,
						webkitAnimationDuration: duration,
						animationDuration: duration,
					})
					.addClass(anim + " animated") // Trigger animation
					.one("animationend", function () {
						$this.removeClass(anim + " animated"); // Optionally remove after animation ends
					});
			});
		}
		// Trigger the animation immediately on load
		animateContent();
	})();
	// Banner slider one***

	// Banner slider four***
	(function BannerSliderFour() {
		var sliderActive2 = ".banner-four__slider";
		// Initialize Swiper
		var sliderInit2 = new Swiper(sliderActive2, {
			loop: true,
			slidesPerView: 1,
			effect: "fade",
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".banner__arry-next, .banner-four__slider-next",
				prevEl: ".banner__arry-prev, .banner-four__slider-prev",
			},
			on: {
				slideChange: function () {
					animateContent();
				},
			},
		});
		// Function to animate elements with data-animation
		function animateContent() {
			var animatedElements = $("[data-animation]");
			animatedElements.each(function () {
				var $this = $(this);
				var anim = $this.data("animation");
				var delay = $this.data("delay") || "0s";
				var duration = $this.data("duration") || "1s";

				$this
					.removeClass(anim + " animated")
					.css({
						webkitAnimationDelay: delay,
						animationDelay: delay,
						webkitAnimationDuration: duration,
						animationDuration: duration,
					})
					.addClass(anim + " animated")
					.one("animationend", function () {
						$this.removeClass(anim + " animated");
					});
			});
		}

		// Trigger the animation immediately on load
		animateContent();
	})();
	// Banner slider four***
	// Banner slider area end here ***

	// Testimonial slider area start here ***
	var swiper = new Swiper(".testimonial__slider", {
		loop: "true",
		spaceBetween: 30,
		speed: 500,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".testimonial__arry-next",
			prevEl: ".testimonial__arry-prev",
		},
	});

	var swiper = new Swiper(".testimonial-four__slider", {
		loop: "true",
		spaceBetween: 30,
		speed: 500,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".testimonial-four__arry-next",
			prevEl: ".testimonial-four__arry-prev",
		},
	});
	// Testimonial slider area end here ***

	// Project slider area start here ***
	var swiper = new Swiper(".project__slider", {
		loop: "true",
		spaceBetween: 0,
		speed: 1000,
		breakpoints: {
			1199: {
				slidesPerView: 4,
			},
			991: {
				slidesPerView: 3,
			},
			575: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1,
			},
		},
		navigation: {
			nextEl: ".project__arry-next",
			prevEl: ".project__arry-prev",
		},
	});
	// Project slider area end here ***

	// Hover add & remove js area start here ***
	$(".hover-item").hover(
		// Function to run when the mouse enters the element
		function () {
			// Remove the "active" class from all elements
			$(".hover-item").removeClass("active");
			// Add the "active" class to the currently hovered element
			$(this).addClass("active");
		}
	);
	$(".feature-five__item").hover(function () {
		$(".feature-five__item").removeClass("active");
		$(this).addClass("active");
	});
	// Hover add & remove js area end here ***

	// Background image area start here ***
	$("[data-background").each(function () {
		$(this).css(
			"background-image",
			"url( " + $(this).attr("data-background") + "  )"
		);
	});
	// Background image area end here ***

	// Background image hover change area start here ***
	$(".project__item").hover(function () {
		let newBackground = $(this).data("bg");
		$(".project__wrp")
			.attr("data-background", newBackground)
			.css("background-image", "url(" + newBackground + ")");
	});
	// Background image hover change area end here ***

	// Video popup area start here ***
	$(".video-popup").magnificPopup({
		type: "iframe",
		iframe: {
			markup:
				'<div class="mfp-iframe-scaler">' +
				'<div class="mfp-close"></div>' +
				'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
				"</div>",

			patterns: {
				youtube: {
					index: "youtube.com/",

					id: "v=",

					src: "https://www.youtube.com/embed/%id%?autoplay=1",
				},
				vimeo: {
					index: "vimeo.com/",
					id: "/",
					src: "//player.vimeo.com/video/%id%?autoplay=1",
				},
				gmaps: {
					index: "//maps.google.",
					src: "%id%&output=embed",
				},
			},

			srcAction: "iframe_src",
		},
	});

	$(".image-popup").magnificPopup({
		type: "image",
		closeBtnInside: false,
		closeOnContentClick: true,
		tLoading: "",
		callbacks: {
			beforeChange: function () {
				this.items[0].src = this.items[0].src + "?=" + Math.random();
			},
		},
	});
	// Video popup area end here ***

	// Coundawn area start here ***
	var targetDate = new Date("2024-07-12 00:00:00").getTime();
	var countdownInterval = setInterval(function () {
		var currentDate = new Date().getTime();
		var remainingTime = targetDate - currentDate;

		if (remainingTime <= 0) {
			clearInterval(countdownInterval);
			// Display a message or perform any action when the countdown timer reaches zero
			$("#countdown-container").text("Countdown has ended!");
		} else {
			var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
			var hours = Math.floor(
				(remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			var minutes = Math.floor(
				(remainingTime % (1000 * 60 * 60)) / (1000 * 60)
			);
			var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

			// Pad single-digit values with leading zeros
			$("#day").text(days.toString().padStart(2, "0"));
			$("#hour").text(hours.toString().padStart(2, "0"));
			$("#min").text(minutes.toString().padStart(2, "0"));
			$("#sec").text(seconds.toString().padStart(2, "0"));
		}
	}, 1000);
	// Coundawn area end here ***

	//Tabs Box
	if ($(".tabs-box").length) {
		$(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
			e.preventDefault();
			var target = $($(this).attr("data-tab"));

			if ($(target).is(":visible")) {
				return false;
			} else {
				target
					.parents(".tabs-box")
					.find(".tab-buttons")
					.find(".tab-btn")
					.removeClass("active-btn");
				$(this).addClass("active-btn");
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.fadeOut(0);
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.removeClass("active-tab animated fadeIn");
				$(target).fadeIn(300);
				$(target).addClass("active-tab animated fadeIn");
			}
		});
	}

	//Accordion Box
	if ($(".accordion-box").length) {
		$(".accordion-box").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion-box");
			var target = $(this).parents(".accordion");

			if ($(this).hasClass("active") !== true) {
				$(outerBox).find(".accordion .acc-btn").removeClass("active ");
			}

			if ($(this).next(".acc-content").is(":visible")) {
				return false;
			} else {
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox)
					.find(".accordion")
					.children(".acc-content")
					.slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc-content").slideDown(300);
			}
		});
	}

	//product bxslider
	if ($(".product-details .bxslider").length) {
		$(".product-details .bxslider").bxSlider({
			nextSelector: ".product-details #slider-next",
			prevSelector: ".product-details #slider-prev",
			nextText: '<i class="fa fa-angle-right"></i>',
			prevText: '<i class="fa fa-angle-left"></i>',
			mode: "fade",
			auto: "true",
			speed: "700",
			pagerCustom: ".product-details .slider-pager .thumb-box",
		});
	}

	// count Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
				var el = $(this);
				var percent = el.data("percent");
				$(el).css("width", percent).addClass("counted");
			},
			{
				accY: -50,
			}
		);
	}

	//Quantity box
	$(".quantity-box .add").on("click", function () {
		if ($(this).prev().val() < 999) {
			$(this)
				.prev()
				.val(+$(this).prev().val() + 1);
		}
	});
	$(".quantity-box .sub").on("click", function () {
		if ($(this).next().val() > 1) {
			if ($(this).next().val() > 1)
				$(this)
					.next()
					.val(+$(this).next().val() - 1);
		}
	});

	//Price Range Slider
	if ($(".price-range-slider").length) {
		$(".price-range-slider").slider({
			range: true,
			min: 10,
			max: 99,
			values: [10, 60],
			slide: function (event, ui) {
				$("input.property-amount").val(ui.values[0] + " - " + ui.values[1]);
			},
		});

		$("input.property-amount").val(
			$(".price-range-slider").slider("values", 0) +
				" - $" +
				$(".price-range-slider").slider("values", 1)
		);
	}

	//Gallery Filters
	if ($(".filter-list").length) {
		$(".filter-list").mixItUp({});
	}

	// Counter up area start here ***
	$(".count").counterUp({
		delay: 100,
		time: 2000,
	});
	// Counter up area end here ***

	/* ---------------------------------------------------------------------- */
	/* ----------- Activate Menu Item on Reaching Different Sections ---------- */
	/* ---------------------------------------------------------------------- */
	var $onepage_nav = $(".onepage-nav");
	var $sections = $("section");
	var $window = $(window);
	function TM_activateMenuItemOnReach() {
		if ($onepage_nav.length > 0) {
			var cur_pos = $window.scrollTop() + 2;
			var nav_height = $onepage_nav.outerHeight();
			$sections.each(function () {
				var top = $(this).offset().top - nav_height - 80,
					bottom = top + $(this).outerHeight();

				if (cur_pos >= top && cur_pos <= bottom) {
					$onepage_nav
						.find("a")
						.parent()
						.removeClass("current")
						.removeClass("active");
					$sections.removeClass("current").removeClass("active");
					$onepage_nav
						.find('a[href="#' + $(this).attr("id") + '"]')
						.parent()
						.addClass("current")
						.addClass("active");
				}

				if (cur_pos <= nav_height && cur_pos >= 0) {
					$onepage_nav
						.find("a")
						.parent()
						.removeClass("current")
						.removeClass("active");
					$onepage_nav
						.find('a[href="#header"]')
						.parent()
						.addClass("current")
						.addClass("active");
				}
			});
		}
	}
	TM_activateMenuItemOnReach();

	// Back to top btn area start here ***
	$(window).scroll(function () {
		if ($(this).scrollTop() > 20) {
			$("#back-top").addClass("show");
		} else {
			$("#back-top").removeClass("show");
		}
	});

	$("#back-top").click(function () {
		$("html, body").animate({ scrollTop: 0 }, 800);
		return false;
	});
	// Back to top btn area end here ***

	// WOW Animatin area start here ***
	Splitting();
	wow = new WOW({
		animateClass: "animated",
		offset: 100,
		mobile: true,
	});
	wow.init();
	// WOW Animatin area start here ***
})(jQuery);
