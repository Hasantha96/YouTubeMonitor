let dataUsage = 0;
let initialTime= Date.now();

onHeadersReceived_callback = function(details) {
  console.debug(details);
  let requestSize = details.responseHeaders.find(function(entry){ return entry.name==="content-length" }).value;
  dataUsage = parseInt(dataUsage) + parseInt(requestSize);
  //let timeDif = diff_minutes(initialTime ,Date.now());
  chrome.runtime.sendMessage({ msg: "onHeadersReceived", data: dataUsage ,timeStarted: initialTime, timeEnd: Date.now()});
  return {};
}

chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceived_callback,
  {urls: ["*://*.youtube.com/*","*://*.googlevideo.com/*","*://yt3.ggpht.com/*", "*://i.ytimg.com/*"]},
  //{urls: ["<all_urls>"]},
  ["responseHeaders"]
);

