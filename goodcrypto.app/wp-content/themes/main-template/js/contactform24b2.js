( function( $ ) {
	// adding return url to input
	document.addEventListener( 'wpcf7beforesubmit', function( event ) {
		event.detail.formData.append('send-from-url', window.location.href);
	}, false );$
	
	// overriding wpcf7 ajax endpoints
	wpcf7.apiSettings.getRoute = function( ) {
        return wpcf7_override.endpoint;
    };
	
	// disabling refill
	wpcf7.refill = function( ) { }
} )( jQuery );