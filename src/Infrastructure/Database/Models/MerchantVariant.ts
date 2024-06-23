import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Base } from "./Base";
import { Variant } from "./Variant";
import { MerchantProduct } from "./MerchantProduct";

@Entity("MerchantVariants")
export class MerchantVariant extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  merchantVariantId!: string;

  @Column({
    nullable: false
  })
  title!: string;

  @Column({
    nullable: true
  })
  description!: string;

  @Column({
    type: "float",
    nullable: false,
    default: 0
  })
  price!: number;

  @Column({
    nullable: true
  })
  merchantProductId!: string;

  @Column({
    nullable: true
  })
  variantId!: string;

  @ManyToOne(() => MerchantProduct, (merchantProduct) => merchantProduct.merchantVariant, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "merchantProductId",
    referencedColumnName: "merchantProductId"
  })
  merchantProduct!: MerchantProduct;

  @ManyToOne(() => Variant, (variant) => variant.merchantVariant, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  })
  @JoinColumn({
    name: "variantId",
    referencedColumnName: "variantId"
  })
  variant!: Variant;
}
