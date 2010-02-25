/*
* Transforms a regular file input into a FancyFile input which is simply a text input and a basic button that
* you can more easily style.
*/
function FancyFile(i, file_input, settings) {


	// Create and attach the wrapper
	var wrapper = $("<div class='jquery_fancyfile_wrapper' />").css({
		'position':'relative',
		'height':file_input.height()
	});
	file_input.wrap(wrapper);


	// Create and attach the button
	var button = $("<input type='button' class='jquery_fancyfile_button' value='Browse...' />").css({
		'position':'absolute',
		'right':'0px'
	});
	file_input.before(button);

	// Create and attach the text field
	var text_field = $("<input type='text' class='jquery_fancyfile_text_field' />").css({
		'position':'absolute',
		'top':'0px',
		'left':'0px',
		'z-index':'0'
	}).width(file_input.outerWidth() - button.outerWidth() - parseInt(button.css('margin-left')));
	file_input.before(text_field);

	// Style the file input
	file_input.css({
		'opacity':'0',
		'position':'absolute',
		'text-align':'right',
		'top':'0px',
		'z-index':'2'
	});


	// Set the text field's value to the file input's value
	file_input.change(function() {
		text_field.val($(this).val());
	});


	// Clone the original file input so that we can replace it with a fresh copy if we need to clear it
	var initializer_input = file_input.clone();
	initializer_input.attr('id', 'jquery_fancyfile_initializer_' + i + '_' + initializer_input.attr('id')).css({
		'display':'none'
	}).addClass('jquery_fancyfile_initializer');

	file_input.before(initializer_input);
}



/*
 * Create the jQuery functions
 */
(function($){
	$.fn.fancyfile = function(options) {

		// Setup default settings
		var settings = jQuery.extend({
		}, options);

		return this.each(function(i, e) {
			new FancyFile(i, $(this), settings);

			return $(this);
		});

	};

	// Allows a FancyFile to be reset back to default (no file to upload)
	$.fn.fancyfile_reset = function(options) {
		return this.each(function(i, e) {
			var wrapper = $(this).parent();
			var initializer = $(this).prev('input.jquery_fancyfile_initializer');
			var text_field = $(this).prevAll('input.jquery_fancyfile_text_field').first();

			var new_file_input = initializer.clone();
			new_file_input.css('display', $(this).css('display'));
			new_file_input.attr('id', new_file_input.attr('id').replace(/jquery_fancyfile_initializer_[0-9]*_/, ''));

			wrapper.replaceWith(new_file_input);
			return new_file_input.fancyfile();
		});
	};
})(jQuery);
