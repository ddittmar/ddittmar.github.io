---
layout: post
title:  "Wie man das volllaufen der Jquery-Animation-Queue verhindert"
date:   2014-10-14
categories: javascript jquery
tags: jquery animation
onDocumentReady: > ##
    $('.menu-item').hover(
        function() {
            $(this).animate({ marginLeft: '50px' }, 200);
        },
        function() {
            $(this).animate({ marginLeft: '0px' }, 200);
        }
    );
    $('.menu-item2').hover(
        function() {
            $(this).stop().animate({ marginLeft: '50px' }, 200);
        },
        function() {
            $(this).stop().animate({ marginLeft: '0px' }, 200);
        }
    );
---
Ich habe ja schon lange kein Menü mehr selber gestrickt. Das gibt es ja entweder fertig von Bootstrap (o.ä.) oder der Designer hat ein Plugin verwendet. Aber jetzt war es mal wieder soweit und ich musste mal selber was machen. Kennt ihr diesen Effekt wenn ein (schlecht) programmiertes Menü sich alle `hover` Events zu merken scheint und das Menü immer noch auf und zu geht obwohl man schon lange nichts mehr macht? Hier ein Beispiel:

<div>
    <div><div class="menu-item" style="width: 300px; background: #aaa; padding: 5px; border: 1px solid black; margin-bottom: 2px;">foo</div></div>
    <div><div class="menu-item" style="width: 300px; background: #aaa; padding: 5px; border: 1px solid black; margin-bottom: 2px;">bar</div></div>
    <div><div class="menu-item" style="width: 300px; background: #aaa; padding: 5px; border: 1px solid black; margin-bottom: 2px;">foobar</div></div>
</div>
<br/>
Falls ihr den Effekt noch nicht kennt: Fahrt mal mit dem Mauszeiger relativ oft und schnell über das "Menü". Die Balken werden auch noch zappeln wenn ihr schon längt fertig seid. Das ist natürlich kein ordentliches Menü. Hier das (etwas naive) Script:
{% highlight javascript %}
$('.menu-item').hover(
    function() {
        $(this).animate({ marginLeft: '50px' }, 200);
    },
    function() {
        $(this).animate({ marginLeft: '0px' }, 200);
    }
);
{% endhighlight %}
Der Effekt entsteht durch die Jquery-Animation-Queue. Jede Animation die man anfordert wird in eine Queue gepackt. Diese Queue wird dann der Reihenfolge nach abgespielt. D.h. wenn jemand mit der Maus relativ nevös ist läuft die Queue voll, die Effekte können gar nicht so schnell abgespielt werden und das Menü zappelt rum.

Die Lösung des Problem ist zum Glück relativ einfach und liegt in der Jquery-Funkion `stop()`. Diese Funktion stoppt den aktuellen Effekt auf dem entsprechenden Element. Hier eine Demo:

<div>
    <div><div class="menu-item2" style="width: 300px; background: #aaa; padding: 5px; border: 1px solid black; margin-bottom: 2px;">foo</div></div>
    <div><div class="menu-item2" style="width: 300px; background: #aaa; padding: 5px; border: 1px solid black; margin-bottom: 2px;">bar</div></div>
    <div><div class="menu-item2" style="width: 300px; background: #aaa; padding: 5px; border: 1px solid black; margin-bottom: 2px;">foobar</div></div>
</div>
<br/>
Sieht doch gleich viel besser aus oder? Wenn man normal über die Element fährt ist alles in Ordnung und es kommt nicht zu einem Stau in der Queue, da `stop` vorher die aktuell auf dem Element stattfindende Animation abbricht und dann die nächste Animation in die Queue geschoben wird:
{% highlight javascript %}
$('.menu-item2').hover(
    function() {
        $(this).stop().animate({ marginLeft: '50px' }, 200);
    },
    function() {
        $(this).stop().animate({ marginLeft: '0px' }, 200);
    }
);
{% endhighlight %}
Das lässt sich natürlich alles noch im Detail verbessern. Wer mehr wissen möchte lese die Dokumention von Jquery über [Effekte](http://learn.jquery.com/effects/).

<img src="/images/blog/jQuery-Logo.png" class="img-responsive" alt="jQuery Logo" width="400" height="102" />