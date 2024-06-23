import type { IProductEntity } from "@entities/Product/ProductEntity";

type TRemoveProductDto = Pick<IProductEntity, "productId">;

export interface RemoveProductDto extends TRemoveProductDto { }

export class RemoveProductDto {
  constructor(body: TRemoveProductDto) {
    this.productId = body.productId;
  }

  static create(body: TRemoveProductDto) {
    return new RemoveProductDto(body);
  }
}
