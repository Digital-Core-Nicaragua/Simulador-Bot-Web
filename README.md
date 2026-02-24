# Twilio WhatsApp Simulator - Web

Simulador web con interfaz estilo WhatsApp para probar tu chatbot localmente.

## 🚀 Características

- ✅ Interfaz estilo WhatsApp con burbujas de chat
- ✅ Configuración persistente (localStorage)
- ✅ Animación de "escribiendo..."
- ✅ Responsive (funciona en móvil)
- ✅ Historial de mensajes
- ✅ Cambio de configuración en tiempo real

## 📦 Tecnologías

- React 18
- Vite
- Tailwind CSS
- LocalStorage API

## 🛠️ Instalación

```bash
cd twilio-simulator-web
npm install
```

## ▶️ Ejecutar

1. Inicia el API del chatbot:
```bash
cd ../BotComercial
dotnet run --project src\Host\BotComercial.ApiGateway
```

2. En otra terminal, inicia el simulador web:
```bash
cd twilio-simulator-web
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## 🎨 Capturas

### Menú Principal
- Botón "Iniciar Chat"
- Botón "Configurar"
- Muestra configuración actual

### Chat
- Burbujas verdes para tus mensajes
- Burbujas blancas para el bot
- Animación de "escribiendo..."
- Botón para limpiar conversación

### Configuración
- Tu número de teléfono
- Webhook URL
- Account SID
- Auth Token
- WhatsApp From
- Botón guardar y restaurar

## 📱 Uso

1. **Configurar**: Ajusta tu número y webhook URL
2. **Iniciar Chat**: Comienza a chatear con el bot
3. **Volver**: Regresa al menú principal en cualquier momento

## 🔧 Configuración por Defecto

```javascript
{
  webhookUrl: 'https://localhost:7088/api/chatbot/webhook/twilio',
  accountSid: 'AC8f701e2b61ee2a217549d09be822c9c9',
  authToken: '1769cf11e791c5cdb4c7f3d48f79efae',
  whatsappFrom: 'whatsapp:+14155238886',
  phoneNumber: 'whatsapp:+50588888888'
}
```

## 🌐 Build para Producción

```bash
npm run build
```

Los archivos se generan en `dist/`

## 📝 Notas

- La configuración se guarda en localStorage del navegador
- Si usas HTTPS en el webhook, asegúrate de aceptar el certificado
- Puedes abrir múltiples pestañas con diferentes números
