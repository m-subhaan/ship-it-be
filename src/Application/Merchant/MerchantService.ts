import { inject, injectable } from "tsyringe";

import { MerchantEntity } from "@entities/Merchant/MerchantEntity";

import { MERCHANT_STATUS } from "@valueObjects/MerchantValueObject";

import HttpResponse from "@appUtils/HttpResponse";
import SharedUtils from "@appUtils/SharedUtils";

import { BaseService } from "@application/BaseService";

import { MerchantFilter } from "@repositories/Shared/ORM/MerchantFilter";

import { emailUtils } from "@infrastructure/DIContainer/Resolver";

import ErrorLog from "@logger/ErrorLog";

import type { AddMerchantDto } from "./Dtos/AddMerchantDto";
import type { UpdateMerchantDto } from "./Dtos/UpdateMerchantDto";
import type { GetMerchantDto } from "./Dtos/GetMerchantDto";
import type { UpdateMerchantStatusDto } from "./Dtos/UpdateMerchantStatusDto";
import type { IMerchantRepository } from "@entities/Merchant/IMerchantRepository";
import type { Merchant } from "@infrastructure/Database/Models/Merchant";
import { APP_URLS } from "@appUtils/Constants";

@injectable()
export class MerchantService extends BaseService<Merchant, MerchantEntity> {
  constructor(@inject("IMerchantRepository") merchantRepository: IMerchantRepository) {
    super(merchantRepository);
  }

  async addMerchant(addMerchantDto: AddMerchantDto) {
    try {
      const searchFilters = MerchantFilter.setFilter({ email: addMerchantDto.email });
      const isMerchant = await this.fetch(searchFilters);
      if (isMerchant) {
        return HttpResponse.conflict();
      }

      const isDeletedMerchant = await this.fetchWithDeleted(searchFilters);
      if (isDeletedMerchant) {
        await this.restore({ merchantId: isDeletedMerchant.merchantId });
      }

      const merchantEntity = MerchantEntity.create(addMerchantDto);
      merchantEntity.merchantId = isDeletedMerchant ? isDeletedMerchant.merchantId : SharedUtils.shortUuid();
      merchantEntity.status = MERCHANT_STATUS.PENDING;
      await this.upsert({ email: merchantEntity.email }, merchantEntity);

      // TODO do something with images

      const addedMerchantEntity = MerchantEntity.publicFields(merchantEntity);

      return HttpResponse.created(addedMerchantEntity);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateMerchant(updateMerchantDto: UpdateMerchantDto) {
    try {
      const isMerchant = await this.fetch({ merchantId: updateMerchantDto.merchantId });
      if (!isMerchant) {
        return HttpResponse.notFound();
      }

      const merchantEntity = MerchantEntity.create({ ...isMerchant, ...updateMerchantDto });
      await this.update({ merchantId: updateMerchantDto.merchantId }, merchantEntity);

      return HttpResponse.ok(MerchantEntity.publicFields(merchantEntity));
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async getMerchants(getMerchantDto: GetMerchantDto) {
    try {
      const searchFilters = MerchantFilter.setFilter(getMerchantDto);
      const isMerchants = await this.fetchAll(searchFilters, { name: "ASC" });
      if (!isMerchants) {
        return HttpResponse.notFound();
      }

      const merchantEntites = isMerchants.map(m => MerchantEntity.publicFields(m));

      return HttpResponse.ok(merchantEntites);
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }

  async updateMerchantStatus(updateMerchantStatusDto: UpdateMerchantStatusDto) {
    try {
      const isMerchant = await this.fetch({ merchantId: updateMerchantStatusDto.merchantId });
      if (!isMerchant) {
        return HttpResponse.notFound();
      }

      const merchantEntity = MerchantEntity.create({ ...isMerchant, ...updateMerchantStatusDto });

      if (merchantEntity.status === MERCHANT_STATUS.ACCEPTED) {
        merchantEntity.resetPasswordToken = SharedUtils.generateUuid();

        await emailUtils.merchantRegistrationEmail({
          merchant: merchantEntity,
          resetPasswordLink: APP_URLS.MERCHANT_RESET_PASSWORD_URL
        });
      }

      await this.update({ merchantId: updateMerchantStatusDto.merchantId }, merchantEntity);

      return HttpResponse.ok(MerchantEntity.publicFields(merchantEntity));
    } catch (error) {
      return HttpResponse.error({ message: ErrorLog(error) });
    }
  }
}
