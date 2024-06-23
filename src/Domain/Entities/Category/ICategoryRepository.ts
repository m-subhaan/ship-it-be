import type IBaseRepository from "@entities/IBaseRepository";
import type { CategoryEntity } from "@entities/Category/CategoryEntity";
import type { Category } from "@infrastructure/Database/Models/Category";

export interface ICategoryRepository extends IBaseRepository<Category, CategoryEntity> { }
