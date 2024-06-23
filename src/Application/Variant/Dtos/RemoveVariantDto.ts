import type { IVariantEntity } from "@entities/Variant/VariantEntity";

type TRemoveVariantDto = Pick<IVariantEntity, "variantId">;

export interface RemoveVariantDto extends TRemoveVariantDto { }

export class RemoveVariantDto {
  constructor(body: TRemoveVariantDto) {
    this.variantId = body.variantId;
  }

  static create(body: TRemoveVariantDto) {
    return new RemoveVariantDto(body);
  }
}
