---
layout: post
title:  "jQuery Tricks"
date:   2014-11-30
categories: javascript jquery
tags: jquery basics
og_img: http://static-ddittmar.appspot.com/images/blog/jQuery-Logo.png
og_img-alt: jQuery Logo
og_img-width: 400
og_img-height: 102
show_head_img: true
---
Bevor man mit JQuery dazu kommt Plugins zu schreiben sollte man noch einige Tricks in sein Arsenal aufnehmen. So ein paar extra Tricks helfen ungemein bei der Entwicklung eines Plugins und steigern zudem die lesbarkeit und die Performance.

## Data

Man muss recht häufig ein paar Daten im DOM hinterlegen damit man später anhand der Daten etwas machen kann oder das Element wiedererkennt oder erkennt das hier das Plugin schon angewendet wurde (oder oder oder...). Zum Glück hat jQuery da was sehr praktisches um mit den [Data-Attributen](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) zu hantieren auch wenn der Browser HTML5 gar nicht unterstützt.

Erstmal kann  man ja beim rendern ein Data-Attribute mit ausgeben damit man später darauf zugreifen kann. Hier in diese Seite ist beispielsweise dieses verstecktes `div` eingebaut:
{% highlight html %}
<div id="test" style="display:none" data-foo-bar="foobar">toller Text hier!</div>
{% endhighlight %}
<div id="test" style="display:none" data-foo-bar="foobar">toller Text hier!</div>

Das `div` ist ja leicht mit der `id` zu finden. D.h. ihr könnt den Inhalt also mit einem der folgenden Zeilen auf der Konsole des Browsers ausgeben:
{% highlight javascript %}
console.log($('#test').data('fooBar'));
console.log($('#test').data('foo-bar'));
{% endhighlight %}

Wenn man (z.B. in einem Plugin) Daten an einem Element hinterlegen oder ändern will kann man das wie gewohnt tun:
{% highlight javascript %}
// ändern
$('#test').data('fooBar', 'foo-bar');
// anlegen
$('#test').data('testEins', 'eins');
$('#test').data('testZwei', 'zwei');
{% endhighlight %}

Wirklich sehr sehr praktisch. Wird man dann später feststellen :grin:.
