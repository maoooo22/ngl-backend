const express = require('express');
const app = express();
const serverless = require('serverless-http');

app.use(express.json());

app.post('/send', async (req, res) => {
  const { username, question } = req.body;

  if (!username || !question) {
    return res.status(400).json({ success: false, message: 'Missing username or question' });
  }

  try {
    const response = await fetch('https://ngl.link/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username,
        question,
        deviceId: 'website'
      })
    });

    const data = await response.json();
    if (data.success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: 'NGL error' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetch failed' });
  }
});

module.exports = serverless(app);
