import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./Base";
import { SubCategory } from "./SubCategory";
import { Product } from "./Product";

@Entity("Categories")
export class Category extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  categoryId!: string;

  @Column({
    nullable: false
  })
  categoryName!: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    cascade: true
  })
  subCategory!: SubCategory[];

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true
  })
  product!: Product[];
}
