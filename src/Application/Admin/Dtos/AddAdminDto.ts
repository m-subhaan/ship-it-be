import type { IAdminEntity } from "@entities/Admin/AdminEntity";

type TAddAdminDto = Pick<IAdminEntity, "firstName" | "lastName" | "email" | "adminType">;

export interface AddAdminDto extends TAddAdminDto { }

export class AddAdminDto {
  constructor(body: TAddAdminDto) {
    this.firstName = body.firstName;
    this.lastName = body.lastName;
    this.email = body.email;
    this.adminType = body.adminType;
  }

  static create(body: TAddAdminDto) {
    return new AddAdminDto(body);
  }
}
