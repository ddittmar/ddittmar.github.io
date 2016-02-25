---
layout: post
title:  "Dynamisch Arrays erzeugen in Java"
date:   2016-02-25
categories: development java
tags: programming development
---
Es kommt nicht häufig vor aber ich habe letztens doch tatsächlich was neues in Java gelernt. Ich musste zur Laufzeit ein Array erzeugen unbekannten Typs erzeugen und dann dort Werte einfügen. Macht man natürlich nicht so häufig aber ich kann mich echt nicht erinnern das jemals gemacht zu haben.

Eigentlich ist es ganz einfach (wenn man weiß wie es geht). Hier erzeugen wir mal ein String-Array mit 2 Elementen und schreiben in die ersten beiden Slots was rein:
{% highlight java %}
Object array = Array.newInstance(String.class, 2);
Array.set(array, 0, "foo");
Array.set(array, 1, "bar");
{% endhighlight %}
So macht das Beispiel natürlich nicht viel Sinn. Man hätte ja gewusst das es sich um ein Array aus Strings handelt. Man stelle sich vor man würde die Klasse nicht kennen :wink:.

Wie dem geneigten Leser sicher nicht entgangen ist, ist die Rückgabe von `Array.newInstance` vom Type `Object`. Das muss natürlich so sein da man ja nicht etwas wie `String[] array = ...` schreiben kann. Man weiß ja nicht das es sich um Strings handelt.

Das war's dann auch schon... bis denn dann...
