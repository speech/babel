'use strict';

//TODO: unit test observe and popstate
//TODO: encapsulate via anonfunc
//TODO: detect .bit connectivity and redirect

var nonce;

if (window.parent){

  //TODO: wait for message from Speech.js in parent browsing context?

  if (document.readyState === 'complete' || document.readyState === 'loaded') {
    //TODO: test if necessary.
    setup();
  } else {
    document.addEventListener("DOMContentLoaded", setup);
  }

}

//event timeout request nonce ~100 milliseconds
function setup(){

  window.addEventListener('popstate', function(event) {
    change('location', window.location.href);
  });

  var observer = new window.MutationObserver(function(mutations) {
    change('title', document.title);
  });

  observer.observe(document.querySelector('head > title'), {
    subtree: true,
    characterData: true,
    childList: true
  });


  change('location', window.location.href);
  change('title', document.title);
  getFavicon(change);
  fixLinks();
}

/**
 * Passes changes up to Speech.js.
 * @param type {string}
 * @param value {*}
 */
function change(type, value) {
  var message = {};
  message['type'] = type;
  message['value'] = value;
  window.parent.postMessage(message, '*');
}

/**
 * Gets the favicons or generates lookup for URL for custom favicon construction.
 * @param callback {Function}
 */
function getFavicon (callback){

  var links = document.head.getElementsByTagName('link');
  var favicons = [];

  for(var i = 0, len = links.length; i < len; i++){
    var link = links[i];
    if(link.hasAttribute('rel')){
      var rel = link.getAttribute('rel');
      if(rel === "apple-touch-icon" || rel ==="icon"){
        var favi = {};
        favi['html'] = link.outerHTML;
        favi['href'] = link.href;
        favicons.push(favi);
      }
    }
  }

  if (favicons.length === 0){
    var favicon = {};
    favicon['html'] = '<link rel="icon" type="image/x-icon" href="favicon.ico">';
    favicon['href'] =  window.location.origin + '/favicon.ico';
    favicons = [favicon];
  }

  callback('favicons', favicons);

}

/**
 * Changes converts .bit link and changes non-relative links to target the iFrame parent.
 */
function fixLinks(){

  var links = document.links;

  var url = window.location.hostname.split('.');
  if(url.length > 2 &&  url[url.length - 2].length < 4){ //if SLD
    url = url.slice(-3);
  } else {
    url = url.slice(-2);
  }

  for(var i = 0, len = links.length; i < len; i++){
    var link = links[i];

    /**
     * if .bit site -> spx.is -> if !target -> retarget
     * if !target && absolute link -> if rel external/nofollow||same origin -> retarget
     */

    if(link.hostname.slice(-3) === 'bit'){
      link.hostname = link.hostname.slice(0, -3) + 'spx.is';
      if(!link.target){
        retargetLink(link);
      }
    } else if (!link.target) {
      var absolute = link.href.slice(0,1) === "//" || link.href.slice(0,4) === "http";
      if(absolute){
        var compareHref = true;
        if(link.hasAttribute('rel')){
          var rel = link.getAttribute('rel');
          if(rel.indexOf('external') > -1 || rel.indexOf('nofollow') > -1 ){
            retargetLink(link);
            compareHref = false;
          }
        }
        if(compareHref){
          var domain = link.hostname.split('.').slice(-url.length);
          var same = domain.length === url.length;
          var count = 0;

          while(same && count < domain.length){
            same = domain[count] === url[count];
            count++;
          }

          if(!same){
            retargetLink(link);
          }
        }
      }
    }

  }

  function retargetLink(link){
    link.setAttribute('target', '_top');
  }
}

/** @define {boolean} */
var DEBUG = true;

if(DEBUG && typeof window["babel"] === 'undefined'){
  var babel = {};
  babel.change = change;
  babel.getFavicon = getFavicon;
  babel.fixLinks = fixLinks;
  window["babel"] = babel;
}