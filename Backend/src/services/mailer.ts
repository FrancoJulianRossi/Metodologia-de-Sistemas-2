// Simple mailer service (stub) - replace with real implementation (nodemailer, external service)

async function sendMail(to: string, subject: string, text: string) {
  // Here you would integrate with an SMTP server or a transactional email API
  // For now we just log the message so we can see it while developing.
  console.log('--- Simulated email ---');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('Body:', text);
  console.log('-----------------------');
  return Promise.resolve();
}

module.exports = { sendMail };
