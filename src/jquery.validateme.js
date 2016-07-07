/*
 * validateme
 * https://github.com/moulyg/validatiion
 *
 * Copyright (c) 2016 mouly
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.validateme = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.validateme = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.validateme.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.validateme.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].validateme = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
