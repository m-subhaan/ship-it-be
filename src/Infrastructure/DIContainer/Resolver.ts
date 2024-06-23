import { container } from "tsyringe";

import { CloudStorageUtils } from "@appUtils/CloudStorage/CloudStorageUtils";
import { EmailUtils } from "@appUtils/Email/EmailUtils";

import { AdminRepository } from "@infrastructure/PostgresRepository/AdminRepository";
import { CategoryRepository } from "@repositories/CategoryRepository";
import { ProductRepository } from "@repositories/ProductRepository";
import { SubCategoryRepository } from "@repositories/SubCategoryRepository";
import { VariantRepository } from "@repositories/VariantRepository";
import { MerchantRepository } from "@repositories/MerchantRepository";
import { MerchantProductRepository } from "@repositories/MerchantProductRepository";
import { MerchantVariantRepository } from "@repositories/MerchantVariantRepository";

import { AdminService } from "@application/Admin/AdminService";
import { AuthService } from "@application/Auth/AuthService";
import { CategoryService } from "@application/Category/CategoryService";
import { SubCategoryService } from "@application/SubCategory/SubCategoryService";
import { ProductService } from "@application/Product/ProductService";
import { VariantService } from "@application/Variant/VariantService";
import { MerchantService } from "@application/Merchant/MerchantService";
import { MerchantProductService } from "@application/MerchantProduct/MerchantProductService";

import Container from "./Container";

export const adminService = Container.resolve(AdminService);
export const authService = Container.resolve(AuthService);
export const categoryService = Container.resolve(CategoryService);
export const subCategoryService = Container.resolve(SubCategoryService);
export const productService = Container.resolve(ProductService);
export const variantService = Container.resolve(VariantService);
export const merchantService = Container.resolve(MerchantService);
export const merchantProductService = Container.resolve(MerchantProductService);

export const adminRepository = container.resolve(AdminRepository);
export const categoryRepository = container.resolve(CategoryRepository);
export const subCategoryRepository = container.resolve(SubCategoryRepository);
export const productRepository = container.resolve(ProductRepository);
export const variantRepository = container.resolve(VariantRepository);
export const merchantRepository = container.resolve(MerchantRepository);
export const merchantProductRepository = container.resolve(MerchantProductRepository);
export const merchantVariantRepository = container.resolve(MerchantVariantRepository);

export const emailUtils = Container.resolve(EmailUtils);
export const cloudStorageUtils = Container.resolve(CloudStorageUtils);
