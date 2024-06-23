import type { IAdminEntity } from "@entities/Admin/AdminEntity";

type TLoginDTO = Pick<IAdminEntity, "email" | "password">;

interface LoginDTO extends TLoginDTO { }

class LoginDTO {
	constructor(body: TLoginDTO) {
		this.email = body.email;
		this.password = body.password;
	}

	static create(body: TLoginDTO) {
		return new LoginDTO(body);
	}
}

export default LoginDTO;
