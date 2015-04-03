/**
 * Compass Mobile Menu
 * Merge existing menus into an off-canvas mobile menu.
 *
 * Copyright (c) 2015 Flagship Software, LLC;
 * MIT license
 */
(function( $, undefined ) {
	'use strict';

	var $$,
		cache = {};

	$$ = function( selector ) {
		var temp = cache[selector];
		if ( temp !== undefined ) {
			return temp;
		}
		return cache[selector] = $( selector );
	};

	$$.clear = function( selector ) {
		cache[selector] = undefined;
	};

	$$.fresh = function( selector ) {
		cache[selector] = undefined;
		return $$( selector );
	};

	$.fn.compassMobileMenu = function() {
		var $menuButton = $$( '<button type="button" id="menu-toggle" class="menu-button" aria-expanded="false"></button>' ),
			$mobileMenu = $$( '#menu-primary' ),
			menuSide    = $$( 'body' ).hasClass( 'rtl' ) ? 'left' : 'right',
			menuClass   = 'menu-primary';

		// Return early if we don't have any menus to work with.
		if ( 0 === $$( '#menu-primary' ).length && 0 === $$( '#menu-secondary' ).length ) {
			return;
		}

		if ( 0 === $$( '#menu-primary' ).length ) {
			$mobileMenu = $$( '#menu-secondary' );
			menuClass   = 'menu-secondary';
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
			$mobileMenu.toggleClass( menuClass + ' menu-mobile visible ' + menuSide );
			$menuButton.toggleClass( 'activated' );
		}

		function toggleAttributes() {
			$menuButton.attr('aria-expanded', function(index, attr) {
				return attr === 'false' ? 'true' : 'false';
			});
			if ( $mobileMenu.attr( 'tabindex' ) ) {
				$mobileMenu.removeAttr( 'tabindex' );
			} else {
				$mobileMenu.attr( 'tabindex', '0' );
			}
		}

		function focusMobileMenu() {
			var nav        = $mobileMenu[0],
				navID      = $mobileMenu.attr( 'id' ),
				$items     = $( '#' + navID + ' a' ),
				$firstItem = $items.first(),
				$lastItem  = $items.last(),
				firstItem  = $firstItem[0],
				lastItem   = $lastItem[0];

			// When focus is on the menu container.
			$mobileMenu.on( 'keydown', function( e ) {
				// If it's not the tab key then return.
				if ( 9 !== e.keyCode ) {
					return;
				}
				// When tabbing forwards and tabbing out of the last link.
				if ( lastItem === e.target && ! e.shiftKey ) {
					$menuButton.focus();
					return false;
				}
				// When tabbing backwards and tabbing out of the first link OR the menu container.
				if ( ( firstItem === e.target || nav === e.target ) && e.shiftKey ) {
					$menuButton.focus();
					return false;
				}
			});

			$menuButton.on( 'keydown', function( e ) {
				// If it's not the tab key then return.
				if ( 9 !== e.keyCode ) {
					return;
				}
				// when tabbing forwards
				if ( $menuButton[0] === e.target && ! e.shiftKey ) {
					$mobileMenu.focus();
				}
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
			focusMobileMenu();
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
