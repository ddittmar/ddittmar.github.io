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
<p class="blink blinking">blinking!</p>