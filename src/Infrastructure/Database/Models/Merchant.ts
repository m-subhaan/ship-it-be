import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./Base";
import { MerchantProduct } from "./MerchantProduct";

@Entity("Merchants")
export class Merchant extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  merchantId!: string;

  @Column({
    nullable: false
  })
  name!: string;

  @Column({
    nullable: false,
    unique: true
  })
  email!: string;

  @Column({
    nullable: true
  })
  status!: string;

  @Column({
    nullable: true
  })
  password!: string;

  @Column({
    nullable: true
  })
  resetPasswordToken!: string;

  @Column({
    type: "date",
    nullable: true
  })
  passwordResetOn!: string;

  @Column({
    nullable: true
  })
  mobileNumber!: string;

  @Column({
    nullable: true
  })
  cnic!: string;

  @Column({
    nullable: true
  })
  address!: string;

  @Column({
    nullable: true
  })
  idFrontImage!: string;

  @Column({
    nullable: true
  })
  idBackImage!: string;

  @Column({
    nullable: true
  })
  bankName!: string;

  @Column({
    nullable: true
  })
  bankAccountTitle!: string;

  @Column({
    nullable: true
  })
  bankAccountNumber!: string;

  @OneToMany(() => MerchantProduct, (merchantProduct) => merchantProduct.product, {
    cascade: true
  })
  merchantProduct!: MerchantProduct[];
}
