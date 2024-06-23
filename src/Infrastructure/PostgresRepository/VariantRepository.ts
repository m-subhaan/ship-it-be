import { injectable } from "tsyringe";

import type { IVariantRepository } from "@entities/Variant/IVariantRepository";
import type { VariantEntity } from "@entities/Variant/VariantEntity";

import { Variant } from "@infrastructure/Database/Models/Variant";

import BaseRepository from "@repositories/BaseRepository";

@injectable()
export class VariantRepository extends BaseRepository<Variant, VariantEntity> implements IVariantRepository {
  constructor() {
    super(Variant);
  }
}
