import type { TDeleteResponse, TFileContent, TUploadResponse } from "@typings/CloudStorageClient";

export interface ICloudStorageClient {
    generateV4ReadSignedUrl(bucketName: string, filename: string, expires?: number): Promise<string>;
    downloadFile(bucketName: string, fileName: string, downloadPath: string): Promise<void>;
    deleteFile(bucketName: string, srcFileName: string): TDeleteResponse;
    uploadFile(bucketName: string, fileContents: string | Buffer, destFileName: string): TUploadResponse;
    getFileContent(bucketName: string, fileName: string): TFileContent;
}
