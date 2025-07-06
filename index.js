const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const { title, content, secret } = req.body;

  if (secret !== 'yatmarina-bilge-key') {
    return res.status(403).json({ success: false, message: 'Yetkisiz erişim' });
  }

  try {
    const response = await axios.post('https://yatmarina.com.tr/api/gpt-yayina-al.php', {
      title,
      content,
      secret
    });
    return res.status(200).json({ success: true, wordpress: response.data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = app;