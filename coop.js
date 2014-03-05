/**
 * @license AGPLv3 2014
 * @author indolering
 */

'use strict';

//bullshit hardcoded list

var parents = ['speech.is','spx.is','speech.spx','speech.sx','localhost:63342'];
function change(changeObject) {
  parents.forEach(function(site) {
    try {
      top.postMessage(changeObject,'*');
    } catch (e) {
      //there can only be one!
    }
  });
}

window.onload=function(){
  change({location:window.location});
  change({title:document.title});
};

var watch = require('../bower_components/watch/src/watch').watch;

watch(window, 'location', function() {
  change({location:window.location});
});

var observer = new window.MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    change({title:mutation.target.textContent});
  });
});

observer.observe(document.querySelector('head > title'),
  { subtree: true, characterData: true, childList: true });
