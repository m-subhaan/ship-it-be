import type IBaseRepository from "@entities/IBaseRepository";
import type {MerchantEntity} from "@entities/Merchant/MerchantEntity";
import type {Merchant} from "@infrastructure/Database/Models/Merchant";

export interface IMerchantRepository extends IBaseRepository<Merchant, MerchantEntity> {}
