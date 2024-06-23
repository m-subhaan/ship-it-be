import { injectable } from "tsyringe";

import type { IMerchantVariantRepository } from "@entities/MerchantVariant/IMerchantVariantRepository";
import type { MerchantVariantEntity } from "@entities/MerchantVariant/MerchantVariantEntity";

import { MerchantVariant } from "@infrastructure/Database/Models/MerchantVariant";

import BaseRepository from "@repositories/BaseRepository";

@injectable()
export class MerchantVariantRepository extends BaseRepository<MerchantVariant, MerchantVariantEntity> implements IMerchantVariantRepository {
  constructor() {
    super(MerchantVariant);
  }
}
