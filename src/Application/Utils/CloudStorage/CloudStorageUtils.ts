import async from "async";
import { inject, injectable } from "tsyringe";

import type { ICloudStorageClient } from "@infraServices/ThirdPartyClient/CloudStorage/ICloudStorageClient";

import { ProductEntity } from "@entities/Product/ProductEntity";
import { VariantEntity } from "@entities/Variant/VariantEntity";
import { BUCKET_FOLDERS } from "@appUtils/Constants";

@injectable()
export class CloudStorageUtils {
  constructor(@inject("ICloudStorageClient") private cloudStorageClient: ICloudStorageClient) { }

  async generateV4ReadSignedUrl(bucket: string, filename: string, expires?: number) {
    return await this.cloudStorageClient.generateV4ReadSignedUrl(bucket, filename, expires);
  }

  async bulkGenerateV4ReadSignedUrl<Entity>(bucket: string, entity: Entity, expires?: number) {
    let imageUrls: string[] = [];
    let fileDestination: string;

    if (entity instanceof ProductEntity) {
      imageUrls = [entity.imageUrl];
      fileDestination = `${BUCKET_FOLDERS.PRODUCT}/${entity.productId}`;
    } else if (entity instanceof VariantEntity) {
      imageUrls = entity.imageUrls || [];
      fileDestination = `${BUCKET_FOLDERS.PRODUCT}/${entity.productId}/${BUCKET_FOLDERS.VARIANT}`;
    }

    if (!imageUrls.length) {
      return [];
    }

    const awsImageUrls: string[] = [];
    await async.eachSeries(imageUrls, async (image) => {
      const awsImageUrl = await this.generateV4ReadSignedUrl(bucket, `${fileDestination}/${image}`, expires);
      awsImageUrls.push(awsImageUrl)
    });

    return awsImageUrls;
  }

  async getFileContent(bucket: string, filename: string) {
    return await this.cloudStorageClient.getFileContent(bucket, filename);
  }

  async downloadFile(bucket: string, filename: string, downloadPath: string) {
    return await this.cloudStorageClient.downloadFile(bucket, filename, downloadPath);
  }

  async uploadFile(bucket: string, fileContent: string | Buffer, filename: string) {
    return await this.cloudStorageClient.uploadFile(bucket, fileContent, filename);
  }

  async deleteFile(bucket: string, filename: string) {
    return await this.cloudStorageClient.deleteFile(bucket, filename);
  }
}
