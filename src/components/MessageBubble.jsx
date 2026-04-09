function formatWhatsApp(text) {
  return text
    .replace(/https?:\/\/[^\s]+/g, '<a href="$&" target="_blank" class="underline text-blue-500">$&</a>')
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/~(.*?)~/g, '<del>$1</del>');
}

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
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="producto"
            className="rounded-lg mb-2 max-w-full"
            onError={(e) => e.target.style.display = 'none'}
          />
        )}
        <p
          className="whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: formatWhatsApp(message.text) }}
        />
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
