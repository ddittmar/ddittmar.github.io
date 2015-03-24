---
layout: post
title:  "CSS3 Transition 'steps'"
date:   2015-03-24
categories: css
tags: css3 css animation transition steps
og_img: http://static-ddittmar.appspot.com/images/blog/transition/SE2015Mar20T_00.PNG
og_img-alt: "eclipse Mar 20"
og_img-width: 250
og_img-height: 270
show_head_img: false
---
<style type="text/css">
.transition {
    width: 250px;
    height: 270px;
    background: url(http://static-ddittmar.appspot.com/images/blog/transition/SE2015Mar20T_row.PNG) no-repeat;
    background-position: 0 0;
}
.transition:hover {
    background-position: -13000px 0;
    transition: background-position 1s steps(52);
}
</style>
Ich bin letztens über eine CSS3 transition gestolpert mit der man sehr schön kleine "Filme" animieren kann. Dazu war früher immer JavaScript nötig das mit einem Timer den Hintergrund (den Filmstreifen) ein Bild weiter geschoben hat. Das ist jetzt nicht mehr notwendig!

Hier ist der Film etwas zu groß aber ich habe gerade kein anderes Beispiel (hover): 

<div class="transition" style="margin-bottom: 15px;"></div>

Das ganze ist gegenüber einer JavaScript Lösung sehr einfach mit etwas CSS gemacht:

{% highlight css %}
.transition {
    width: 250px;
    height: 270px;
    background: url(/images/blog/transition/SE2015Mar20T_row.PNG) no-repeat;
    background-position: 0 0;
}
.transition:hover {
    background-position: -13000px 0;
    transition: background-position 1s steps(52);
}
{% endhighlight %}

Was hier passiert ist auch relativ einfach erklärt. Die Frames befinden sich alle hintereinander auf einer Art Filmstreifen:

<img class="img-responsive" src="http://static-ddittmar.appspot.com/images/blog/transition/SE2015Mar20T_row.PNG" alt="Filmstreifen" width="13250" height="270">

Wenn man jetzt das Element mit der Maus überfährt wird die Transition abgespielt. Die Transition bewirkt dabei das die Zielposition `background-position: -13000px 0;` in einer Sekunde erreicht wird. `steps(52)` tut dies dabei in 52 Schritten ohne das es einen Übergangseffekt gibt. D.h. der Abstand der "Schritte" wäre dann

```-13000/52 = -250```

Die Transition fährt dann also so ab:

+ `background-position: -250px 0;`
+ `background-position: -500px 0;`
+ `background-position: -750px 0;`
+ `background-position: -1000px 0;`
+ `background-position: -1250px 0;`
+ ... usw ...
+ `background-position: -13000px 0;`

Falls ihr mal so einen Filmstreifen erzeugen müsst, hier noch ein paar Befehle für ImageMagick:

Zerlegen eines Gif in einzelne Bilder:
<pre>convert SE2015Mar20T.GIF -coalesce +repage +adjoin SE2015Mar20T_%02d.PNG</pre>

Zusammenführen der einzel Bilder zum Filmstreifen:
<pre>convert SE2015Mar20T_*.PNG +append SE2015Mar20T_row.PNG</pre>

Die Animation zeigt übrignes die Sonnenfinsternis vom 20. März 2015, die in Deutschland partiell zu sehen war. Viel Spaß damit :grin: