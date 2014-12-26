/*jslint vars: true */
/*global jQuery */
(function ($) {
    'use strict';
    
    $.fn.blink2 = function (arg0, arg1) {
        
        var command = 'start';
        var settings = {};
        var newSettings = false;
        
        if (typeof arg0 === 'object') {
            settings = arg0;
            newSettings = true;
        } else if (typeof arg0 === 'string') {
            command = arg0;
        }
        
        if (typeof arg0 === 'string' && typeof arg1 === 'object') {
            settings = arg1;
            newSettings = true;
        }
        
        var defaultSettings = {
            durationIn: 400,
            durationOut: 400,
            easingIn: 'swing',
            easingOut: 'swing'
        };
        
        settings = $.extend(defaultSettings, settings);
        
        function blink($elem, settings) {
            
            var $this = $elem;
            var params = settings;
            var command = 'stop';
            
            function animate() {
                if (command === 'start') {
                    $this
                        .animate(
                            { opacity: 0.0 },
                            params.durationOut,
                            params.easingOut
                        )
                        .animate(
                            { opacity: 1.0 },
                            params.durationIn,
                            params.easingIn,
                            animate // LOOP
                        );
                }
            }
            
            function start() {
                if (command === 'stop') {
                    command = 'start';
                    animate();
                }
            }
            
            function stop() {
                command = 'stop';
            }
            
            function newSettings(settings) {
                params = settings;
            }
            
            return {
                start: start,
                stop: stop,
                newSettings: newSettings
            };
        }
        
        this.each(function () {
            var $this = $(this);
            var blinkPlugin = $this.data('blink');
            if (!blinkPlugin) {
                blinkPlugin = blink($this, settings);
                $this.data('blink', blinkPlugin);
            }
            
            if (newSettings) {
                blinkPlugin.newSettings(settings);
            }
            blinkPlugin[command]();
        });
        
        return this;
    };
}(jQuery));