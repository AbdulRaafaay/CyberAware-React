const createTransporter = require('../config/email');

// Create the transporter once to avoid reconnecting for every email.
const transporter = createTransporter();

// Basic email sender (used by auth flows)
// options: { to, subject, text, html, from? }
const sendEmail = async (options) => {
  const mailOptions = {
    from: options.from || process.env.EMAIL_FROM || 'noreply@example.com',
    to: options.to,
    subject: options.subject,
    text: options.text || ' ',
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

