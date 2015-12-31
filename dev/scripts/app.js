$(document).ready(function () {


    // Cover top video controls ===

    $(".hero-control").on( "click", function () {
        $(".hero-video").prop('muted', false);
        $('.hero-mute').addClass('animated');
    });

    // imessages ====

    $('.imessage-bubble').onScreen({
	   doIn: function() {
			$('.imessage-bubble').addClass('sent');

			//show reply
			setTimeout( function(){
		        $('.reply-choose').addClass('sent');
		    },1000);
	   },
	   tolerance: 100,
	   throttle: 500
	});

    $(".positive-cta").on( "click", function () {
        $('.reply-text-or, .negative-cta').addClass('no-display');
        $('.reply-choose').addClass('selected');

        setTimeout( function(){
		    $('.imessage-share').addClass('sent');
		},400);

        
    });



    




    // FAQs ====
    $(".question-wrap").on( "click", function () {
        $(this).toggleClass('expanded');
    });



});









   // setTimeout( function(){
   //     $('.center-card').removeClass('hidden');
   // },900);


