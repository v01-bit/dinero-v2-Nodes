const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);
  const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': types[ext] || 'text/plain'});
    res.end(data);
  });
});
server.listen(3456, () => console.log('Server running on port 3456'));
