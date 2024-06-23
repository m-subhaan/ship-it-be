export interface IAdminEntity {
  id?: number;
  adminId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  passwordResetOn: string;
  adminType: string;
}

export interface AdminEntity extends IAdminEntity { }

export class AdminEntity {
  constructor(adminEntity: IAdminEntity) {
    this.adminId = adminEntity.adminId;
    this.firstName = adminEntity.firstName ? adminEntity.firstName.trim() : adminEntity.firstName;
    this.lastName = adminEntity.lastName ? adminEntity.lastName.trim() : adminEntity.lastName;
    this.email = adminEntity.email;
    this.password = adminEntity.password;
    this.resetPasswordToken = adminEntity.resetPasswordToken;
    this.passwordResetOn = adminEntity.passwordResetOn;
    this.adminType = adminEntity.adminType.toUpperCase();
  }

  static create(adminEntity) {
    return new AdminEntity(adminEntity);
  }

  static publicFields(admin): Partial<AdminEntity> {
    const entity: Partial<AdminEntity> = new AdminEntity(admin);
    delete entity.password;
    delete entity.passwordResetOn;
    delete entity.resetPasswordToken;

    entity.id = admin.idAdmin ?? admin.id;

    return entity;
  }
}
