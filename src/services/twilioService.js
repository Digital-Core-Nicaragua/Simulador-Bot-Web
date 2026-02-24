const DEFAULT_CONFIG = {
  webhookUrl: 'http://localhost:5157/api/chatbot/webhook/twilio',
  accountSid: 'AC8f701e2b61ee2a217549d09be822c9c9',
  authToken: '1769cf11e791c5cdb4c7f3d48f79efae',
  whatsappFrom: 'whatsapp:+14155238886',
  phoneNumber: 'whatsapp:+50588888888'
};

export const getConfig = () => {
  const saved = localStorage.getItem('twilioConfig');
  return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
};

export const saveConfig = (config) => {
  localStorage.setItem('twilioConfig', JSON.stringify(config));
};

export const sendMessage = async (message) => {
  const config = getConfig();
  
  const formData = new URLSearchParams({
    From: config.phoneNumber,
    Body: message,
    AccountSid: config.accountSid,
    To: config.whatsappFrom
  });

  const response = await fetch(config.webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const twiml = await response.text();
  return parseTwiML(twiml);
};

const parseTwiML = (twiml) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(twiml, 'text/xml');
    const messageElement = xmlDoc.getElementsByTagName('Message')[0];
    return messageElement?.textContent || 'Sin respuesta';
  } catch (error) {
    return twiml;
  }
};
