/*
 * validateme
 * https://github.com/moulyg/validatiion
 *
 * Copyright (c) 2016 mouly
 * Licensed under the MIT license.
 */

(function ($) {

    var validationException = function (element, errorMsg, parameters) {
        var pElement = element,
            pErrorMsg = errorMsg,
            pParameters = parameters;

        this.getElement = function () {
            return pElement;
        };

        this.getErrorMessage = function () {
            return pErrorMsg || '';
        };

        this.getParameters = function () {
            return pParameters || {};
        };
    };

    validationException.prototype = new Error();

    // Collection method.
    $.fn.validateme = function () {
        var $this = $(this);
        var _searchElement = function () {
                var errors = false;
                $this.find(':input')
                    .not(':disabled')
                    .not('.valid')
                    .each(function () {
                        
                        var ele, value, validation = [];
                        ele = $(this);
                        value = _getValue(this);
                        validation = _getValidation(ele);
                        if (validation.length > 0) {
                            _checkForErrors(validation, ele, value);
                        }
                    });

                return errors;
            },
            _getValue = function (element) {
                var type = element.type, val = $(element).val();

                if (type === 'radio' || type === 'checkbox') {
                    return $('input[name="' + $(element).attr('name') + '"]:checked').val();
                }
                if (type === 'select-one') {
                    if ($this.options.selectFieldDefault === val) {
                        return '';
                    }
                }

                if (typeof val === 'string') {
                    return val.replace(/\r/g, '');
                }
                return val;
            },
            _getValidation = function (ele) {
                var validation = [];
                if ($.trim(ele.attr('data-valid'))) {
                    validation = $.trim(ele.attr('data-valid')).split(' ');
                }
                return validation;
            },
            _checkForErrors = function (validation, ele, value) {
                var error = false, i;

                for (i = 0; i < validation.length; i++) {
                    var type = validation[i],
                        p = _params[type](ele);
                    p.ele = _getLabel(ele);
                    p.onkey = false;
                    var errorElement = (p.errorElement) ? p.errorElement : ele;
                    var result = _methods[type](value, ele, p);
                    if (!result) {
                        var message = $this.options.messages[type];
                        throw new validationException(errorElement, message, p);
                    } else {
                        errorElement.removeClass("errorElement");
                    }
                }
                return error;
            };

        return this.each(function (i) {
            // Do something awesome to each selected element.
            $(this).html('awesome' + i);
            _searchElement()
        });
    };


    // Static method.
    $.validateme = function (options) {
        // Override default options with passed-in options.
        options = $.extend({}, $.validateme.options, options);
        // Return something awesome.
        return 'awesome' + options.punctuation;
    };

    // Static method default options.
    $.validateme.options = {
        punctuation: '.',
        selectFieldDefault: '',
    };

    // Custom selector.
    $.expr[':'].validateme = function (elem) {
        // Is this element awesome?
        return $(elem).text().indexOf('awesome') !== -1;
    };

}(jQuery));
