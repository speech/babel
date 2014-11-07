Babel.js
=======

##TL;DR

<<<<<<< HEAD
Add `<script src="//cdn.rawgit.com/speech/babel/master/babel.mini.js"></script>` to a .bit website to better compatibility with Speech.is.
=======
Add `<script src="https://cdn.rawgit.com/speech/babel/master/babel.mini.js"></script>` to the header of a .bit website to improve compatibility with [Speech.is](http://www.speech.is) and other [Speech.js](https://github.com/speech/speech.js) websites.

**Note:** this is BETA quality software and the Speech.is website is still ALPHA quality.
>>>>>>> esperanto

##About

Babel is a translator for websites using [Speech.js](http://speech.github.io/speech.js/) for web interoperability and to circumvent censorship.  Normally, a page with an embedded iFrame cannot directly retrieve information about the content in the child iFrame, such as the title, favicon, and changes to the URL.  Babel passes this information up to a Speech.js site, alters .bit links, and generally makes for a seamless user experience.

<<<<<<< HEAD
This is not the seamless browsing experience that Speech.js intends to provide.  So it needs a little help from our friend, babel.js!  Babel first checks to see if it is on page that is being framed.  If so, it then sends the favicon and title the site to the parent browsing context (the speech.js site which has the iframe) and then watches for changes to the title and URL, sending them to the parent site as well.  Babel also changes the href value of anchor tags with links to .bit websites (`<a href="http://other-dot-bit-site.bit">) into .spx.is links.
=======
Babel first checks to see if it is on page that is being framed.  If so, it then syncs the favicon, title, and URL of the child .bit site with parent speech.js site. 
Babel also changes the target of external links so that they load directly.  It also supports rewriting anchor tags with links to .bit websites (`<a href="http://other-dot-bit-site.bit"> -> <a href="http://other-dot-bit-site.spx.is">`) but it's currently hardcoded to use .spx.is.
>>>>>>> esperanto
