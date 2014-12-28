---
layout: post
title:  "CSS3 Animation"
date:   2014-12-27
categories: css
tags: css3 css animation
og_img: /images/blog/HTML5_Badge_256.png
og_img-alt: HTML5 Powered
og_img-width: 256
og_img-height: 256
show_head_img: false
onDocumentReady: > ###
    $.getScript('/js/blog/jquery.cssAnimation.js',
        function() {
            $('#noAnimation').cssAnimation();
            if (!($('#noAnimation').data('animation').animation)) {
                $('#noAnimation').show();
            }
        }
    );
---
<style type="text/css">
.blinking {
    animation: blink 400ms ease-in-out infinite alternate;
    -o-animation: blink 400ms ease-in-out infinite alternate;
    -moz-animation: blink 400ms ease-in-out infinite alternate;
    -webkit-animation: blink 400ms ease-in-out infinite alternate;
}
@keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
@-o-keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
@-moz-keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
@-webkit-keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
</style>
Wie mir beim schreiben der Plugin-Artikel ([jQuery Plugins]({% post_url 2014-12-23-jquery-plugins %}) und [jQuery Plugins II]({% post_url 2014-12-26-jquery-plugins2 %})) bereits aufgefallen ist kann man das blinken auch durch eine CSS3 Animation erzeugen. Ich hab mich dann doch dazu entschlossen das nicht in das Plugin zu integrieren da es sich wie [hier](https://developer.mozilla.org/en/docs/Web/CSS/animation) erwähnt um eine experimentelle Technologie handelt:

> This is an experimental technology: Because this technology's specification has not stabilized, check the compatibility table for the proper prefixes to use in various browsers. Also note that the syntax and behavior of an experimental technology is subject to change in future versions of browsers as the spec changes.

Das ganze ist also mit Vorsicht zu genießen. Nicht umsonst gibt es [hier](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_animations/Detecting_CSS_animation_support) ein kleinen JavaScript Schnippsel mit dem man testen kann ob der aktuelle Browser mit CSS3 Animation umgehen kann.

<div id="noAnimation" class="well" style="display:none"><p>
Wenn ihr diesen Text hier sehen könnt wird CSS Animataion nicht von eurem Browser unterstützt. Ihr werdet mit den hier vorgestellten Techniken nicht viel anfangen können.</p>
</div>

Wenn euer Browser Animation unterstützt kann man mit diesen CSS ein Element zum blinken bringen:

{% highlight css %}
.blinking {
    animation: blink 400ms ease-in-out infinite alternate;
    -o-animation: blink 400ms ease-in-out infinite alternate;
    -moz-animation: blink 400ms ease-in-out infinite alternate;
    -webkit-animation: blink 400ms ease-in-out infinite alternate;
}
@keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
@-o-keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
@-moz-keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
@-webkit-keyframes blink {
    from { opacity: 1 }
    to   { opacity: 0 }
}
{% endhighlight %}

Ihr seht schon das es eigentlich viel zu viele Regeln gibt. Für jeden Browser da draußen seine eigene Erweiterung. Wenn man noch mehr Animationen braucht wird das schnell unübersichtlich. Der einzige Browser (man glaubt es kaum) der ohne eigene Erweiterung auskommt ist der IE10.

Auf dem Element wird das blinken dann einfach aktiviert indem es die Klasse `blinking` erhält. Hier ein kleines Beispiel zu testen:

<img id="html5" class="" src="/images/blog/HTML5_Badge_256.png" alt="HTML5 Powered" width="128" height="128" /> <a class="btn btn-default" role="button" href="javascript:;" onclick="$('#html5').toggleClass('blinking');">start/stop</a>

Wenn ihr mehr über CSS Animation wissen wollt empfehle ich folgende Lektüre:

* [MDN > Web technology for developers > Web developer guide > CSS developer guide > Using CSS animations](https://developer.mozilla.org/en/docs/Web/Guide/CSS/Using_CSS_animations)
* [MDN > Web technology for developers > CSS > animation](https://developer.mozilla.org/en/docs/Web/CSS/animation)
* [MDN > Web technology for developers > CSS > @keyframes](https://developer.mozilla.org/en/docs/Web/CSS/@keyframes)