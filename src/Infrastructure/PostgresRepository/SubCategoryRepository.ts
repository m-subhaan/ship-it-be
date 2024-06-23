import { injectable } from "tsyringe";

import type { ISubCategoryRepository } from "@entities/SubCategory/ISubCategoryRepository";
import type { SubCategoryEntity } from "@entities/SubCategory/SubCategoryEntity";

import { SubCategory } from "@infrastructure/Database/Models/SubCategory";

import BaseRepository from "@repositories/BaseRepository";

@injectable()
export class SubCategoryRepository extends BaseRepository<SubCategory, SubCategoryEntity> implements ISubCategoryRepository {
  constructor() {
    super(SubCategory);
  }
}
