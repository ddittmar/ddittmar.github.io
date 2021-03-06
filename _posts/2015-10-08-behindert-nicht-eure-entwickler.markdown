---
layout: post
title:  "Behindert nicht eure Entwickler"
date:   2015-10-08
categories: development general
tags: programming development produktivät
---
Ich erlebe immer wieder wie Entwickler bei der Arbeit behindert werden. Und das obwohl man die meisten Ursachen eigentlich leicht abstellen könnte. Entwickler sind relativ teure Mitarbeiter und Software-Entwicklung dauert eben auch seine Zeit. An alle Entscheider da draußen: "*Behindert nicht eure Entwickler*" und verschwendet keine Resourcen (Geld). Deshalb hier eine kleine Zusammenstellung der größten Fehler, die mir immer wieder begegnen (keine bestimmte Reihenfolge).

## Rechner zu schwach

Sehr beliebtes Problem gerade in größeren Organisationen. Meistens gibt es zu wenig Speicher aber es ist mir auch schon oft passiert das die CPU einfach veraltet ist. Meistens ist die Begründung:

> "solche Rechner haben hier alle Mitarbeiter..."

Nur was übersehen wird ist das Entwickler auch nicht nur Browse, Email, Excel und Word starten. Entwickler starten normalerweise auf ihren lokalen Maschienen die gesammte Anwendung (meist incl. einer Datenbank), die normalerweise auf einem Server läuft. Dann wird die Anwendung meist im Debug-Modus gestartet, was dann noch mehr Resourcen braucht. Dazu kommt natürlich die IDE und alle Tools die man sonst noch so braucht (Datenbank-Werkzeuge etc.). Das braucht alles ungemein viel Speicher und CPU-Leistung. Da kommt man nicht mit den Rechnern aus die "alle Mitarbeiter" auf dem Tisch haben. Ich habe auch mal die Begründung gehört:

> "Das machen wir damit die Entwickler besser die Performance des Systems beurteilen können."

Ansich wohl ein gute Idee. Nur leider ist es eben so das Entwickler eben nicht nur die Anwendung laufen haben (s.o.).

Es ist also dringend angeraten die Rechner der Entwickler möglichst gut auszustatten. Ich habe mal bei einer Bank in der Entwicklung gearbeitet und habe dort die Build-Zeiten aller Entwickler im Build-Job mit aufgezeichnet. Man musste kein Mathe-Genie sein um zu errechnen das sich neue Rechner innerhalb von 2 Wochen amortisiert hätten. Natürlich hat das alles nichts gebracht und das Geld wurde immer weiter fleißig zum Fenster raus geworfen.

## Kein ungehinderter Zugang zum Internet

Auch ein beliebtes Problem gerade bei Banken und Versicherungen. Warum normale Angestellte nicht ungehinderten Zugang zum Internet haben verstehe ich ja meistens. Normalerweise (gerade bei Banken und Versicherungen) ist es ja so das im Unternehmen recht sensible Daten hantiert werden und man sich deshalb keine Vieren und Würmer und ähnliches einfangen will. Außerdem sollen die Mitarbeiter daran gehindert werden ihre Zeit zu verschwenden (Facebook, YouTube, Twitter, Google+ etc.). Ich hab es abaer auch schon erlebt das vor lauter gesperre und gefilter kein Zugriff auf Bing möglich war (wtf?).

Es ist eben so das Entwickler ungedingt ungehinderten Zugang brauchen. Als Web-Entwickler kann ich keine YouTube-Video in die Seite einbetten wenn ich keinen Zugriff auf YouTube habe. Das gleiche gilt natürlich auch für Facebook-Like-Buttons und anderens. Außerdem suft man als Entwickler meistens Seiten von denen die meisten Admins noch nie was gehört haben (und die dann gesperrt sind). Zusätzlich werden meistens Protokolle (bzw. Ports) wie SSH und FTP gesperrt. Auch Dinge die Entwickler oft zur Arbeit benötigen.

Mein Bruder ist Admin eines Firmen-Netzwerks und er hat das Problem einfach dadurch gelöst das die Entwickler-Rechner in einem eigenen Subnetz sitzen. In diesem Subnetz besteht dann ungehinderter Internet-Zugang. Für sensible interne Sachen hat jeder Raum dann einfach einen eigenen Rechner bekommen. Mit diesem können die Entwickler dann auf interne Dinge zugreifen. Meistens brauchen Entwickler auf solche Resourcen auch nur sehr selten Zugriff. Klingt mir nach einer guten Lösung. Nach Aussagen von meinem Bruder sind *seine* Entwickler zufrieden damit.

Die meisten Firmen verwenden zum Filtern einen Proxy. Da kann man sicher leicht die Entwickler einer Benutzer-Gruppe  zuordnen, die dann uneingeschränkten Zugang hat. Wäre doch auch eine Idee, oder?

## Vorgeschriebenes Betriebssystem

