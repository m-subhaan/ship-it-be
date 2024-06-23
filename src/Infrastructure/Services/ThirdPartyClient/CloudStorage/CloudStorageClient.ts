import AWS from 'aws-sdk';
import { injectable } from 'tsyringe';

import { FILE_ENCODINGS, CREDENTIALS } from '@appUtils/Constants';
import { ICloudStorageClient } from './ICloudStorageClient';

@injectable()
export class CloudStorageClient implements ICloudStorageClient {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: CREDENTIALS.AWS_ACCESS_KEY_ID,
      secretAccessKey: CREDENTIALS.AWS_SECRET_ACCESS_KEY,
    });
  }

  async generateV4ReadSignedUrl(bucketName: string, filename: string, expires?: number) {
    return await this.s3.getSignedUrlPromise('getObject', {
      Bucket: bucketName,
      Key: filename,
      Expires: expires,
      ResponseContentDisposition: 'inline',
      ResponseContentType: `image/${filename.split(".")[1]}`,
    });
  }

  async downloadFile(bucketName: string, fileName: string, downloadPath: string) {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
    };

    const file = require('fs').createWriteStream(downloadPath);
    const response = await this.s3.getObject(params).promise();
    file.write(response.Body as Buffer);
    file.close();
    return;
  }

  async deleteFile(bucketName: string, srcFileName: string) {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: bucketName,
      Key: srcFileName,
    };

    return await this.s3.deleteObject(params).promise();
  }

  async uploadFile(bucketName: string, fileContents: string | Buffer, destFileName: string) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: destFileName,
      Body: fileContents,
    };

    return await this.s3.putObject(params).promise();
  }

  async getFileContent(bucketName: string, fileName: string) {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
    };

    const response = await this.s3.getObject(params).promise();
    return response.Body?.toString(FILE_ENCODINGS.UTF8) || '';
  }
}
