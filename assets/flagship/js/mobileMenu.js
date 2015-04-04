/**
 * Compass Mobile Menu
 * Merge existing menus into an off-canvas mobile menu.
 *
 * @version   0.1.0
 * @copyright 2015 Flagship Software, LLC;
 * @license   MIT
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
			menuClass   = 'menu-primary';

		// Return early if we don't have any menus to work with.
		if ( 0 === $$( '#menu-primary' ).length && 0 === $$( '#menu-secondary' ).length ) {
			return;
		}

		if ( 0 === $$( '#menu-primary' ).length ) {
			$mobileMenu = $$( '#menu-secondary' );
			menuClass   = 'menu-secondary';
		}

		/**
		 * Helper function to check whether or not the mobile menu is currently
		 * open and visible.
		 *
		 * @since  0.1.0
		 * @return {Boolean} Returns true if the menu is open.
		 */
		function menuIsOpen() {
			if ( $$( 'body' ).hasClass( 'menu-open' ) ) {
				return true;
			}
			return false;
		}

		/**
		 * Helper function to check whether or not our existing menus have been
		 * merged into a single menu for mobile display.
		 *
		 * @since  0.1.0
		 * @return {Boolean} Returns true if the menus have been merged.
		 */
		function menusMerged() {
			if ( 0 === $$.fresh( '#menu-primary #secondary' ).length ) {
				return false;
			}
			return true;
		}

		/**
		 * Prepare our mobile menu by merging our existing menus together if we
		 * have more than one.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function mergeMenus() {
			if ( 0 === $$( '#menu-primary' ).length || 0 === $$( '#menu-secondary' ).length ) {
				return;
			}
			if ( ! menusMerged() && ! menuIsOpen() ) {
				$$( '#menu-secondary .nav-menu' ).appendTo( '#menu-primary .nav-menu' );
			}
		}

		/**
		 * If we have two menus which have been merged, this will split them
		 * back into two separate menus using the same format as before they
		 * were merged.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function splitMenus() {
			if ( 0 === $$( '#menu-secondary' ).length || 0 === $$( '#menu-primary #secondary' ).length ) {
				return;
			}
			$$( '#menu-primary #secondary' ).appendTo( '#menu-secondary .wrap' );
		}

		/**
		 * This will toggle all classes related to a menu being in an open or
		 * closed state except for the body class as it is used as a guide for
		 * whether or not the mobile menu has been opened.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function toggleClasses() {
			$mobileMenu.toggleClass( menuClass + ' menu-mobile visible' );
			$menuButton.toggleClass( 'activated' );
		}

		/**
		 * This will toggle all attributes related to a menu being in an open or
		 * closed state. Most of these changes are made for a11y reasons.
		 *
		 * @since  0.1.0
		 * @return void
		 */
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

		/**
		 * This forces the focus state of either the mobile menu or the menu
		 * button when a user is tabbing through the mobile menu. When a user
		 * opens the mobile menu, it is given the focus so keyboard navigation
		 * will work as expected as the user tabs through the menu items.
		 *
		 * When a user tabs out of either the end or beginning of the menu,
		 * focus will be restored to the mobile menu button so the menu can be
		 * closed by pressing enter.
		 *
		 * @since  0.1.0
		 * @todo   Maybe split this into multiple functions
		 * @return {booleen} false when focus has been changed.
		 */
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

		/**
		 * This fires all methods required to open the mobile menu.
		 *
		 * @since  0.1.0
		 * @return void
		 */
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

		/**
		 * This fires all methods required to close the mobile menu.
		 *
		 * @since  0.1.0
		 * @return void
		 */
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

		/**
		 * This will either split or merge our existing menus based on screen
		 * width. In addition to splitting or merging the menus, it will also
		 * force the menu to close if the screen is larger than the specified
		 * width for a mobile menu to be displayed.
		 *
		 * @since  0.1.0
		 * @return void
		 */
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

		/**
		 * This fires all methods required to either open or close the mobile
		 * menu. It is meant to be attached to a click or touch event.
		 *
		 * @since  0.1.0
		 * @param {object} event The current event being fired.
		 * @return void
		 */
		function toggleMenu( event ) {
			event.preventDefault();
			openMenu();
			closeMenu();
			$$( 'body' ).toggleClass( 'menu-open' );
		}

		/**
		 * This is the final method which actually loads all of our mobile
		 * menu functionality. It merges our menus on load if the user is on a
		 * screen small enough for a mobile menu, injects our menu button, and
		 * handles the opening and closing of the menu as-needed.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function loadMobileMenu() {
			reflowMenus();
			$$( '#branding' ).after( $menuButton );
			$menuButton.on( 'click', toggleMenu );
			$$( window ).resize( reflowMenus );
		}

		loadMobileMenu();
	};
}( jQuery ));
