import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./Base";
import { Variant } from "./Variant";
import { Category } from "./Category";
import { SubCategory } from "./SubCategory";
import { MerchantProduct } from "./MerchantProduct";

@Entity("Products")
export class Product extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  productId!: string;

  @Column({
    nullable: false
  })
  title!: string;

  @Column({
    nullable: true
  })
  description!: string;

  @Column({
    nullable: true
  })
  brand!: string;

  @Column({
    nullable: true
  })
  vendor!: string;

  @Column({
    nullable: false
  })
  status!: string;

  @Column({
    nullable: true
  })
  imageUrl!: string;

  @Column({
    nullable: true
  })
  categoryId!: string;

  @Column({
    nullable: true
  })
  subCategoryId!: string;

  @ManyToOne(() => Category, (category) => category.product, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "categoryId",
    referencedColumnName: "categoryId"
  })
  category!: Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.product, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "subCategoryId",
    referencedColumnName: "subCategoryId"
  })
  subCategory!: SubCategory;

  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: true
  })
  variant!: Variant[];

  @OneToMany(() => MerchantProduct, (merchantProduct) => merchantProduct.product, {
    cascade: true
  })
  merchantProduct!: MerchantProduct[];
}
