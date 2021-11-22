import AWS from 'aws-sdk';
import config from '../config/config';
import { PassThrough } from 'stream';

export default () => {
  const s3bucket = new AWS.S3({
    accessKeyId: config.aws.access,
    secretAccessKey: config.aws.secret,
    Bucket: config.aws.Bucket,
  });

  const uploadFile = function(name, buffer) {

    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.aws.Bucket,
        Key: name,
        Body: buffer,
        ACL: 'public-read',
      };
      s3bucket.upload(params, (err, data) => {
        if (err) return reject(err);
        resolve(data.Location);
      });
    });
  };

  

  const createBucket = function(name) {
    AWS.config.update({region: 'REGION'});

    var bucketParams = {
      Bucket : name
    };
    s3bucket.createBucket(bucketParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Location);
      }
    });
  }

  return function(req, res, next) {
    req.uploadFile = uploadFile;
    req.createBucket = createBucket;
    next();
  };
};
