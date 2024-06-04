const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/auth');


const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));