Babel.js
=======

##TL;DR

Add `<script src="https://cdn.rawgit.com/speech/babel/master/babel.mini.js"></script>` to the header of a .bit website to improve compatibility with [Speech.is](http://www.speech.is) and other [Speech.js](https://github.com/speech/speech.js) websites.

**Note:** this is BETA quality software and the Speech.is website is still ALPHA quality.

##About

Babel is a translator for websites using [Speech.js](http://speech.github.io/speech.js/) for web interoperability and to circumvent censorship.  Normally, a page with an embedded iFrame cannot directly retrieve information about the content in the child iFrame, such as the title, favicon, and changes to the URL.  Babel passes this information up to a Speech.js site, alters .bit links, and generally makes for a seamless user experience.

Babel first checks to see if it is on page that is being framed.  If so, it then syncs the favicon, title, and URL of the child .bit site with parent speech.js site. 
Babel also changes the target of external links so that they load directly.  It also supports rewriting anchor tags with links to .bit websites (`<a href="http://other-dot-bit-site.bit"> -> <a href="http://other-dot-bit-site.spx.is">`) but it's currently hardcoded to use .spx.is.