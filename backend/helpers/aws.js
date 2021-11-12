import AWS from 'aws-sdk';
import config from '../config/config';
import { PassThrough } from 'stream';
import archiver from 'archiver';

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

  const multiFilesStream = (infos) => {
    const archive = archiver('zip', { zlib: { level: 5 } });
    for (let i = 0; i < infos.length; i += 1) {
      const passthrough = new PassThrough();

      console.log(infos[i].file)
      s3bucket
        .getObject({
          Bucket: config.aws.Bucket,
          Key: infos[i].file
        })
        .createReadStream()
        .pipe(passthrough);
      archive.append(passthrough, { name: infos[i].name });
    }
    return archive;
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
    req.multiFilesStream = multiFilesStream;
    next();
  };
};
