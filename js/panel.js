let color = 'blue';
setTimeout(() => {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor = color;'});
  chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'console.log("hahahaha");'});

})
},3000);
