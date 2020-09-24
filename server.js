const express = require('express');
const bodyParser = require('body-parser'); 
const fileUpload = require('express-fileupload')
require('dotenv').config()
const app = express();
const router = require('./router/index')

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.use('/api', router);
app.use((req, res, next) => {
    res.status(400).json({
        message:'path not found',
        status: false
    })
});

app.use((err, req, res, next) => {
    const message = err.message ? err.message : 'error from server'
    res.status(500).json({
        message:message,
        status: false
    })
});

app.listen(3001, () => {
    console.info('runnning at 3001')
})