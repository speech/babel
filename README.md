Babel.js
=======

##TL;DR

Add `<script src="http://meta.www.speech.is/babel.mini.js"></script>` to a .bit website to better compatibility with Speech.is.

##About

Babel is a translator of sorts for websites using [Speech.js](http://speech.github.io/speech.js/) to circumvent censorship.  Normally, a page with an embedded iFrame cannot directly retrieve information about the content in the child iFrame, such as the title or the favicon.  Indeed, if the user navigates away from the initial URL that the iFrame was set to (in `<iframe src="http://example.tld">) the parent browsing context is unable to retrieve updates to the URL.

This is not the seamless browsing experience that Speech.js intends to provide.  So it needs a little help from our friend, babel.js!  Babel first checks to see if it is on page that is being framed.  If so, it then sends the favicon and title the site to the parent browsing context (the speech.js site which has the iframe) and then watches for changes to the title and URL, sending them to the parent site as well.  Babel also changes the href value of anchor tags with links to .bit websites (`<a href="http://other-dot-bit-site.bit">) into .spx.is links.