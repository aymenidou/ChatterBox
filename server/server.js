const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');
const socketIo = require('socket.io');

const authRoutes = require('./routes/auth');

const Room = require('./models/Room');
const roomRoutes = require('./routes/room');

const userRoutes = require('./routes/user');

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
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);

// mongodb instance
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

let connectedUsers = {};

// socket io connection handler
io.on('connection', socket => {
    console.log('New client connected');
    // console.log("connection id : " + socket.id);

    const { username } = socket.handshake.query;
    connectedUsers[socket.id] = username;
    io.emit('connectedUsers', Object.values(connectedUsers));

    socket.on('joinRoom', async (roomName) => {
        console.log("Socket id : " + socket.id + " - User : " + username + " - joined room : " + roomName);
        socket.join(roomName);
        const room = await Room.findOne({ name: roomName });
        if (room) {
            socket.emit('loadMessages', room.messages);
        } else {
            const newRoom = new Room({ name: roomName, messages: [] });
            await newRoom.save();
        }
    });
    socket.on('sendMessage', async ({ roomName, username, message }) => {
        const room = await Room.findOne({ name: roomName });
        if (room) {
            const newMessage = { username, message };
            room.messages.push(newMessage);
            await room.save();
            io.to(roomName).emit('newMessage', newMessage);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected > id : ' + socket.id);
        delete connectedUsers[socket.id];
        io.emit('connectedUsers', Object.values(connectedUsers));
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));