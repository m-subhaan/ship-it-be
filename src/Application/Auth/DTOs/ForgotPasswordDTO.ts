import type { IAdminEntity } from "@entities/Admin/AdminEntity";

type TForgotPasswordDTO = Pick<IAdminEntity, "email">;

interface ForgotPasswordDTO extends TForgotPasswordDTO { }

class ForgotPasswordDTO {
  constructor(body: TForgotPasswordDTO) {
    this.email = body.email;
  }

  static create(body: TForgotPasswordDTO) {
    return new ForgotPasswordDTO(body);
  }
}

export default ForgotPasswordDTO;
