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
            
            var oldCmd = $this.data('blink-command');
            $this.data('blink-command', command);
            
            var blinkFn = $this.data('blink-function');
            if (!blinkFn) {
                // die Funktion gibt es noch nicht an diesem Element
                blinkFn = function () {
                    var command = $this.data('blink-command');
                    if (command === 'start') {
                        $this
                            .animate({ opacity: 0.0 }, settings.durationOut, settings.easingOut)
                            .animate({ opacity: 1.0 }, settings.durationIn, settings.easingIn, blinkFn);
                    }
                };
                $this.data('blink-function', blinkFn);
                blinkFn();
            } else if (!!blinkFn && oldCmd === 'stop' && command === 'start') {
                // die Funktion gibt es an diesem Element und es soll wieder gestartet werden
                blinkFn();
            }
        });
        
        return this;
    };
}(jQuery));