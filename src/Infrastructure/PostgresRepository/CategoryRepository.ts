import { injectable } from "tsyringe";

import BaseRepository from "@repositories/BaseRepository";

import { Category } from "@infrastructure/Database/Models/Category";

import type { CategoryEntity } from "@entities/Category/CategoryEntity";
import type { ICategoryRepository } from "@entities/Category/ICategoryRepository";

@injectable()
export class CategoryRepository extends BaseRepository<Category, CategoryEntity> implements ICategoryRepository {
  constructor() {
    super(Category);
  }
}
