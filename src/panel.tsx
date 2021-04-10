import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
const port = chrome.runtime.connect({ name: 'panel-page' });
const Root: React.FC<{}> =  () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    port.onMessage.addListener((m) => {
      setMessages(m);
    });
}, []);
  return (
    <>
    VIA
      {messages.map((message: any) => (
        <div>
          <div className="addr">{message.kbAddr}</div>
          <div className="req">{JSON.stringify(message.request)}</div>
          <div className="resp">
            {JSON.stringify(
              Array(32)
                .fill(0)
                .map((_, i) => message.response[i]),
            )}
          </div>
          <div className="ts">
            {new Date(message.ts).toLocaleTimeString('en-US', {
              hour12: false,
            })}
          </div>
        </div>
      ))}
    </>
  );
};

ReactDOM.render(<Root />, document.body);