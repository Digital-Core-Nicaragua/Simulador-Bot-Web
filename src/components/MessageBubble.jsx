export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-green-500 text-white'
            : isSystem
            ? 'bg-red-100 text-red-800'
            : 'bg-white text-gray-800 shadow'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString('es-NI', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
}
