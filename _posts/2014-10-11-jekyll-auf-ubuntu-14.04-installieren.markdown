---
layout: post
title:  "Jekyll auf einem Ubuntu 14.04 installieren"
date:   2014-10-11
categories: linux ubuntu jekyll
tags: installieren jekyll ubuntu
---
Diese Seite wird mit [Jekyll](http://jekyllrb.com/) erstellt/betrieben. Da ich gerade einen neuen Laptop aufgesetzt habe musste ich ja auch Jekyll wieder an den Start kriegen. Ich hatte natürlich schon wieder vergessen was man da alles braucht. Hier eine schnelle Anleitung.

Jekyll ist in Ruby geschrieben. Man braucht also erstmal Ruby (`ruby-dev` und `make` bracht man um Native-Erweiterungen kompilieren zu können):
{% highlight bash %}
sudo apt-get install ruby ruby-dev make
{% endhighlight %}
Das Packet `ruby` enthält auch `gem` so das man das nicht extra laden muss.

Um auf dem aktuellen Stand zu sein habe ich Jekyll mit `gem` geladen (es gibt auch eine Version in den Repositories):
{% highlight bash %}
sudo gem install jekyll
{% endhighlight %}

Jekyll braucht zwinged [Node.js](http://nodejs.org/) um zu starten. Auch wenn man [CoffeeScript](http://coffeescript.org/) nicht verwenden möchte. Ich habe einfach die Version aus den Repositories installiert (inklusive dem Node-Packet-Manager `npm`):
{% highlight bash %}
sudo apt-get install nodejs npm
{% endhighlight %}

Jetzt haben wir schon mal ein Basis-Setup zusammen. Wenn ihr wissen wollt was Jekyll genau ist und was es alles tolles kann schaut doch mal in der [Dokumentaion](http://jekyllrb.com/docs/home/) vorbei.