Ich arbeite als Web-Entwickler. Die meisten Web-Server laufen auf Linux. Es ist unglaublich wie viele Probleme ich immer wieder beobachte, die dadurch entstehen das man (zwingend) unter Windows entwickeln muss. Mehr Schwierigkeiten kann man kaum herauf beschwören. Typisch sind Probleme mit dem File-Encoding und den Zeilenumbrüchen und ähnliches. Aber auch gerne so Dinge das man z.B. einen Apachen und die meisten Datenbanken nur sehr schwierig unter Windows betreiben kann. Auch sind Dinge wie SSH, Git und ähnliches unter Windows nur mit viel getrickse zu betreiben.

Das kann man alles vermeiden wenn man die Entwickler auf der Zielumgebung entwickeln lässt (Linux). Natürlich kann jeder Entwickler das OS fahren mit dem er glaubt am schnellsten zu sein. Aber man sollte ihnen Wahlfreiheit geben. Das erspart den Entwicklern das generfe und dem Projekt das Geld.

## Keine Admin Rechte

Entwickler benötigen normalerweise Tools die so in der Organisationn nicht vorgesehen sind. Keine anderen Mitarbeiter benötigen diese Werkzeuge. Diese Tools kosten zudem nichts, da es sich oft um OpenSource handelt. Leider wird den Entwicklern der Zugang zu sehr nützlichen Tools verwehrt oder erschwert.

> "Hier hat kein Mitarbeiter Admin-Rechte"

Das erzeugt Mehrarbeit und verbraucht Geld und Nerven. Meistens ist es schon schwierig Firefox und Chrome auf den Rechner zu bekommen. Aber als Web-Entwickler muss ich sagen das diesse Browser zum debuggen unverzichtbar sind. Außdem sollen die Seiten ja auch in diesen Browsern laufen, richtig?

Mein Bruder der Admin (s.o.) hat das so gelöst das einfach jeder Entwickler seinen Rechner selber aufsetzt und administriert. Es ist aber dann natürlich auch so das er bei Problemen nicht hilft (außer vielleicht mal mit einer Windows CD). Das ist für Entwickler aber auch kein Problem (zumindest für keinen den ich kenne).

## Technisch veraltete Umgebung

Auch diese Variante erlebe ich häufig. Angefangen bei der Source-Verwaltung (z.B. CVS *...im Jahre 2015? wtf?*) über so Aussagen wie:

> "Spring-Boot? Das können wir auf unseren Servern nicht betreiben..."

Und auch gerne genommen:

> "MongoDB? Da haben wir kein Know-How im Haus..."

Man glaubt es nicht aber das hier hab ich auch schon gehört (*auch 2015* :facepunch:):

> "Bei uns laufen alle Java-Anwendungen mit JDK7 32bit..."

*Was?* Java7 hat keine Support mehr und 32bit ist ja wohl auch so eine Sache (*Speicher*). Oder auch schon gehört (ist schon fast witzig wenn es nicht so traurig wäre):

> "Email ist unsere Instant-Messaging Lösung"

Auch werden gerne mal pauschal Programmiersprachen verteufelt:

> "PHP? Das ist unsicher..."

Überhaupt wird mit der Begründung "XXX ist nicht sicher" alles abgelehnt worauf man keine Lust hat (oder sich mal weiter entwickeln müsste).

Das ganze getue verhindert Innovation und Weiterentwicklung der Organisation. Das scheint jetzt kein Problem zu sein (ist es auch erstmal nicht) aber in die Zukunft investieren sieht anders aus. Auf Dauer fährt man mit der Strategie gegen die Wand (siehe CVS im Jahre 2015). Fahren sie nicht gegen die Wand sondern entwickeln sie ihre IT weiter. Die gesammte IT ist ein sich schnell veränderndes Feld in dem Stillstand zum Tot führt (über kurz oder lang).

## Zu guter letzt...

Wie oben bereits erwähnt ist es so das Entwickler relativ teuer sind. Zudem kennt man ja die Probleme wenn man mal versucht einen Entwickler einzustellen. Da kriegt man nicht mal schnell jemanden "zum nächsten ersten". Was ich sagen will ist das man sich als einigermaßen begabter Entwickler sich die Firma aussuchen kann. Es ist also nicht so das nur Geld aus dem Fenster wirft, da die Entwickler nicht ungestört ihrer eigentlichen Tätigkeit nachgehen können. Es ist auch so das Entwickler einfach die Firma wechseln können wenn ihnen das *"hier"* nicht gefällt.

Werfen sie also kein Geld aus dem Fenster und machen sie ihre Entwickler zu glücklichen und prokutiven Mitarbeitern.
*Leider weiß ich das dieser Artikel (fast) ungelesen im Internet verhallen wird. Aber vielleicht ließt es ja doch jemand und verbessert irgendwo die Produktivität seiner Entwickler.*
