const port = chrome.runtime.connect({
  name: "content-script",
});

window.addEventListener("message", (msg) => {
  console.log(msg);
  const { data } = msg;
  if (data && data.command === "getLogs" && data.payload !== undefined) {
    port.postMessage({
      command: "getLogs",
      payload: data.payload,
    });
  }
});

port.onMessage.addListener((m) => {
  if (m.command === "getLogs") {
    window.postMessage({ command: "fetchLogs" }, "*");
  }
});

window.__portal = (fn) => {
  fn(chrome);
};
