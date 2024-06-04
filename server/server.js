const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/auth');
const socketIo = require('socket.io');

// express instance
const app = express();
const server = http.createServer(app);

// socket CORS definition
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// mongodb instance
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

// socket io connection handler
io.on('connection', socket => {
    console.log('New client connected');
    console.log("connection id : " + socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected > id : ' + socket.id);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));