---
layout: post
title:  "jQuery Plugins"
date:   2014-12-23
categories: javascript jquery
tags: jquery plugin
og_img: http://static-ddittmar.appspot.com/images/blog/jQuery-Logo.png
og_img-alt: jQuery Logo
og_img-width: 400
og_img-height: 102
show_head_img: true
onDocumentReady: > ###
    $.cachedScript('//static-ddittmar.appspot.com/js/blog/jquery.blink.min.js').done(function() {
        $('#blink1').blink();
        $('#blink2').blink({durationOut: 800, durationIn: 100});
    });
---
Nachdem wir uns jetzt die grundsätzlichen Dinge (siehe [101]({% post_url 2014-11-23-jquery-101 %}) und [Tricks]({% post_url 2014-12-06-jquery-tricks %})) angesehen haben kann man jetzt mal ein Plugin angehen. Natürlich sollte man nebenbei die wirklich [exzellente Dokumentation](http://api.jquery.com/) offen haben. Man braucht auch oft ein paar "einfache" Tricks wie diese:

- [AJAX](http://api.jquery.com/category/ajax/)
- manipulation von [Attribute](http://api.jquery.com/category/attributes/)n
- [Effekte](http://api.jquery.com/category/effects/)
- Navigation innerhalb des DOMs ([traversierung](http://api.jquery.com/category/traversing/))

Auf der Seite gibt es außerdem ein sehr gutes [Tutorial](http://learn.jquery.com/) das auch ein Javascript mit einschließt.

Das hier ist der dritte Artikel in einer kleinen jQuery-Serie. Hier weitere Artikel:

* [jQuery 101 (Grundlagenwissen)]({% post_url 2014-11-23-jquery-101 %})
* [jQuery Tricks]({% post_url 2014-12-06-jquery-tricks %})
* [jQuery Plugins II]({% post_url 2014-12-26-jquery-plugins2 %})

## Das Ziel

Es ist etwas schwierig ein Plugin zu schreiben das nicht zu schwierig ist aber trotzdem alles zeigt was man so braucht. Ich habe mich entschlossen ein einfaches Plugin zu schreiben mit dem man so etwas erzeugen kann wie das früher mit dem Blink-Tag (`<blink>`) ging. Das Tag wird nicht mehr von allen Browsern unterstütz und kann jetzt (in modernen Browsern) auch mit CSS3 erzeugt werden. Hier der Effekt der durch unser Mini-Plugin erzeugt wird:

<p id="blink1" class="blink">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

Es ist natürlich selten sinnvoll ein Plugin selber zu schreiben. Bevor man so etwas selber macht sollte man gucken ob man nicht ein geeignetes Plugin in der [jquery Plugin Registry](http://plugins.jquery.com/) findet. Selbst wenn man nicht genau das gewünschte Plugin findet, ist es oft einfacher ein Plugin umzubauen als selber alles von Null zu erfinden.

Das Plugin wie ich es für diesen Post entwickelt habe findet ihr [hier](/js/blog/jquery.blink.js). **Bitte nicht erschrecken!** :wink: Das Plugin zeigt natürlich den Entzustand den wir hier am Ende des Post erreichen. Wir werden im folgenden das Plugin ganz lansam Schritt für Schritt aufbauen.

## Plugin 101

Sehen wir uns kurz das an was jedes jQuery-Plugin braucht. Der Rahmen des Plugins ist einfach, ließt sich aber etwas kryptisch:

{% highlight javascript %}
(function ($) {
    $.fn.blink = function() {
        // do magic here...
        return this;
    };
}(jQuery));
{% endhighlight %}

In der ersten und der letzen Zeile wird eine `function` definiert und auch direkt aufgerufen. Es handelt sich hier um einen einfachen Trick, der es dem Author des Plugins erlaubt im Plugin auf jQuery normal mit dem `$` zuzugreifen auch wenn der Rest der Anwendung `$` für etwas anderes Verwendet (siehe [jQuery.noConflict()](http://api.jquery.com/jquery.noconflict/)). Das vereinfacht die Entwicklung des Plugins enorm.

Innerhalb der `function($)` wird dann eine neue Funktion an dem jQuery `fn` Objekt registriert. In unserem Fall heißt die Funktion `blink`, da wir mit diesem Namen unser Plugin auf die gewählten Elemente anwenden wollen. Der blinkede Text oben wird z.B. so zum blinken gebracht:

{% highlight javascript %}
$('.blink').blink();
{% endhighlight %}

Die unter dem Namen regestrierte Funktion wird dann beim Anwenden des Plugins ausgeführt. In der Funktion kann man dann ganz normal machen was man will. Es ist aber enorm **WICHTIG** das ihr am Ende der Funktion `this` zurück gebt. Wenn das nicht passiert ist es nicht möglich nach dem Anwenden des Plugins noch weiter jQuery Funktionen zu verketten. Das hier wäre dann z.B. nicht möglich:

{% highlight javascript %}
$('.blink').blink().click(function(e) {
    // hier toller Click-Handler...
});
{% endhighlight %}

Anders als sonst bei jQuery (z.B. im Click-Handler) ist innerhalb des Plugins das `this` bereits ein jQuery 'Dingens'. Man sollte also `this` **nicht** erneut in ein jQuery 'Dingens' wandeln (`$(this)`). Das funktioniert zwar ist aber unnötiger overhead.  

## Make it work

Getreu dem Motto

> Make It Work. Make It Right. Make It Fast.

machen wir uns jetzt erstmal dran eine Basis-Version zu erstellen. Eine Art blinken zu erzeugen ist im Prinzip nichts anderes als das Element durchsichtig zu machen und es anschließend wieder sichtbar zu machen. Das ist eine relative einfache Animation, die mit jQuery leicht erzeugt ist. Die Basisversion sieht dann so aus:

{% highlight javascript %}
(function ($) {
    $.fn.blink = function() {
        this.each(function() {
            var $this = $(this);
            var fade = function() {
                $this
                    .animate({ opacity: 0.0 }, 400)
                    .animate({ opacity: 1.0 }, 400, fade);
            };
            fade();
        });
        return this;
    };
}(jQuery));
{% endhighlight %}

Hier sieht man auch gleich noch eine andere Besonderheit, die aber logisch erscheint wenn man sich das genau überlegt. `this` ist innerhalb des Plugins eine Sammlung der Elemente die mit jQuery selektiert wurden. Das muss so sein da man mit jQuery mit z.B. `$('.blink')` alle Elemente mit der entsprechenden Klasse wählt und dann auf alle Elemente das Plugin anwendet. Deshalb geht das Plugin alle Elemente mit `each` durch und wendet überall die Animation an.

## Make it right

Man schreibt ein Plugin natürlich nur um ein Stück Code möglichst wiederverwendbar zur Verfügung zu stellen. Wenn man sich die Version die wir jetzt haben so ansieht fällt natürlich gleich auf das unser Plugin wenig wiederverwendbar ist:

* Man kann nicht einstellen wie lange das Einblenden läuft.
* Man kann nicht einstellen wie lange das Ausblenden läuft.
* Man kann den Übergangs-Effekt nicht einstellen.
* Das Plugin kann nicht gestoppt/gestartet werden.
* usw... usw...

Kümmern wir uns erstmal darum das man dem Plugin ein paar Einstellungen übergeben kann.

### Einstellungen

Einstellungen in ein Plugin zu übergeben ist relativ einfach. Aber bevor wir damit beginnen ziehen wir die Einstellungsparameter die wir jetzt schon haben in ein Objekt innerhalb des Plugins:

{% highlight javascript %}
(function ($) {
    $.fn.blink = function() {
        
        var settings = {
            durationIn: 400,
            durationOut: 400,
            easingIn: 'swing',
            easingOut: 'swing'
        };
        
        this.each(function() {
            var $this = $(this);
            var fade = function() {
                $this
                    .animate({ opacity: 0.0 }, settings.durationIn, settings.easingIn)
                    .animate({ opacity: 1.0 }, settings.durationOut, settings.easingOut, fade);
            };
            fade();
        });
        return this;
    };
}(jQuery));
{% endhighlight %}

Jetzt müssen wir nur ein Einstellungsobjekt in das Plugin übergeben und unser Settings-Objekt erweitern ([jQuery.extend()](http://api.jquery.com/jquery.extend/)). Dann sieht das Plugin so aus:

{% highlight javascript %}
(function ($) {    
    $.fn.blink = function (options) {
        
        var settings = options || {};
        
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

Und um es dann mal anders blinken zu lassen:

{% highlight javascript %}
$('#blink2').blink({durationOut: 800, durationIn: 100});
{% endhighlight %}

Was dann so aussieht:

<p id="blink2" class="blink">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

### starten/stoppen

Das man Methoden auf einem Plugin aufrufen kann ist durchaus üblich. Meistens sieht man so etwas bei Dialogen und ähnlichem.

Wenn wir unser Mini-Plugin so umschreiben wollen das wir es beliebig starten und stoppen können, ist ein größerer Umbau notwendig. Deshalb verschiebe ich das auf den nächsten Post zu diesem Thema.

## Make it fast

Da wir hier keine größeren Manipulationen am DOM vornehmen und auch sonst nicht viel machen müssen wir hier nichts optimieren. Wenn jemandem etwas auffällt kann er sich ja melden :wink:. Das einzige das mir so spontan einfällt: Man könnte die Animation durch CSS machen. Das Plugin müsste dann feststellen ob der Browser das kann und ggf. die passenden CSS Regeln einfügen. Der Code den wir jetzt haben wäre dann der Fallback falls jemand mit einem alten Browser kommt. Aber das ist sicher auch ein Thema für einen späteren Post.

Ich hoffe das war soweit verständlich :grin:. Bis zum [nächsten Artikel]({% post_url 2014-12-26-jquery-plugins2 %}) :punch:
