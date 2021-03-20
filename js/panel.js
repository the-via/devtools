const port = chrome.runtime.connect({ name: "panel-page" });

port.onMessage.addListener((m) => {
  let docFrag = document.createDocumentFragment();
  [...m].reverse().forEach((row) => {
    const addrDiv = document.createElement("div");
    const reqDiv = document.createElement("div");
    const respDiv = document.createElement("div");
    const tsDiv = document.createElement("div");
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
