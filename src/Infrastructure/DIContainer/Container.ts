import { container } from "tsyringe";

import { CategoryRepository } from "@repositories/CategoryRepository";
import { MerchantRepository } from "@repositories/MerchantRepository";
import { ProductRepository } from "@repositories/ProductRepository";
import { SubCategoryRepository } from "@repositories/SubCategoryRepository";
import { VariantRepository } from "@repositories/VariantRepository";
import { MerchantProductRepository } from "@repositories/MerchantProductRepository";
import { MerchantVariantRepository } from "@repositories/MerchantVariantRepository";

import { CloudStorageClient } from "@infraServices/ThirdPartyClient/CloudStorage/CloudStorageClient";
import { EmailClient } from "@infraServices/ThirdPartyClient/Email/EmailClient";

import { AdminRepository } from "@infrastructure/PostgresRepository/AdminRepository";

container.register("IAdminRepository", { useClass: AdminRepository });
container.register("ICategoryRepository", { useClass: CategoryRepository });
container.register("ISubCategoryRepository", { useClass: SubCategoryRepository });
container.register("IProductRepository", { useClass: ProductRepository });
container.register("IVariantRepository", { useClass: VariantRepository });
container.register("IMerchantRepository", { useClass: MerchantRepository });
container.register("IMerchantProductRepository", { useClass: MerchantProductRepository });
container.register("IMerchantVariantRepository", { useClass: MerchantVariantRepository });

container.register("IEmailClient", { useClass: EmailClient });
container.register("ICloudStorageClient", { useClass: CloudStorageClient });

export default container;
