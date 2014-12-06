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

Wirklich sehr sehr praktisch. Das wird man dann später im Einsatz wirklich zu schätzen wissen.

## Utilities

### each()

`each` gibt es in jQuery (leider) zwei mal. Das führt öfter zu Verwirrungen und Debug-Sessions.

Ein mal gibt es ein `each` um Arrays oder Objekte zu iterieren. Das ist natürlich "nur" eine kleine Hilfe bei der JavaScript Programmierung:
{% highlight javascript %}
// Array
$.each(['foo', 'bar', 'foobar'], function(idx, val) {
    console.log(idx + ' = ' + val);
}); // => ['foo', 'bar', 'foobar']
// Object
$.each({foo: 'bar', bla:'laber'}, function(k, v) {
    console.log(k + ' => ' + v);
}); // => {foo: 'bar', bla:'laber'}
{% endhighlight %}
Um die Programmierung weiter zu vereinfachen gibt die Funktion das durchlaufene Array oder Objekt zurück so das man den nächsten Methodenaufruf gleich hinten dran ketten kann. Hier ist zu beachten das die Funktion `each` nur im Namensraum `$` definiert wurde. Es wird **nicht** eine Funktion `each` auf dem Array (oder Objekt) aufgerufen.

Das zweite `each` ist ein Methode auf dem jQuery Objekt das man nach einer Selektion zurück bekommt. Hier im Beispiel werden alle `<h1>`, `<h2>` und `<h3>` Überschriften selektiert und dann deren Inhalte ausgegeben:
{% highlight javascript %}
var arr = [];
$('h1').add($('h2')).add($('h3')).each(function(idx, elem) {
    arr.push($(elem).text());
});
console.log(arr.join(','));
{% endhighlight %}
Natürlich ist diese Funktion ebenso nützlich. Aber man beachte das es sich natürlich um ein anderes `each` handelt.

Das gefährliche ist das es zwei Funktionen gibt die gleich heißen und fast das gleich tun. Im Hintergrund passiert natürlich jedes mal etwas anderes. Das kann man leicht mal verdrehen und wie gesagt führt das oft zu Fehlern. *You have been warned* :grin:

### extend()

Ein wirklich sehr nützliche Funktion (wenn man später mal ein Plugin schreibt) ist die Funktion `$.extend()`. Generell betrachtet werden die Einträge des ersten Objekts mit den Einträgen aus den weiteren Objekten überschrieben. Das ist sehr nützlich wenn man bei einem Plugin einen Haufen Default-Parameter mit einigen übergebenen Parameter-Objekten überschreiben möchte.
{% highlight javascript %}
var obj1 = { eins: 'foo', zwei: 'bar' };
var obj2 = { zwei: 'baz', drei: 'foobar'};
var obj3 = { bla: 'laber' };
var result = $.extend(obj1, obj2, obj3);
console.log(result); // {eins: "foo", zwei: "baz", drei: "foobar", bla: "laber"}
console.log(obj1); // {eins: "foo", zwei: "baz", drei: "foobar", bla: "laber"}
console.log(obj2); // {zwei: "baz", drei: "foobar"}
console.log(obj3); // {bla: "laber"}
{% endhighlight %}
Wie man sieht wird das erste Objekt mit den anderen Objekten überschrieben und dann zurück gegeben. Wenn man das erste Objekt nicht ändern möchte kann man als ersten Parameter ein leeres Objekt angeben:
{% highlight javascript %}
var obj1 = { eins: 'foo', zwei: 'bar' };
var obj2 = { zwei: 'baz', drei: 'foobar'};
var obj3 = { bla: 'laber' };
var result = $.extend({}, obj1, obj2, obj3);
console.log(result); // {eins: "foo", zwei: "baz", drei: "foobar", bla: "laber"}
console.log(obj1); // {eins: "foo", zwei: "bar"}
console.log(obj2); // {zwei: "baz", drei: "foobar"}
console.log(obj3); // {bla: "laber"}
{% endhighlight %}

## und jetzt?

Ja, jetzt ist hier erstmal Schluss. Im nächsten Post werden wir und dann mal ansehen wie man ein einfaches Plugin schreibt. Dabei werden wir und dann auch gleich noch ein paar Tricks angucken mit denen man die Performance steigern kann. Das ist gerade bei Plugins die viel Zeug machen manchmal schon angebracht.
