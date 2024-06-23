import type { IAdminEntity } from "@entities/Admin/AdminEntity";

type TUpdateAdminDto = Partial<
  Pick<IAdminEntity, "firstName" | "lastName" | "email" | "adminType" | "id" | "adminId">
>;

export interface UpdateAdminDto extends TUpdateAdminDto { }

export class UpdateAdminDto {
  constructor(body: TUpdateAdminDto) {
    this.adminId = body.adminId as string;
    this.firstName = body.firstName as string;
    this.lastName = body.lastName as string;
    this.email = body.email as string;
    this.adminType = body.adminType as string;
    this.id = body.id as number;
  }

  static create(body: TUpdateAdminDto) {
    return new UpdateAdminDto(body);
  }
}
