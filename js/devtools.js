chrome.devtools.panels.create("VIA", null, "/html/panel.html", (panel)=>{
  panel.onShown.addListener(function(window) {
chrome.devtools.inspectedWindow.eval("console.log('shown');");
}), panel.onHidden.addListener(function() {
chrome.devtools.inspectedWindow.eval("console.log('hidden');");
});
});
console.error(Object.keys(chrome.tabs));
let color = 'blue';
setInterval(()=>{
chrome.devtools.inspectedWindow.eval("alert(3);");
}, 5000);