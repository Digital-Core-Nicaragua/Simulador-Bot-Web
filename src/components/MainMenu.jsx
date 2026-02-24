import { getConfig } from '../services/twilioService';

export default function MainMenu({ onStartChat, onConfigure }) {
  const config = getConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💬</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            YACC WhatsApp Simulator
          </h1>
          <p className="text-gray-600">Prueba tu chatbot localmente</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">📱 Tu número:</span>
            <span className="font-mono text-gray-800">{config.phoneNumber}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onStartChat}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-xl">💬</span>
            Iniciar Chat
          </button>

          <button
            onClick={onConfigure}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-xl">⚙️</span>
            Configurar
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Desarrollado por Yuriel Cortez</p>
        </div>
      </div>
    </div>
  );
}
