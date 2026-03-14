require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const path       = require('path');
const http       = require('http');
const { Server } = require('socket.io');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, { cors: { origin: '*' } });
const PORT   = process.env.PORT || 3000;

app.set('io', io);

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth',  require('./routes/auth'));
app.use('/api/cases', require('./routes/cases'));
app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

io.on('connection', socket => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected');
    server.listen(PORT, '0.0.0.0', () => {
      console.log('🚀  TraceBack → http://localhost:' + PORT);
      console.log('📡  Socket.io → ws://localhost:' + PORT);
    });
  })
  .catch(err => { console.error('❌  MongoDB failed:', err.message); process.exit(1); });
