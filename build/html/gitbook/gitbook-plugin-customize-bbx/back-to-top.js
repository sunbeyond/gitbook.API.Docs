require( [ "gitbook", "jQuery" ], function ( gitbook, $ ) {
	// 回到顶部
	gitbook.events.on( 'page.change', function () {
		var back_to_top_html = '<div class="back-to-top fa fa-arrow-up"></div>';

		$( '.book' ).append( back_to_top_html );

		var $back_to_top = $( '.back-to-top' ),
			$target_body = $( '.book-body, .body-inner' );

		$back_to_top.hide();

		$back_to_top.click( function () {
			$target_body.animate( {
				scrollTop: 0
			}, 800 );
		} );

		// 监听
		$target_body.on( 'scroll', function () {
			if ( $( this ).scrollTop() > 100 ) {
				$back_to_top.fadeIn();
			} else {
				$back_to_top.fadeOut();
			}
		} );
	} );
} );
