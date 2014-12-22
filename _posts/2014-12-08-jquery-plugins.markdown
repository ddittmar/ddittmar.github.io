---
layout: post
title:  "jQuery Plugins"
date:   2014-12-08
categories: javascript jquery
tags: jquery plugin
og_img: http://static-ddittmar.appspot.com/images/blog/jQuery-Logo.png
og_img-alt: jQuery Logo
og_img-width: 400
og_img-height: 102
show_head_img: true
onDocumentReady: > ###
    blinkPlugin($);
    $('.blink').blink();
---
Nachdem wir uns jetzt die grundsätzlichen Dinge angesehen haben kann man jetzt mal ein Plugin angehen. Natürlich sollte man nebenbei die wirklich [exzellente Dokumentation](http://api.jquery.com/) offen haben. Man braucht auch oft ein paar "einfache" Tricks wie diese:

- [AJAX](http://api.jquery.com/category/ajax/)
- manipulation von [Attribute](http://api.jquery.com/category/attributes/)n
- [Effekte](http://api.jquery.com/category/effects/)
- Navigation innerhalb des DOMs ([traversierung](http://api.jquery.com/category/traversing/))

Auf der Seite gibt es außerdem ein sehr gutes [Tutorial](http://learn.jquery.com/) das auch ein Javascript mit einschließt.

## Das Ziel

Es ist etwas schwierig ein Plugin zu schreiben das nicht zu schwierig ist aber trotzdem alles zeigt was man so braucht. Ich habe mich entschlossen ein einfaches Plugin zu schreiben mit dem man so etwas erzeugen kann wie das früher mit dem Blink-Tag (`<blink>`) ging. Das Tag wird nicht mehr von allen Browsern unterstütz und kann jetzt (in modernen Browsern) auch mit CSS3 erzeugt werden. Hier der Effekt der durch unser Mini-Plugin erzeugt wird:

<p class="blink">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

Es ist natürlich selten sinnvoll ein Plugin selber zu schreiben. Bevor man so etwas selber macht sollte man gucken ob man nicht ein geeignetes Plugin in der [jquery Plugin Registry](http://plugins.jquery.com/) findet. Selbst wenn man nicht genau das gewünschte Plugin findet, ist es oft einfacher ein Plugin umzubauen als selber alles von Null zu erfinden.

## Plugin 101

<script type="text/javascript">

/**
 * Das Blink Plugin
 */
var blinkPlugin = function ($) {
    $.fn.blink = function() {
        return this.each(function() {
            
            var $this = $(this);
            
            var fade = function() {
                $this
                    .animate({ opacity: 0.0 }, 400)
                    .animate({ opacity: 1.0 }, 400, function() { fade() });
            };
            fade();
        });
    }
}

</script>