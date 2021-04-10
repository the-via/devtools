const portHub : {[name: string]: chrome.runtime.Port} = {};

function sendToPort(name: string, msg: any) {
  if (portHub[name]) {
    portHub[name].postMessage(msg);
  }
}

function connected(p: chrome.runtime.Port) {
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
