chrome.devtools.panels.create("VIA", null, "/html/panel.html", (panel) => {
  panel.onShown.addListener(function (window) {
    chrome.runtime.connect({ name: "devtools" });
    chrome.devtools.inspectedWindow.eval("console.log('shown');");
  });
  panel.onHidden.addListener(function () {
    chrome.devtools.inspectedWindow.eval("console.log('hidden');");
  });
});

chrome.runtime.onConnect.addListener((port) => {
  chrome.devtools.inspectedWindow.eval(`alert('connected ${port.name}');`);
});
