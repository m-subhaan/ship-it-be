import {injectable} from "tsyringe";

import BaseRepository from "@repositories/BaseRepository";

import {Merchant} from "@infrastructure/Database/Models/Merchant";

import type {IMerchantRepository} from "@entities/Merchant/IMerchantRepository";
import type {MerchantEntity} from "@entities/Merchant/MerchantEntity";

@injectable()
export class MerchantRepository extends BaseRepository<Merchant, MerchantEntity> implements IMerchantRepository {
    constructor() {
        super(Merchant);
    }
}
