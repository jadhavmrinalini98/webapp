const uuid = require('uuid');
const fs = require('fs');
const path = require("path");
const AWS = require('aws-sdk');
const uploadFile = require("../middleware/upload");
const db = require('../config/dbSetup');
const BUCKET_NAME = process.env.BUCKETNAME;

const helper = require('../config/helper')

const s3 = new AWS.S3()

const upload = async (req,res) => {
    try {
        await uploadFile(req, res);
    
        if (req.file == undefined || !helper.checkFileType(req.file.mimetype.split('/')[1])) {
          return res.status(400).send({ message: "Bad Request!! Please upload a file." });
        }

        let fileName=req.file.filename;
        // Read content from the file
        const fileContent = fs.readFileSync(req.file.destination + '/' + fileName);
        const key = uuid.v4() + '/' + req.file.originalname;
        // Setting up S3 upload parameters
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: fileContent
        };
    
        // Uploading files to the bucket
        await s3.upload(uploadParams).promise();

        fs.readdir('assets', (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join('assets', file), (err) => {
                if (err) throw err;
              });
            }
        });

        let product = await db.product.findOne({where:{id: req.params.id}})
        
        let imageObj = await product.createImage({
            product_id: req.params.id,
            file_name: req.file.originalname,
            date_created: new Date().toISOString(),
            s3_bucket_path: key
        })

        let result = {
            "image_id": imageObj.dataValues.image_id,
            "product_id": imageObj.dataValues.product_id,
            "file_name": imageObj.dataValues.file_name,
            "date_created": imageObj.dataValues.date_created,
            "s3_bucket_path": imageObj.dataValues.s3_bucket_path
        }

        res.status(201).json(result);
    } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getImageMeta = async (req, res) => {
    let id = req.params.imageId;

    try{
        let data = await db.image.findOne({
            where:{
                image_id:id
            }
        });
        if(!data) {
            return res.status(404).json({
                message: "Not Found"
            });
        }
        let result = {
            "image_id": data.dataValues.image_id,
            "product_id": data.dataValues.product_id,
            "file_name": data.dataValues.file_name,
            "date_created": data.dataValues.date_created,
            "s3_bucket_path": data.dataValues.s3_bucket_path
        }
        return res.status(200).json(result); 
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

const delImage = async (req, res) => {
    let id = req.params.imageId;
    try {
        let data = await db.image.findOne({
            where:{
                image_id:id
            }
        });

        let bucketPath = data.s3_bucket_path;

        var params = { Bucket: BUCKET_NAME, Key: bucketPath };

        await s3.deleteObject(params).promise();

        return res.status(204).send(); 
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

const getAllImages = async (req, res) => {
    let id = req.params.id;

    try {
        let data = await db.image.findAll({
            where:{
                product_id:id
            }
        });

        let result = [];

        data.forEach(res => {
            delete res.dataValues.date_last_updated
            result.push(res.dataValues);
        });

        return res.status(200).json(result); 
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

module.exports = {
    upload,
    getImageMeta,
    delImage,
    getAllImages
}