/* global skipLinkFocus */
/**
 * JavaScript for Compass
 *
 * Includes all JS which is required within all sections of the theme.
 */
window.compass = window.compass || {};

(function( window, $, undefined ) {
	'use strict';

	var $document = $( document ),
		$body     = $( 'body' ),
		compass   = window.compass;

	$.extend( compass, {

		//* Global script initialization
		globalInit: function() {
			var $videos = $( '#site-inner' );
			$body.addClass( 'ontouchstart' in window || 'onmsgesturechange' in window ? 'touch' : 'no-touch' );
			$document.gamajoAccessibleMenu();
			$document.compassMobileMenu();
			$videos.fitVids();
		}

	});

	// Document ready.
	jQuery(function() {
		skipLinkFocus.init();
		compass.globalInit();
	});
})( this, jQuery );
