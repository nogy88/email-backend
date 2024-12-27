const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASS,
  },
});

// API Endpoint
app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'norven.norov@gmail.com', 
      subject: `Message from ${email}`,
      text: message,
    });
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Export as Vercel handler
module.exports = app;
