export interface IProductEntity {
  productId: string;
  title: string;
  description: string;
  brand: string;
  vendor: string;
  status: string;
  imageUrl: string;
  categoryId: string;
  subCategoryId: string;
}

export interface ProductEntity extends IProductEntity { }

export class ProductEntity {
  constructor(productEntity: ProductEntity) {
    this.productId = productEntity.productId;
    this.title = productEntity.title ? productEntity.title.trim() : productEntity.title;
    this.description = productEntity.description ? productEntity.description.trim() : productEntity.description;
    this.brand = productEntity.brand ? productEntity.brand.trim() : productEntity.brand;
    this.vendor = productEntity.vendor ? productEntity.vendor.trim() : productEntity.vendor;
    this.status = productEntity.status ? productEntity.status.trim() : productEntity.status;
    this.imageUrl = productEntity.imageUrl;
    this.categoryId = productEntity.categoryId;
    this.subCategoryId = productEntity.subCategoryId;
  }

  static create(productEntity) {
    return new ProductEntity(productEntity);
  }
}
