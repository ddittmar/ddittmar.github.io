---
layout: post
title:  "Spring Expression Language"
date:   2015-10-02
categories: java spring
tags: programming java spring spring-el
og_img: /images/blog/spring-icon.png
og_img-alt: "Spring"
og_img-width: 64
og_img-height: 64
show_head_img: true
---
Jeder der bereits etwas mit Spring bzw Spring-Boot gemacht hat, hat sicher schon mal die Spring-EL verwendet ohne sich direkt darüber klar zu sein. Spring-EL wird gerne mit `@Value` oder `@PreAuthorize` verwendet ohne das man sich darüber klar ist das es sich um Spring-EL handelt.

Ich habe Spring-EL letztens verwendet um Werte aus einem Objekt-Graphen zu holen um sie dann als CSV/Excel auszugeben. Mit Spring-EL kann man sehr schön Werte aus dem Graphen holen ohne ständig Überprüfungen auf `null` machen zu müssen. Außerdem lassen sich die Ausdrücke leichter anpassen so das bei Anpassungen am Export weniger Aufwand entsteht. Aber erstmal gucken wir uns mal an wie man Spring-EL 'manuell' benutzt:

{% highlight java %}
// ExpressionParser erzeugen
ExpressionParser parser = new SpelExpressionParser();
// Expression parsen
Expression exp = parser.parseExpression("3+4");
// Expression auswerten
Object value = exp.getValue();
System.out.println(value); // = 7
{% endhighlight %}

Das ist also nicht zu schwierig, oder? :wink:

Die Dokumentation von Spring-EL findet ihr [hier](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html). Wie immer bei Spring ist alles recht ausführlich und sauber dokumentiert. Da ihr ja selber lesen könnt betrachten wir hier nur Features, die ich besonders nützlich fand.

## Der Elvis Operator

Der Elvis Operator (`?:`) ist eine Kurzform des Ternären Operators. Der Operator wurde aus Groovy 'ausgeliehen'. Der Operator löst das Problem das man mit dem Ternären Operator oft einen Teil des Ausdrucks wiederholt (z.B.):

{% highlight java %}
String name = "Elvis";
String displayName = name != null ? name : "unbekannt";
{% endhighlight %}

Das ganze kann man mit dem Elvis Operator so abkürzen:
{% highlight java %}
Person person = new Person("Elvis");
String displayName = parser.parseExpression("name ?: 'unbekannt'").getValue(person, String.class);
System.out.println(displayName); // "Elvis"

Person person = new Person(null);
String displayName = parser.parseExpression("name ?: 'unbekannt'").getValue(person, String.class);
System.out.println(displayName); // "unbekannt"
{% endhighlight %}

Das ist natürlich jetzt nicht direkt eine Vereinfachung die man in Java gebrauchen könnte aber in Spring-EL macht das schon das Leben einfacher. Man kann mit dem Elvis Operator auch hervoragend Ketten bilden:
{% highlight java %}
String displayName = parser.parseExpression("name1 ?: name2 ?: 'no name'").getValue(rootObj, String.class);
// das entspricht in Java:
displayName = rootObj.name1 != null ? rootObj.name1 : (rootObj.name2 != null ? rootObj.name2 : "no name");
{% endhighlight %}

## Der Safe Navigation Operator

Mit dem Save Navigation Operator (`?.`) kann man die Beans navigieren ohne ständig auf `null` prüfen zu müssen. Der Operator wertet zu `null` aus wenn der linke Teil `null` ist ohen eine `NullPointerException` auszulösen was ja normalerweise passieren würde. Also z.B.:

{% highlight java %}
// (das TestBean kann ein TestBean enthalten...)
TestBean bean = new TestBean("a", new TestBean("b", new TestBean("c")));
String str1 = parser.parseExpression("bean?.bean?.name").getValue(bean, String.class); // "c"
String str1 = parser.parseExpression("bean?.bean?.bean?.bean?.bean?.bean?.name").getValue(bean, String.class); // <null>
{% endhighlight %}

## Projektion

Mit der Projektion kann man eine Collection in der Expression umwandeln. In dem Beispiel hat das Bean mehrere Member die einen Namen haben:

{% highlight java %}
List<String> list = (List<String>)parser.parseExpression("members![name]").getValue(bean);
// list enthält jetzt die Namen der Member...

// wenn die Member eine Stadt haben kann man z.B. so alle Stadt-Namen holen:
List<String> list = (List<String>)parser.parseExpression("members![city.name]").getValue(bean);
{% endhighlight %}

Im Prinzip wird der Ausdruck in den Klammern auf jedes Element der Collection angewand. So wie bei dem neuen `forEach` in Java8.

*Wie man sieht sind da ein paar sehr praktische Dinge dabei. Also ran an den Speck!* :grin:
