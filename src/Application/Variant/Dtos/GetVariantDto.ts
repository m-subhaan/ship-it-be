import type { IVariantEntity } from "@entities/Variant/VariantEntity";

type TGetVariantDto = Partial<Pick<IVariantEntity, "productId">>;

export interface GetVariantDto extends TGetVariantDto { }

export class GetVariantDto {
  constructor(body: TGetVariantDto) {
    this.productId = body.productId as string;
  }

  static create(body: TGetVariantDto) {
    return new GetVariantDto(body);
  }
}
