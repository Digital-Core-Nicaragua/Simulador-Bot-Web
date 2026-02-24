import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { useChat } from '../hooks/useChat';
import { getConfig } from '../services/twilioService';

export default function ChatWindow({ onBack }) {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendUserMessage, clearMessages } = useChat();
  const messagesEndRef = useRef(null);
  const config = getConfig();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendUserMessage(input);
    setInput('');
  };

  const handleClear = () => {
    if (window.confirm('¿Limpiar toda la conversación?')) {
      clearMessages();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="hover:bg-green-700 p-2 rounded-full transition"
            >
              ← Volver
            </button>
            <div>
              <h2 className="font-bold text-lg">AguaRoca Bot</h2>
              <p className="text-sm opacity-90">{config.phoneNumber}</p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition"
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-4xl mb-4">💬</p>
            <p>Escribe un mensaje para comenzar</p>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white p-4 shadow-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-green-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
