/*jslint vars: true */
/*global jQuery */
(function ($) {
    'use strict';
    
    $.fn.blink = function (options) {
        
        var settings = options || {};
        
        var defaultSettings = {
            durationIn: 400,
            durationOut: 400,
            easingIn: 'swing',
            easingOut: 'swing'
        };
        
        settings = $.extend(defaultSettings, settings);
        
        this.each(function () {
            var $this = $(this);
            var fade = function () {
                $this
                    .animate({ opacity: 0.0 }, settings.durationOut, settings.easingOut)
                    .animate({ opacity: 1.0 }, settings.durationIn, settings.easingIn, fade);
            };
            fade();
        });
        return this;
    };
}(jQuery));