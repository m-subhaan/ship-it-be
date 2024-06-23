import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./Base";
import { Product } from "./Product";
import { Merchant } from "./Merchant";
import { MerchantVariant } from "./MerchantVariant";

@Entity("MerchantProducts")
export class MerchantProduct extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  merchantProductId!: string;

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
  productId!: string;

  @Column({
    nullable: true
  })
  merchantId!: string;

  @ManyToOne(() => Product, (product) => product.merchantProduct, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "productId",
    referencedColumnName: "productId"
  })
  product!: Product;

  @ManyToOne(() => Merchant, (merchant) => merchant.merchantProduct, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "merchantId",
    referencedColumnName: "merchantId"
  })
  merchant!: Merchant;

  @OneToMany(() => MerchantVariant, (merchantVariant) => merchantVariant.merchantProduct, {
    cascade: true
  })
  merchantVariant!: MerchantVariant[];
}
