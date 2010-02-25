/*
* Transforms a regular file input into a FancyFile input which is simply a text input and a basic button that
* you can more easily style.
*/
function FancyFile(file_input) {

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
}

/*
* Create the jQuery function
*/
(function($){
	$.fn.fancyfile = function(options) {

		// Setup default settings
		var settings = jQuery.extend({
		}, options);

		return this.each(function() {
			console.log('creating FancyFile on ' + $(this));
			new FancyFile($(this), settings);
		});

	};
})(jQuery);
