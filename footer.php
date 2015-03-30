<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package     Compass
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @link        https://flagshipwp.com/
 * @since       1.0.0
 */
?>

		<?php tha_footer_before(); ?>

		<footer <?php hybrid_attr( 'footer' ); ?>>

			<?php tha_footer_top(); ?>

			<div <?php hybrid_attr( 'wrap', 'footer' ); ?>>

				<p class="credit">
					<?php
					printf(
						// Translators: 1 is current year, 2 is site name/link, 3 is WordPress name/link, and 4 is theme developer.
						__( 'Copyright &#169; %1$s %2$s. Built on the %3$s starter theme by %4$s.', 'compass' ),
						date_i18n( 'Y' ),
						hybrid_get_site_link(),
						flagship_get_theme_link(),
						flagship_get_credit_link()
					);
					?>
				</p><!-- .credit -->

			</div><!-- .wrap -->

			<?php tha_footer_bottom(); ?>

		</footer><!-- .footer -->

		<?php tha_footer_after(); ?>

	</div><!-- .site-container -->

	<?php tha_body_bottom(); ?>
	<?php wp_footer(); ?>

</body>
</html>
