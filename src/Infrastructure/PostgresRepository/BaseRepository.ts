import { dataSource } from "@infrastructure/Database/postgresConnection";

import type IBaseRepository from "@entities/IBaseRepository";
import type PaginationOptions from "@infraUtils/PaginationOptions";
import type {
  TOrderBy,
  TRelations,
  TSearchFilters,
  TSearchFiltersForRemove,
  TSearchFiltersForUpdate,
  TUpdateEntity,
  TUpsertEntity,
  TUpsertOptions
} from "@typings/ORM";
import type { DeepPartial, EntityTarget, ObjectLiteral, Repository } from "typeorm";

class BaseRepository<Model extends ObjectLiteral, Entity extends DeepPartial<Model>>
  implements IBaseRepository<Model, Entity> {
  protected model: Repository<Model>;

  constructor(name: EntityTarget<Model>) {
    this.model = dataSource.getRepository(name);
  }

  async create(entity: Entity) {
    const result = await this.model.save(entity, { reload: false });

    return result;
  }

  async update(searchFilters: TSearchFiltersForUpdate<Model>, entity: TUpdateEntity<Model>) {
    const result = await this.model.update(searchFilters, entity);

    return result;
  }

  async upsert(entity: TUpdateEntity<Model>, searchFilters: TUpsertOptions<Model>) {
    const updated = await this.model.update(searchFilters, entity);
    if (updated.affected === 0) {
      return await this.create(entity);
    }

    return updated;
  }

  async remove(searchFilters: TSearchFiltersForRemove<Model>) {
    const result = await this.model.softDelete(searchFilters);

    return result;
  }

  async restore(searchFilters: TSearchFiltersForRemove<Model>) {
    return await this.model.restore(searchFilters);
  }

  async bulkInsert(entities: TUpsertEntity<Model>) {
    return this.model.insert(entities);
  }

  async fetch(searchFilters: TSearchFilters<Model>) {
    const row = await this.model.findOne({
      where: searchFilters
    });

    if (!row) {
      return false;
    }

    return row;
  }

  async fetchAll(searchFilters: TSearchFilters<Model>, order: TOrderBy<Model>) {
    const rows = await this.model.find({
      where: searchFilters,
      order: order
    });

    if (rows.length === 0) {
      return false;
    }

    return rows;
  }

  async fetchAllWithRelation(searchFilters: TSearchFilters<Model>, order: TOrderBy<Model>, relations: TRelations<Model>) {
    const rows = await this.model.find({
      where: searchFilters,
      order: order,
      relations: relations
    });

    if (rows.length === 0) {
      return false;
    }

    return rows;
  }

  async count(searchFilters: TSearchFilters<Model>) {
    const count = await this.model.count({
      where: searchFilters
    });

    return count;
  }

  async fetchPaginated(searchFilters: TSearchFilters<Model>, order: TOrderBy<Model>, pagination: PaginationOptions) {
    const rows = await this.model.find({
      where: searchFilters,
      order: order,
      skip: pagination.offset,
      take: pagination.perPage
    });

    if (rows.length === 0) {
      return false;
    }

    return rows;
  }

  async fetchWithDeleted(searchFilters: TSearchFilters<Model>) {
    const row = await this.model.findOne({
      where: searchFilters,
      withDeleted: true
    });

    if (!row) {
      return false;
    }

    return row;
  }

  async fetchAllWithDeleted(searchFilters: TSearchFilters<Model>) {
    const rows = await this.model.find({
      where: searchFilters,
      withDeleted: true
    });

    if (rows.length === 0) {
      return false;
    }

    return rows;
  }
}

export default BaseRepository;
