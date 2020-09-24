const express = require('express');
const router = express.Router();
const UploadController = require('../controller/upload');

router.post('/upload-file', UploadController.uploadfile)
router.get('/list-file-space', UploadController.listFile)
router.get('/get-url-file/:name', UploadController.geturlDownloadFile)

module.exports = router;