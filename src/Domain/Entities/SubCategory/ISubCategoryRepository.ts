import type IBaseRepository from "@entities/IBaseRepository";
import type { SubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";
import type { SubCategory } from "@infrastructure/Database/Models/SubCategory";

export interface ISubCategoryRepository extends IBaseRepository<SubCategory, SubCategoryEntity> {}
