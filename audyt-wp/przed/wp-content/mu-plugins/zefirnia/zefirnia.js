jQuery(function ($) {
	$('.k-hero h1').addClass('animate__animated animate__fadeInUp');
	$('.k-cards').slick({
		slidesToShow: 4, slidesToScroll: 1, arrows: false, dots: false, infinite: false,
		responsive: [
			{ breakpoint: 960, settings: { slidesToShow: 2, dots: true } },
			{ breakpoint: 600, settings: { slidesToShow: 1.25, dots: true } }
		]
	});
});
