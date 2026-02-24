import { useState } from 'react';
import MainMenu from './components/MainMenu';
import ChatWindow from './components/ChatWindow';
import ConfigPanel from './components/ConfigPanel';
import './index.css';

function App() {
  const [view, setView] = useState('menu'); // menu, chat, config

  return (
    <>
      {view === 'menu' && (
        <MainMenu
          onStartChat={() => setView('chat')}
          onConfigure={() => setView('config')}
        />
      )}
      {view === 'chat' && (
        <ChatWindow onBack={() => setView('menu')} />
      )}
      {view === 'config' && (
        <ConfigPanel onBack={() => setView('menu')} />
      )}
    </>
  );
}

export default App;
