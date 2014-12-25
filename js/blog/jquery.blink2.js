/*jslint vars: true */
/*global jQuery */
(function ($) {
    'use strict';
    
    $.fn.blink2 = function (arg0, arg1) {
        
        var command = "start";
        var settings = {};
        
        if (typeof arg0 === "object") {
            settings = arg0;
        } else if (typeof arg0 === "string") {
            command = arg0;
        }
        
        if (typeof arg0 === "string" && typeof arg1 === "object") {
            settings = arg1;
        }
        
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