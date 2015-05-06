/*
 * ValidationPlugin
 * https://github.com/HP/ValidationPlugin
 *
 * Copyright (c) 2015 mouly
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.ValidationPlugin = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.ValidationPlugin = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.ValidationPlugin.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.ValidationPlugin.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].ValidationPlugin = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
