const express = require('express');
const http = require('http');
const cors = require('cors');
const { PORT } = require('./config');


const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));