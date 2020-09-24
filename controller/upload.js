const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY
});

const spacesEndpoint = new AWS.Endpoint(process.env.END_POINT);
const s3 = new AWS.S3({endpoint: spacesEndpoint});

exports.uploadfile = (req, res, next) => {
    if(!req.files && req.files.file) {
        res.status(400).json({
            message:'no file upload',
            status: false
        })
    } else {
        let params = { 
            Bucket: process.env.BUCKET_NAME, 
            Key: new Date().getMilliseconds().toString(), 
            Body: req.files.file.data,
            ACL: 'public-read',
        }
        s3.putObject(params, (err, data) => {
            if(err) {
                res.status(400).json({
                    message:'upload error '+ err.message,
                    status: false
                })
            } else {
                res.status(201).json({
                    message:'success',
                    status: true
                })
            }
        })     
    }
} 

exports.listFile = (req, res, next) => {
    let params = {
        Bucket: process.env.BUCKET_NAME,
    };
    let ListItems = [];
    s3.listObjects(params, (err, data) => {
        if (err) console.log(err, err.stack);
        else {
            data['Contents'].forEach((obj) =>{
                ListItems.push(obj['Key'])
            })
            res.status(200).json({
                message:'success',
                status: true,
                data: ListItems
            })
        };
    });
}
exports.geturlDownloadFile = (req, res, next) => {
    const expireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: process.env.BUCKET_NAME,
        Key: req.params.name,
        Expires: expireSeconds
    });
    res.status(200).json({
        message:'success',
        status:true,
        data:url
    })
} 