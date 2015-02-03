---
layout: post
title:  "ubuntu: Wie man alte Kernel entfernt"
date:   2015-02-03
og_img: http://static-ddittmar.appspot.com/images/blog/ubuntu-logo32.png
og_img-alt: Ubuntu Logo
og_img-width: 200
og_img-height: 200
show_head_img: false
categories: linux ubuntu
tags: 
- kernel
---
Ich hatte gerade das Problem das meine `/boot` Partition zu voll war um auf den neusten Kernel zu updaten. Aber das kann man zum Glück recht einfach beheben. Also Kommandozeile auf!

Erstmal stellen wir fest welche Kernel es überhaupt dem System bekannt sind. Mit `dpkg` kann man eine schöne Tabelle bekommen:

{% highlight bash %}
dpkg -l | grep linux-image-
{% endhighlight %}

Die Ausgabe sieht bei mir im Moment so aus. Ich habe natürlich bei mir schon aufgeräumt. Bei euch sollte die Tabelle natürlich deutlich mehr installierte Kernel zeigen. Hier die Tabelle (etwas gekürzt):
<pre>
rc  linux-image-3.13.0-32-generic           3.13.0-32.57    amd64    Linux kernel image ...
rc  linux-image-3.13.0-37-generic           3.13.0-37.64    amd64    Linux kernel image ...
rc  linux-image-3.13.0-39-generic           3.13.0-39.66    amd64    Linux kernel image ...
rc  linux-image-3.13.0-40-generic           3.13.0-40.69    amd64    Linux kernel image ...
rc  linux-image-3.13.0-43-generic           3.13.0-43.72    amd64    Linux kernel image ...
rc  linux-image-3.13.0-44-generic           3.13.0-44.73    amd64    Linux kernel image ...
ii  linux-image-3.13.0-45-generic           3.13.0-45.74    amd64    Linux kernel image ...
rc  linux-image-extra-3.13.0-32-generic     3.13.0-32.57    amd64    Linux kernel extra ...
rc  linux-image-extra-3.13.0-37-generic     3.13.0-37.64    amd64    Linux kernel extra ...
rc  linux-image-extra-3.13.0-39-generic     3.13.0-39.66    amd64    Linux kernel extra ...
rc  linux-image-extra-3.13.0-40-generic     3.13.0-40.69    amd64    Linux kernel extra ...
rc  linux-image-extra-3.13.0-43-generic     3.13.0-43.72    amd64    Linux kernel extra ...
rc  linux-image-extra-3.13.0-44-generic     3.13.0-44.73    amd64    Linux kernel extra ...
ii  linux-image-extra-3.13.0-45-generic     3.13.0-45.74    amd64    Linux kernel extra ...
ii  linux-image-generic                     3.13.0.45.52    amd64    Generic Linux kernel image
</pre>

Seht ihr die Zeilen mit `ii`? Das sind die installierten Kernel. Wie gesagt sind das bei euch wahrscheinlich deutlich mehr.

Ich nehme mal an das euer System seit dem letzten Kernelupdate stabil läuft. Das heißt ihr braucht eigentlich nur den neusten Kernel. Wenn ihr wollt könnt ihr zur Sicherheit noch die Version davor stehen lassen. Den `linux-image-generic` solltet ihr nicht entfernen. Bei dem Paket handelt es sich um eine Meta-Paket das immer vom neusten Kernel abhängt. D.h. eine Änderung hier bewirkt das ihr den neusten Kernel bekommt. Sonst müsstet ihr den mit der Hand holen.

Also könnt ihr jetzt die nicht mehr benötigten Kernel entfernen. Um nicht den aktuell laufenden Kernel zu entfernen solltet ihr vorher mit
{% highlight bash %}
uname -r
{% endhighlight %}
feststellen welcher Kernel im Moment gestartet ist.

Jetzt können wir die alten Kernel entfernen:
**Der folgende Befehl ist ein sehr scharfes Messer! Ihr könnt hier auch ohne weiteres alle Kernel entfernen! Achtet darauf nicht den aktuellen Kernel zu entfernen!**
{% highlight bash %}
sudo apt-get autoremove linux-image-3.13.0-32-generic linux-image-3.13.0-37-generic
{% endhighlight %}
Durch `autoremove` werden alte Abhängigkeiten mit entfernt und GRUB wird aktualisiert.

Jetzt sollte wieder genügend Platz auf der `/boot` Partition sein. Wenn nicht habt ihr ein ganz anderes und ernsthaftes Problem.

## VirtualBox

Ich konnte nach der Aktion meine VirtualBox nicht mehr starten da das passende Kernel-Modul fehlte. So ganz hab ich das nicht verstanden wie es dazu gekommen ist. Zu Glück ist hier der Fix aber auch wirklich einfach:

{% highlight bash %}
sudo dpkg-reconfigure virtualbox-dkms
{% endhighlight %}

Falls sich beschwert wird das euch die Kernel-Sourcen fehlen (o.ä.) solltet ihr sicher stellen das ihr `linux-image-generic` und `linux-headers-generic` installiert habt:
{% highlight bash %}
sudo apt-get install linux-image-generic linux-headers-generic
{% endhighlight %}

Dannach sollte es klappen. :smirk: