import type IBaseRepository from "@entities/IBaseRepository";
import type { VariantEntity } from "@entities/Variant/VariantEntity";
import type { Variant } from "@infrastructure/Database/Models/Variant";

export interface IVariantRepository extends IBaseRepository<Variant, VariantEntity> { }
