import { useState } from 'react';
import { getConfig, saveConfig } from '../services/twilioService';

const CONFIG_PASSWORD = 'Yacc1991*';

export default function ConfigPanel({ onBack }) {
  const [config, setConfig] = useState(getConfig());
  const [saved, setSaved] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === CONFIG_PASSWORD) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('¿Restaurar configuración por defecto?')) {
      const defaultConfig = {
        webhookUrl: 'http://localhost:5157/api/chatbot/webhook/twilio',
        accountSid: 'AC8f701e2b61ee2a217549d09be822c9c9',
        authToken: '1769cf11e791c5cdb4c7f3d48f79efae',
        whatsappFrom: 'whatsapp:+14155238886',
        phoneNumber: 'whatsapp:+50588888888'
      };
      setConfig(defaultConfig);
      saveConfig(defaultConfig);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Configuración Protegida</h2>
            <p className="text-gray-600">Ingresa la contraseña para continuar</p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">❌ {error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
            >
              🔓 Desbloquear
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
            >
              ← Volver
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">⚙️ Configuración</h2>
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 font-semibold"
            >
              ← Volver
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📱 Tu Número de Teléfono
              </label>
              <input
                type="text"
                value={config.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                placeholder="whatsapp:+50588888888"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🌐 Webhook URL
              </label>
              <input
                type="text"
                value={config.webhookUrl}
                onChange={(e) => handleChange('webhookUrl', e.target.value)}
                placeholder="https://localhost:7088/api/chatbot/webhook/twilio"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔑 Account SID
              </label>
              <input
                type="text"
                value={config.accountSid}
                onChange={(e) => handleChange('accountSid', e.target.value)}
                placeholder="AC..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔐 Auth Token
              </label>
              <input
                type="password"
                value={config.authToken}
                onChange={(e) => handleChange('authToken', e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📞 WhatsApp From (Twilio)
              </label>
              <input
                type="text"
                value={config.whatsappFrom}
                onChange={(e) => handleChange('whatsappFrom', e.target.value)}
                placeholder="whatsapp:+14155238886"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
            >
              {saved ? '✅ Guardado' : '💾 Guardar Configuración'}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
            >
              🔄 Restaurar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
