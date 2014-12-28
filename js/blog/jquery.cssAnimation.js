/*global jQuery */
(function ($) {
    'use strict';
    
    $.fn.cssAnimation = function () {
    
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'],
            pfx  = '',
            elm = this[0];

        if (elm.style.animationName !== undefined) {
            animation = true;
        }

        if (animation === false) {
            $.each(domPrefixes, function (i, prefix) {
                if (elm.style[prefix + 'AnimationName'] !== undefined) {
                    pfx = domPrefixes[i];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                }
            });
        }
        
        $(elm).data('animation', {
            animation: animation,
            animationstring: animationstring,
            keyframeprefix: keyframeprefix,
            pfx: pfx
        });

        return this;
    };
}(jQuery));