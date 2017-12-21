$(document).ready(function($) {
	$('header').mouseenter(function() {
		$(this).addClass('inside');
		$(this).mouseleave(function() {
			$('header').removeClass('inside');
		});
	});
});

$(document).scroll(function($) {
    
});

$(window).load(function($) {
   
});

$(window).resize(function() {
   
});
$(window).trigger('resize');