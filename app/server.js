const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
           || req.socket.remoteAddress
           || 'unknown';

  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const accept = (req.headers['accept'] || '').toLowerCase();

  const wantsText = ua.includes('curl') || ua.includes('wget') ||
                    accept.includes('text/plain') || !accept.includes('text/html');

  if (wantsText) {
    res.type('text/plain').send(ip + '\n');
  } else {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your IP</title>
  <style>
    body { font-family: system-ui, sans-serif; text-align: center; margin-top: 20vh; }
    h1 { font-size: 3rem; margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <h1>${ip}</h1>
  <p>Your public IP address</p>
</body>
</html>`);
  }
});

app.listen(port, () => console.log(`Listening on ${port}`));
