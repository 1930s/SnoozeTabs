/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the 'License'). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

/* globals timeForId:false, moment:false */

'use strict';

document.addEventListener('click', e => {
  if (e.target.classList.contains('option')) {
    var choice = e.target.id || '';
    let [time, ] = timeForId(moment(), choice);
    browser.tabs.query({currentWindow: true, active: true}).then(tabs => {
      for (var tab of tabs) {
        browser.runtime.sendMessage({
          'time': time.valueOf(),
          'title': tab.title || '',
          'url': tab.url,
          'windowId': tab.windowId
        });
      }
    });
  } else if (e.target.classList.contains('footer')) {
    browser.storage.local.get().then(items => {
      console.log(items); // eslint-disable-line no-console
      browser.storage.local.clear();
    });
  }
});

let dates = document.querySelectorAll('li.option > .date');
for (let date of dates) {
  let choice = date.parentNode.id; 
  let [, text] = timeForId(moment(), choice);
  date.textContent = text;
}