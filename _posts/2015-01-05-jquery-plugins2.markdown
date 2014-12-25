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
$('#blink').blink2();

// mit einem Kommando:
$('#blink').blink2('stop');

// mit Konfiguration:
$('#blink').blink2({durationIn: 100, durationOut: 800});

// mit einem Kommando und einer Konfiguration:
$('#blink').blink2('start', {durationIn: 100, durationOut: 800});
{% endhighlight %}

Das Plugin muss also um die Möglichkeit erweitert werden die verschiedenen Parameter entgegen zu nehmen. Da es jetzt bald etwas mehr Code wird habe ich den neuen Teil mal markiert:

{% highlight javascript %}
(function ($) {
    $.fn.blink2 = function (arg0, arg1) {
        
        /****** <NEW> ******/
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
        /****** </NEW> ******/
        
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

## starten / stoppen

Der Trick beim starten und stoppen einzelner Elemente ist die erforderlichen Daten an dem Element selber aufzubewaren. So lässt sich leicht feststellen in welchem Zustand sich dass Plugin an dem jeweiligen Element befindet:
{% highlight javascript %}
/*jslint vars: true */
/*global jQuery */
(function ($) {
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
        
        /****** <NEW> ******/
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
        /****** </NEW> ******/
        
        return this;
    };
}(jQuery));
{% endhighlight %}

Da die Funktion zur Animation und der das aktuelle Kommando an dem Element mit [jQuery.data()](http://api.jquery.com/jquery.data/) direkt gespeichert werden kann das Plugin an jedem Element einzeln gesteuert werden.