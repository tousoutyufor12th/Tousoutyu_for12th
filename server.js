// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // index.htmlをそのまま提供

io.on('connection', (socket) => {
  console.log('📡 接続:', socket.id);

  // 配信者からのメッセージを全員に送信
  socket.on('broadcast', (data) => {
    io.emit('message', data); // 全員に送る
  });

  socket.on('disconnect', () => {
    console.log('❌ 切断:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://localhost:${PORT}`);
});
