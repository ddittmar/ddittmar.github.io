---
layout: post
title:  "Linux Terminal Befehle"
date:   2015-09-05
categories: linux
tags: shell
og_img: /images/blog/Gnome-Utilities-Terminal-64.png
og_img-alt: "Terminal"
og_img-width: 64
og_img-height: 64
show_head_img: true
---
Ich hatte letztens mit einigen Linux-Admins zu tun, die offensichtlich nicht in der Lage waren mit der Shell ordentlich zu arbeiten. Es war gar nicht so sehr das Problem das Linux Kenntnisse fehlten. Es war nur so das Dinge die man einfach mit der Kommandozeile erledigen kann unglaublich kompliziert gelöst wurden. So wurde z.B. eine Log Datei zum betrachten und durchsuchen vom Server herunter geladen (wtf?). Deshalb hier ein paar Befehle mit denen ich so öfter ein paar nützliche Sachen anstelle.

Es werden hier jetzt keine unglaublichen Tricks gezeigt. Wer also öfter was mit Linux/Unix macht wird hier sicher keine neuen Stunts lernen.

## Tools

Hier ein paar Tools die ich euch ans Herz legen möchte. Ich werde nicht auf solche Basis-Befehle wie `cp`, `rm` oder `mv` eingehen.

### man

Das Tool überhaupt um etwas zu lernen. Es wird eine **Man**-ual Seite angezeigt. Es gibt normalerweise Hilfe für alles was man so wissen will. Wenn man mehr über `man` wissen will reicht einfach:

<pre>
man man
</pre>

Viel Spaß beim lesen :grin:. Wenn man fertig ist mit lesen: `:q`. Wenn man ein bestimmtes Wort in der Seite sucht: `/` und dann das Wort (oder ein Teil davon) und dann `<Enter>`.

### tail

`tail` zeigt generell das Ende einer Text-Datei an. Sehr nützlich ist der Schalter `-f` um `tail` im *Follow*-Mode zu benutzen:

<pre>
tail -f /var/log/auth.log
</pre>

Es wird dann immer alles ausgegeben sobald jemand etwas in die Datei schreibt. Sehr nützlich um Log-Dateien zu beobachten. Der *Follow*-Mode wird mit `Ctrl-C` wieder beendet.

### less

`less` ist das Power-Toy schlecht hin (da geht einiges). Ich kann nur nähere Beschäftigung mit `less` empfehlen. Generell kann man mit `less` eine Text-Datei betrachten:

<pre>
less /var/log/auth.log
</pre>

Hier ein paar Shortcuts:

* An den Anfang springen: `Ctrl-Pos1`
* An das Ende springen: `Ctrl-End`
* In den `Follow`-Mode wechselt man mit `Shift-F`. Mit `Ctrl-C` kommt man da wieder raus.

Sonst kann man wie bei `man` mit `/` suchen und mit `:q` verlässt man `less`.

### find

Mit `find` werden Dateien gesucht. Dieses Tool kann auch richtig was. Deshalb hier nur ein kleines Beispiel (mehr Info mit `man find` :wink:). Alle PDF-Dateien in diesem Verzeichniss und alle Unterverzeichnissen findet man so:

<pre>
find . -iname "*.pdf"
</pre>

### grep

Mit `grep` kann mit einem Pattern in Dateien suchen. Meistens wird es zusammen mit anderen Tools verwendet (dazu gleich mehr). Hier ein Beispiel wie man "xml" innerhalb der Datei "pom.xml" findet:

<pre>
grep -in "xml" pom.xml
</pre>

### df

`df` steht für "disk free" und man kann damit leicht rausfinden wie voll eure Laufwerke sind. Mit `-h` kann man sich die Werte in *human readable* anzeigen lassen:

<pre>
df -h
</pre>

### du

`du` steht für "disk usage". Man kann damit gut in allen Unterverzeichnissen die größen der Verzeichniss anzeigen. Sehr nützlich wenn man große Dateien sucht, da irgendwo eine Platte voll ist.

### ps

`ps` zeigt Informationen über die laufenden Prozesse an. Ist relativ nützlich wenn sich ein Prozess aufgehängt hat und man die PID finden muss. Ich mache meistens:

<pre>
ps aux
</pre>

Der Befehl wird erst so richtig nützlich wenn man ihn mit `grep` kombiniert.

### kill

Mit `kill` kann man Prozesse töten (wie der Name schon sagt). Das ist natürlich ein sehr scharfes Messer. Am besten lest ihr mal die Manual-Page.

### tar

`tar` steht für "tape archiver". An dem Namen kann man gut sehen wie lange es den Befehl wohl schon gibt. Mit diesem Tool werden die `tar.gz` Archive erzeugt:

<pre>
tar cvzf archiv-name.tar.gz verzeichniss/
</pre>

und auch wieder entpackt:

<pre>
tar xvzf archiv-name.tar.gz
</pre>

### wget

Mit `wget` kann man mal eben etwas aus dem Internet runter laden. Das kann schon recht praktisch sein wenn man gerade keine Oberfläche zur verfügung hat.

### curl

Mit `curl` kann man ganz gut mal einen Web-Request absetzen und sehen was zurück kommt. Manchmal ist `curl` auch ganz in Scripten um z.B. den Antwortstatus der Webseite zu checken o.ä.

## Pipes

Pipes sind die Möglichkeit schlechthin die einfach anmutenden Befehle zu mächtigen Kombinationen zu verheiraten. Es handelt sich um eine Möglichkeit die Ausgabe eines Befehls an den nächsten Befehl weiter zu geben. Dazu wird das Zeichen `|` verwendet.

Wenn ihr einige der Befehle oben schon mal ausprobiert habt, habt ihr sicher gemerkt das einige eine sehr lange Ausgabe erzeugen. Das ist so natürlich nicht zu gebrauchen. Aber man kann die Ausgabe z.B. mit `less` "auffangen":

<pre>
find . | less
</pre>

Alles was `find` findet wird nach `less` geleitet und ihr könnt dann dort bequem scrollen und euch alles angucken.

Ein anderes Beispiel um mal etwas mehr zu verketten:

<pre>
find . -iname "*.java" | xargs cat | wc -l
</pre>

Ihr könnt ja mal selber raus finden was in dem Beispiel gemacht wird. :grin:

## Mehr Beispiele

Nachdem wir jetzt wissen was Pipes sind. Hier ein paar Beispiele die ich gerne verwende:

Alle Java Prozesse finden:
<pre>
ps aux | grep "java"
</pre>

Alle Log-Dateien nach *ERROR* durchsuchen:
<pre>
find . -iname "*.log" | xargs grep -n "ERROR"
</pre>

Alle Bak-Dateien finden und löschen:
<pre>
find . -name "*.bak" | xargs rm -rf
</pre>

Hmmmm, irgendwie fällt mir jetzt gerade nichts mehr ein. Wenn euch noch was einfällt könnt ihr ja schreiben. Würde mich freuen :blush:
