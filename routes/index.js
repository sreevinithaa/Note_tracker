const express = require('express');

// Import our modular routers for /note
const noteRouter = require('./note');



const app = express();

app.use('/notes', noteRouter);



module.exports = app;
