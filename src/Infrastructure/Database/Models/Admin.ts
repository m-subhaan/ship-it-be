import { Column, Entity } from "typeorm";

import { Base } from "./Base";

@Entity("Admins")
export class Admin extends Base {
  @Column({
    nullable: false,
    unique: true
  })
  adminId!: string;

  @Column({
    nullable: false
  })
  firstName!: string;

  @Column({
    nullable: false
  })
  lastName!: string;

  @Column({
    nullable: false,
    unique: true
  })
  email!: string;

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
    nullable: false
  })
  adminType!: string;
}
