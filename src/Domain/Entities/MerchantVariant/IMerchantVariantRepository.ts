import type IBaseRepository from "@entities/IBaseRepository";
import type { MerchantVariantEntity } from "@entities/MerchantVariant/MerchantVariantEntity";
import type { MerchantVariant } from "@infrastructure/Database/Models/MerchantVariant";

export interface IMerchantVariantRepository extends IBaseRepository<MerchantVariant, MerchantVariantEntity> { }
