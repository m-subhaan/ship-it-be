import AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

import type {TResponse} from "@typings/Express";

export type TDeleteResponse = Promise<PromiseResult<AWS.S3.DeleteObjectOutput, AWS.AWSError>>;

export type TUploadResponse = Promise<PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>>;

export type TFileContent = Promise<string>;
 