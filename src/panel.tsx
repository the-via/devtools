import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TestJSON from './fake-data.json';
import './styles.css';
const port = chrome.runtime.connect({ name: 'panel-page' });
const DEBUG = true;
type Message = {
  kbAddr: string;
  request: number[];
  response: number[];
  ts: number;
};
type DebugMessage = Message & {
  response: {
    type: string;
    data: number[];
  };
};

const categorize = (messages: Message[]) => {
  return messages.reduce((p, message) => ({
    ...p,
    [message.kbAddr]: [...(p[message.kbAddr] ?? []), message]
  }), {} as {[addr: string]: Message[]});
};

const Root: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  useEffect(() => {
    if (DEBUG) {
      const json = TestJSON as DebugMessage[];
      const debugMessages = json.map((msg) => ({
        ...msg,
        response: msg.response.data,
      }));
      setMessages(debugMessages);
    }

    port.onMessage.addListener((m) => {
      setMessages(m);
    });
  }, []);
  const categorizedMessages = categorize(messages);
  return (
    <div className="flex">
      <div className="w-32">
        {Object.keys(categorizedMessages).map(category => (
          <div title={category} className="bg-red-100 font-bold rounded-md truncate">
            {category}
          </div>
        ))}
      </div>
      <div className="grid panel-data-cols gap-x-4">
        {(Object.values(categorizedMessages)[0] ?? []).map((message: Message) => (
          <>
            <div className="text-xs">
              {
                Array(32)
                  .fill(0)
                  .map((_, idx) => <span className={`w-4 text-center inline-block ${idx % 2 ? 'bg-gray-100': 'bg-gray-50'}`}>{message.request[idx] || 0}</span>)
              }
            </div>
            <div className="text-xs">
              {
                Array(32)
                  .fill(0)
                  .map((_, idx) => <span className={`w-4 text-white text-center inline-block ${idx % 2 ? 'bg-gray-500': 'bg-gray-400'}`}>{message.response[idx] || 0}</span>)
              }
            </div>
            <div>
              {new Date(message.ts).toLocaleTimeString('en-US', {
                hour12: false,
              })}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<Root />, document.body);
