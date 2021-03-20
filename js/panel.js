const port = chrome.runtime.connect({ name: "panel-page" });

port.onMessage.addListener((m) => {
  let docFrag = document.createDocumentFragment();
  [...m].reverse().forEach((row) => {
    const addrDiv = document.createElement("div");
    addrDiv.className = "addr";
    const reqDiv = document.createElement("div");
    reqDiv.className = "req";
    const respDiv = document.createElement("div");
    respDiv.className = "resp";
    const tsDiv = document.createElement("div");
    tsDiv.className = "ts";
    addrDiv.innerHTML = row.kbAddr;
    reqDiv.innerHTML = JSON.stringify(row.request);
    respDiv.innerHTML = JSON.stringify(
      Array(32)
        .fill(0)
        .map((_, i) => row.response[i])
    );
    tsDiv.innerHTML = new Date(row.ts).toLocaleTimeString("en-US", {
      hour12: false,
    });
    docFrag.append(...[addrDiv, reqDiv, respDiv, tsDiv]);
  });
  document.body.innerHTML = "";
  document.body.appendChild(docFrag);
});
