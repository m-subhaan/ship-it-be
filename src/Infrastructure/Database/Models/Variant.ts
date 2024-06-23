import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./Base";
import { Product } from "./Product";
import { MerchantVariant } from "./MerchantVariant";

@Entity("Variant")
export class Variant extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  variantId!: string;

  @Column({
    nullable: false
  })
  title!: string;

  @Column({
    nullable: true
  })
  description!: string;

  @Column({
    nullable: false,
    default: 0
  })
  quantity!: number;

  @Column({
    type: "float",
    nullable: false,
    default: 0
  })
  price!: number;

  @Column({
    type: "float",
    nullable: false,
    default: 0
  })
  maxPrice!: number;

  @Column({
    nullable: true
  })
  sku!: string;

  @Column('varchar', {
    array: true,
    nullable: true
  })
  imageUrls!: string[];

  @Column({
    nullable: false,
    default: false
  })
  isPromotion!: boolean;

  @Column({
    type: "float",
    nullable: true
  })
  promotionValue!: number;

  @Column({
    nullable: false,
    default: false
  })
  isPublish!: boolean;


  @Column({
    nullable: true
  })
  optionName1!: string;

  @Column({
    nullable: true
  })
  optionValue1!: string;

  @Column({
    nullable: true
  })
  optionName2!: string;

  @Column({
    nullable: true
  })
  optionValue2!: string;

  @Column({
    nullable: true
  })
  optionName3!: string;

  @Column({
    nullable: true
  })
  optionValue3!: string;

  @Column({
    nullable: true
  })
  productId!: string;

  @ManyToOne(() => Product, (product) => product.variant, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "productId",
    referencedColumnName: "productId"
  })
  product!: Product;

  @OneToMany(() => MerchantVariant, (merchantVariant) => merchantVariant.variant, {
    cascade: true
  })
  merchantVariant!: MerchantVariant[];
}
