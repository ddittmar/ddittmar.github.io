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
    $.getScript('/js/blog/jquery.blink2.js');
---
Wie im letzten [Post]({% post_url 2014-12-23-jquery-plugins %}) versprochen gucken wir uns jetzt an wie wir es hin bekommen das Plugin mit Methoden auszustatten. Folgendes wollen wir erreichen:

* Das Blinken lässt sich stoppen. Nach dem Stoppen ist die Schrift 100% sichtbar.
* Das Blinken lässt sich wieder starten.
* Die Konfiguration lässt sich zu Laufzeit ändern.

Wir werden jetzt gemeinsam das einfache [Plugin](/js/blog/jquery.blink.js) aus dem letzten [Post]({% post_url 2014-12-23-jquery-plugins %}) erweitern.

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

Der Trick beim starten und stoppen einzelner Elemente ist [jQuery.data()](http://api.jquery.com/jquery.data/). So kann man beliebiges Zeug an einem Element direkt speichern:

{% highlight javascript %}
(function ($) {
    $.fn.blink2 = function (arg0, arg1) {
        
        var command = 'start';
        var settings = {};
        
        if (typeof arg0 === 'object') {
            settings = arg0;
        } else if (typeof arg0 === 'string') {
            command = arg0;
        }
        
        if (typeof arg0 === 'string' && typeof arg1 === 'object') {
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
        function blink($elem) {
            
            var $this = $elem;
            var command = 'stop';
            
            function animate() {
                if (command === 'start') {
                    $this
                        .animate(
                            { opacity: 0.0 },
                            settings.durationOut,
                            settings.easingOut)
                        .animate(
                            { opacity: 1.0 },
                            settings.durationIn,
                            settings.easingIn,
                            animate);
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
            
            return {
                start: start,
                stop: stop
            };
        }
        
        this.each(function () {
            var $this = $(this);
            var blinkPlugin = $this.data('blink');
            if (!blinkPlugin) {
                blinkPlugin = blink($this);
                $this.data('blink', blinkPlugin);
            }
            blinkPlugin[command]();
        });
        /****** </NEW> ******/
        
        return this;
    };
}(jQuery));
{% endhighlight %}

Hier wird die Logik für das starten, stoppen und animieren direkt an dem betroffenen Element gespeichert. So muss das Plugin eigentlich nur noch feststellen ob es auf dem Element schon angewendet wurde und dann muss nur das entsprechende Kommando aufgerufen werden.

## Settings

Da die Variable `settings` in der Animations-Funktion durch Function-Scoping zum Aufrufzeitpunk der Funktion fest gesetzt wird kann sie nicht zur Laufzeit geändert werden. Aber das Problem lässt sich jetzt ja leicht durch Wiederholung des gelernten beheben:

{% highlight javascript %}
(function ($) {
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
{% endhighlight %}

Man muss nur daran denken das man die Einstellungen ja nicht bei jedem Aufruf mit `start` oder `stop` überschreiben will. Deshalb habe ich noch einen Boolean eingeführt mit dem das Plugin feststellt ob es neue Einstellungen gibt oder nicht.

Hier ein paar Beispiele, die unten auf die Socia-Media-Buttons wirken:

<a class="btn btn-default" href="javascript:$('.btn-social').blink2();" role="button">`$('.btn-social').blink2();`</a>

<a class="btn btn-default" href="javascript:$('.btn-social').blink2('stop');" role="button">`$('.btn-social').blink2('stop');`</a>

<a class="btn btn-default" href="javascript:$('.btn-twitter').blink2({durationIn:100,durationOut:100});" role="button">`$('.btn-social').blink2({durationIn:100,durationOut:100});`</a>

<a class="btn btn-default" href="javascript:$('.btn-twitter').blink2({durationIn:400,durationOut:400});" role="button">`$('.btn-social').blink2({durationIn:400,durationOut:400});`</a>

Alles andere könnt ihr ja auf der Konsole des Browsers ausprobieren. Das fertige Plugin findet ihr [hier](/js/blog/jquery.blink2.js).