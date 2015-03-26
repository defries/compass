<?php
/**
 * A template part for displaying a comment.
 *
 * @package     Compass
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @link        https://flagshipwp.com/
 * @since       1.0.0
 */
?>

<li <?php hybrid_attr( 'comment' ); ?>>

	<?php echo get_avatar( $comment, 48 ); ?>

	<article>
		<header class="comment-meta">
			<cite <?php hybrid_attr( 'comment-author' ); ?>><?php comment_author_link(); ?></cite>
			<a <?php hybrid_attr( 'comment-permalink' ); ?>>
				<time <?php hybrid_attr( 'comment-published' ); ?>>
					<?php
					printf(
						__( '%s ago', 'compass' ),
						human_time_diff( get_comment_time( 'U' ), current_time( 'timestamp' ) )
					);
					?>
				</time>
			</a>
			<?php edit_comment_link(); ?>
		</header><!-- .comment-meta -->

		<div <?php hybrid_attr( 'comment-content' ); ?>>
			<?php comment_text(); ?>
		</div><!-- .comment-content -->

		<footer class="comment-meta">
			<?php hybrid_comment_reply_link(); ?>
		</footer><!-- .comment-meta -->

	</article>
