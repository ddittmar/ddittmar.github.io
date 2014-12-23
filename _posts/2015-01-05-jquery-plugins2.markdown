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

<p class="blink" id="blink1">foobar</p>