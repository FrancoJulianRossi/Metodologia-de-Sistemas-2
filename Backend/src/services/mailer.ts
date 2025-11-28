// Servicio de envío de correos simple (stub) - reemplazar con implementación real (nodemailer o servicio externo)

async function sendMail(to: string, subject: string, text: string) {
  // Aquí integrarías con un servidor SMTP o una API de correo transaccional
  // Por ahora solo hacemos console.log para ver el mensaje durante el desarrollo.
  console.log('--- Simulated email ---');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Body:', text);
  console.log('-----------------------');
  return Promise.resolve();
}

module.exports = { sendMail };
