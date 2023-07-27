<?php
/**
 * Tests for Fonts Library class
 *
 * @package    Gutenberg
 * @subpackage Fonts Library
 */

/**
 * @coversDefaultClass WP_Fonts_Library
 */
class WP_Fonts_Library_Test extends WP_UnitTestCase {

	/**
	 * @covers ::get_fonts_directory
	 */
	public function test_get_fonts_directory() {
		$this->assertStringEndsWith( '/wp-content/fonts', WP_Fonts_Library::get_fonts_directory() );
	}

	/**
	 * @covers ::get_relative_fonts_path
	 */
	public function test_get_relative_fonts_path() {
		$this->assertStringEndsWith( '/wp-content/fonts/', WP_Fonts_Library::get_relative_fonts_path() );
	}

}
