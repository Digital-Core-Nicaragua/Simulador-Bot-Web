const DEFAULT_CONFIG = {
  webhookUrl: 'https://yaccproyectos-001-site4.ltempurl.com/api/whatsapp/webhook',
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
    const mediaElement = xmlDoc.getElementsByTagName('Media')[0];
    return {
      text: messageElement?.childNodes[0]?.textContent?.trim() || 'Sin respuesta',
      imageUrl: mediaElement?.textContent?.trim() || null
    };
  } catch (error) {
    return { text: twiml, imageUrl: null };
  }
};
