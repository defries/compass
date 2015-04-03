/**
 * Compass Mobile Menu
 * Merge existing menus into an off-canvas mobile menu.
 *
 * Copyright (c) 2015 Flagship Software, LLC;
 * MIT license
 */
(function( $, undefined ) {
	'use strict';

	var	$$,
		cache = {};

	$$ = function(selector) {
		var temp = cache[selector];
		if (temp !== undefined) {
			return temp;
		} else {
			return cache[selector] = $(selector);
		}
	};

	$$.clear = function(selector) {
		cache[selector] = undefined;
	};

	$$.fresh = function(selector) {
		cache[selector] = undefined;
		return $$(selector);
	};

	$.fn.compassMobileMenu = function() {
		var menuSide    = $$( 'body' ).hasClass( 'rtl' ) ? 'left' : 'right',
			$menuButton = $$( '<button type="button" id="menu-toggle" class="menu-button" aria-expanded="false"></button>' );

		// Return early if we don't have any menus to work with.
		if ( 0 === $$( '#menu-primary' ).length && 0 === $$( '#menu-secondary' ).length ) {
			return;
		}

		function menuIsOpen() {
			if ( $$( 'body' ).hasClass( 'menu-open' ) ) {
				return true;
			}
			return false;
		}

		function menusMerged() {
			if ( 0 === $$.fresh( '#menu-primary #secondary' ).length ) {
				return false;
			}
			return true;
		}

		function mergeMenus() {
			if ( 0 === $$( '#menu-primary' ).length || 0 === $$( '#menu-secondary' ).length ) {
				return;
			}
			if ( ! menusMerged() && ! menuIsOpen() ) {
				$$( '#menu-secondary .nav-menu' ).appendTo( '#menu-primary .nav-menu' );
			}
		}

		function splitMenus() {
			if ( 0 === $$( '#menu-secondary' ).length || 0 === $$( '#menu-primary #secondary' ).length ) {
				return;
			}
			$$( '#menu-primary #secondary' ).appendTo( '#menu-secondary .wrap' );
		}

		function toggleClasses() {
			var $mobileMenu = $$( '#menu-primary' ),
				menuClass   = 'menu-primary';

			if ( 0 === $$( '#menu-primary' ).length ) {
				$mobileMenu = $$( '#menu-secondary' );
				menuClass   = 'menu-secondary';
			}
			$mobileMenu.toggleClass( menuClass + ' menu-mobile visible ' + menuSide );
			$menuButton.toggleClass( 'activated' );
		}

		function toggleAttributes() {
			$menuButton.attr('aria-expanded', function(index, attr) {
				return attr === 'false' ? 'true' : 'false';
			});
		}

		function openMenu() {
			if ( menuIsOpen() ) {
				return;
			}
			if ( ! menusMerged() ) {
				mergeMenus();
			}
			toggleClasses();
			toggleAttributes();
		}

		function closeMenu() {
			if ( ! menuIsOpen() ) {
				return;
			}
			if ( menusMerged() && window.innerWidth < 1023 ) {
				splitMenus();
			}
			toggleClasses();
			toggleAttributes();
		}

		function reflowMenus() {
			if ( window.innerWidth >= 1023 ) {
				if ( menusMerged() ) {
					splitMenus();
				}
				closeMenu();
				$$( 'body' ).removeClass( 'menu-open' );
			}

			if ( window.innerWidth < 1023 && ! menusMerged() ) {
				mergeMenus();
			}
		}

		function toggleMenu(event) {
			event.preventDefault();
			openMenu();
			closeMenu();
			$$( 'body' ).toggleClass( 'menu-open' );
		}

		$$( '#branding' ).after( $menuButton );
		$menuButton.on( 'click', toggleMenu );
		$$( window ).resize( reflowMenus );
	};
}( jQuery ));
