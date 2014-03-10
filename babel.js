'use strict';

//TODO jsDoc notations, encapsulate via anonfunc closure
//TODO validate via YUI scripts?  Embed via Caja?

function change(id, oldVal, newVal) {
  var type = 'location';
  var value = window.location.href;

  if (id === 'title') {
    type = 'title';
    value = document.title;
  } else if (id === 'favicon') {
    type = 'favicon';
    value = newVal;
  }

  window.parent.postMessage({type: type, value: value}, '*');
}

if (window.parent) {

  //space savers to fit under arbitrary 1KB size limit
  var l = window.location;
  var d = document;

  if (!Object.prototype.watch) {  //don't overwrite gecko watch function
    Object.prototype.watch = function(prop, handler) {
      var oldval = this[prop], newval = oldval,
        getter = function() {
          return newval;
        },
        setter = function(val) {
          oldval = newval;
          return newval = handler.call(this, prop, oldval, val);
        };
      if (delete this[prop]) {
        Object.defineProperty(this, prop, {
          get: getter,
          set: setter
        });
      }
    };
  }

  change('location', null, l);
  change('title', null, d.title);

  l.watch('hash', change);
  l.watch('pathway', change);
  l.watch('search', change);
  d.watch('title', change);

  window.onload = function() {

    //change non-relative links to target top page
    var anchors = d.getElementsByTagName('a');
    var absolute = new RegExp('^(?:[a-z]+:)?//', 'i');
    for (var i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      if ((anchor.origin !== l.origin) &&
        absolute.test(anchor.origin)) {
        anchor.setAttribute('target', '_top');
      }

    }

    //change all .bit links into .spx.is links
    for (var i = 0, len = d.links; i < len; i++) {
      var link = d.links[i];

      if (link.host.slice(-3) === 'bit') {
        link.host = link.host.slice(0, -3) + 'spx.is';
      }
    }


    //find the favicon
    var favFound = false;

    var headLinks = d.head.getElementsByTagName('link');

    for (var i = 0, len = headLinks; i < len & favFound; i++) {
      var link = headLinks[i].href;
      if (link.host.slice(-3) === 'ico') {
        change('favicon', null, headLinks[i]);
        favFound = true;
      }
    }
    if (!favFound) {
      change('favicon', null, l.protocol + '//g.etfv.co/' + l.origin);
    }
  };
}