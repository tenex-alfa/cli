import * as AWS from "aws-sdk";

const s3 = new AWS.S3();

const uploadToS3 = async (config: AWS.S3.PutObjectRequest) => {
  return new Promise((res, rej) => {
    s3.upload(config, (err: any, data: any) => {
      if (err) rej(err);
      if (data) res(data);
    });
  });
};

export default uploadToS3;
