---
layout: post
title:  "IE &lt;table&gt; &amp;nbsp; wtf"
date:   2014-11-04
categories: html
tags: IE8 IE9 bug wtf nbsp
---
Ich dachte das ich langsam jeden Quatsch gesehen habe den der IE so baut. Aber weit gefehlt! Ich habe vor ein paar Tagen ungewöhnliches mit einer einfachen Tabelle erlebt.

Hier der Code mit dem ihr den Effekt nachstellen könnt:
{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <style>
        td { vertical-align: top; }
        td.first { width: 100px; }
    </style>
</head>
<body>
    <div style="width: 500px">
        <table border="1">
            <tr>
                <td class="first">Lorem ipsum</td>
                <td>&nbsp;-&nbsp;</td>
                <td>Lorem ipsum dolor sit amet</td>
            </tr>
            <tr>
                <td class="first">Lorem ipsum</td>
                <td>&nbsp;-&nbsp;</td>
                <td>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque</td>
            </tr>
        </table>
    </div>
</body>
</html>
{% endhighlight %}
Wie man sieht ist gar nichts los. Eine einfache Tabelle mit ein bisschen CSS eben.
Normale Browser (hier Chrome) zeigen das auch wie erwartet an:
<img class="img-responsive" src="//static-ddittmar.appspot.com/images/blog/Screenshot-Chrome-Table.png" alt="Screenshot">

Die Tabelle im IE8 und IE9 sieht so aus (ab IE10 ist übrigens alles wieder normal):
<img class="img-responsive" src="//static-ddittmar.appspot.com/images/blog/Screenshot-IE-Table.png" alt="Screenshot">

Wo her (zum Henker) kommt dieser Abstand in der ersten Zeile? Das Beste ist das der Abstand nur zustande kommt wenn eine der Zellen eine Umbruch hat. Ihr müsst mal den etwas längeren "Lorem ipsum" Text kürzen dann verschwindet der Abstand in der oberen Zelle auch (wtf?).

Nach etwa einem halben Tag habe ich dann zufällig die Lösung gefunden: Man entferne die `&nbsp;` in den mittleren Zellen. Dann sieht es auch in den alten IE's normal aus. Aber frag mich nicht warum. Da gehen mir echt die Ideen aus wie der IE auf den Plan gekommen ist. Die "Spaces" hab ich eigentlich nur eingefügt um "mal eben" die mittlere Spalte etwas auseinander zu drücken. Dannach habe ich die Spalte eben mit CSS etwas verbreitert und den Text (das `-`) zentriert. Dann kommt der IE auch klar.