jQuery(function($){
	$('.salmond_loadmore').click(function(){
 
		var button = $(this),
		    data = {
			'action': 'loadmore',
			'query': salmond_loadmore_params.posts,
			'page' : salmond_loadmore_params.current_page
		};
 
		$.ajax({
			url : salmond_loadmore_params.ajaxurl,
			data : data,
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.html('<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading');
			},
			success : function( data ){
				if( data ) { 
					button.html( 'More posts' );
					$('.salmond-blog-posts .salmond_loadmore').prev().after(data);
					salmond_loadmore_params.current_page++;
 
					if ( salmond_loadmore_params.current_page == salmond_loadmore_params.max_page ) 
						button.remove();
				} else {
					button.remove();
				}
			}
		});
	});
});