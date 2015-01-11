---
layout: post
title:  "ubuntu 14.04: Neuste Stellarium Version installieren und den Kometen Lovejoy sichten"
date:   2015-01-10
categories: linux ubuntu
tags: 
- stellarium
- lovejoy
- C/2014 Q2
---
Diese Tage fliegt der Komet C/2014 Q2 durch unser Sonnensystem. Der Komet wird nach seinem Entdecker Terry Lovejoy auch "Lovejoy" genannt und ist im Moment mit bloßem Auge sichtbar. Ich fand es etwas schwierig die Position des Komenten im Himmel zu bestimmen. Im Internet lässt sich nicht so ohne weiteres was finden. Da ist mir die excellente Software [Stellarium](http://www.stellarium.org/) eingefallen.

Stellarium stellt den Sternenhimmel so dar wie wir ihn von einem beliebigen Ort auf der Erde sehen. Es werden neben den Sternen und unseren Planeten (und natürlich dem Mond) auch Satelliten, Galaxien und alles mögliche andere dargestellt. Stellarium ist auch für Windows und Mac verfügbar.

## Neuste Stellarium Version installieren

Die Version die man in den Repositories findet ist etwas alt (0.12.x). Die aktuelle stabile Version ist 0.13.1 und lässt sich zu Glück sehr leicht installieren. Die Entwickler haben für Ubunutu ein PPA bereit gestellt mit dem wir das jetzt installieren werden.

Erstmal müssen wir die neue Packetquelle bekannt machen und den Cache aktualisieren:
{% highlight bash %}
sudo add-apt-repository ppa:stellarium/stellarium-releases
sudo apt-get update
{% endhighlight %}

Dannach kann man dann Stellarium einfach installieren:
{% highlight bash %}
sudo apt-get install stellarium
{% endhighlight %}

Oder falls ihr die Version aus den Repositories schon installiert habt, könnt ihr jetzt ein upgrade machen
{% highlight bash %}
sudo apt-get upgrade
{% endhighlight %}

## Lovejoy in Stellarium sichten

Nachdem wir jetzt eine aktuelles Stellarium haben bringen wir noch den Kometen in die Datenbank des Programms.

Wenn ihr das Programm das erste mal startet befindet ihr euch in Paris. Zumindest sicher nicht da wo ihr normalerweise die Sterne betrachtet. Deshalb solltet ihr als aller erstes mal euren Standort einstellen:

1. Das Standortfenster öffnen (F6)
1. In dem neuen Dialog euren ungefähren Standort festlegen.

Nachdem ihr euren Sternhimmel sehen könnt installieren wir den Kometen:

1. Konfiguration öffnen (F2)
1. den Tab "Erweiterungen" wählen
1. Links den "Sonnensystemeditor" wählen
1. Button "Konfigurieren" klicken
1. im dem neunen Dialog den Tab "Sonnensystem" wählen
1. Button "Bahnelemente im MPC-Format importieren" klicken
1. im neuen Dialog den Tab "Listen" wählen
1. den Typ auf "Komenten" stellen
1. "Quelle auswählen" auf "Objektliste aus dem Internet herunterladen"
1. die Quelle auf "MPC's list of observable comets" stellen
1. den Button "Bahnelemente importieren" klicken
1. im neuen Dialog nach "C/2014 Q2" suchen
1. den Kometen markieren und auf "Objekt hinzufügen" klicken

Wenn ihr erfolgreich wart könnt ihr jetzt im Suchdialog (F3) nach "Lovejoy" suchen:

<img class="img-responsive" src="//static-ddittmar.appspot.com/images/blog/stellarium-lovejoy.png" width="992" height="841" alt="Lovejoy in Stellarium">

Und jetzt raus Sterne gucken! Wenn ihr den Kometen diese Tage nicht seht kommt er erst in etwa 8000 Jahren wieder vorbei. :grin:

Die letzten Tage war es leider immer Bewölkt und wir haben im Moment auch noch einen sehr hellen Mond. Vielleicht kann man den Kometen die nächsten Tage besser sehen. Am 20. Januar ist der Mond dann auch weg.