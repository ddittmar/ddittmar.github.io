---
layout: post
title:  "jQuery Plugins II"
date:   2015-01-05
categories: javascript jquery
tags: jquery plugin
og_img: http://static-ddittmar.appspot.com/images/blog/jQuery-Logo.png
og_img-alt: jQuery Logo
og_img-width: 400
og_img-height: 102
show_head_img: true
onDocumentReady: > ###
    $.getScript('/js/blog/jquery.blink2.js', function() {
        $('#blink1').blink2();
    });
---
Wie im letzten [Post]({% post_url 2014-12-23-jquery-plugins %}) versprochen gucken wir uns jetzt an wie wir es hin bekommen das Plugin mit Methoden auszustatten. Folgendes wollen wir erreichen:

* Das Blinken lässt sich stoppen. Nach dem Stoppen ist die Schrift 100% sichtbar.
* Das Blinken lässt sich wieder starten.
* Die Konfiguration lässt sich zu Laufzeit ändern.

## Parameter erweitern

Um die gesteckten Ziele zu erreichen müssen wir auf jeden Fall mehr Parameter in das Plugin übergeben können. Ich habe mir gedacht das es doch praktisch wäre wenn man das Plugin so aufrufen könnte:

{% highlight javascript %}
// ohne Paramter:
$('#blink').blink();

// mit einem Kommando:
$('#blink').blink('stop');

// mit Konfiguration:
$('#blink').blink({durationIn: 100, durationOut: 800});

// mit einem Kommando und einer Konfiguration:
$('#blink').blink('start', {durationIn: 100, durationOut: 800});
{% endhighlight %}

Das Plugin muss also um die Möglichkeit erweitert werden die verschiedenen Parameter entgegen zu nehmen. Da es jetzt bald etwas mehr Code wird habe ich den neuen Teil mal markiert:

{% highlight javascript %}
(function ($) {
    $.fn.blink2 = function (arg0, arg1) {
        
        /* <NEW> */
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
        /* </NEW> */
        
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
{% endhighlight %}