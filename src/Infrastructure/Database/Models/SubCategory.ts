import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./Base";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity("SubCategories")
export class SubCategory extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  subCategoryId!: string;

  @Column({
    nullable: false
  })
  subCategoryName!: string;

  @Column({
    nullable: true
  })
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.subCategory, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "categoryId",
    referencedColumnName: "categoryId"
  })
  category!: Category;

  @OneToMany(() => Product, (product) => product.subCategory, {
    cascade: true
  })
  product!: Product[];
}
