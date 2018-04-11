$(document).ready(function() {



	// Scroll on div
	$( function() {
	  $('a[href^="#"]').on('click.smoothscroll',function (e) {
	    e.preventDefault();
	    var target = this.hash,
	        $target = $(target);

	    $('html, body').stop().animate( {
	      'scrollTop': $target.offset().top-40
	    }, 900, 'swing', function () {
	      window.location.hash = target;
	    } );
	  } );
	});


  // $('pre code').each(function(i, block) {
  //   hljs.highlightBlock(block);
  // });

});
