const http = require('http');

const server = http.createServer((req, res) => {
  // Prefer the leftmost address from X-Forwarded-For (what Azure sets)
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress;

  // Strip port if present (IPv4:port or [IPv6]:port)
  if (ip.includes('.')) {
    ip = ip.split(':')[0];                 // IPv4
  } else if (ip.startsWith('[')) {
    ip = ip.slice(1, ip.indexOf(']'));     // IPv6 with brackets
  }
  // Plain IPv6 has no port in remoteAddress on most Node versions

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your IP</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; flex-direction: column;
           align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .ip { font-size: 3rem; font-weight: 700; }
    .label { margin-top: 0.5rem; color: #555; }
  </style>
</head>
<body>
  <div class="ip">${ip || 'unknown'}</div>
  <div class="label">Your public IP address</div>
</body>
</html>`);
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`listening on ${port}`));