const portHub = {};

function sendToPort(name, msg) {
  if (portHub[name]) {
    portHub[name].postMessage(msg);
  }
}

function connected(p) {
  portHub[p.name] = p;
  if (p.name === "content-script") {
    sendToPort("content-script", { msg: "something" });

    p.onMessage.addListener((m) => {
      if (m.command === "getLogs") {
        sendToPort("panel-page", m.payload);
      }
    });
  }

  if (p.name === "panel-page") {
    sendToPort("content-script", { command: "getLogs" });
  }
}

chrome.runtime.onConnect.addListener(connected);
