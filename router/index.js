const express = require('express');
const app = express();
const UploadRouter = require('./upload')

app.use('/upload', UploadRouter)

module.exports = app;