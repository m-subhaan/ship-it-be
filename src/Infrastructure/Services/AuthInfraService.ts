import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {SERVER_CONFIG} from "@appUtils/Constants";

import {ACCESS_ROLES} from "@infraUtils/AccessRoles";

import type {TRequest} from "@typings/Express";

class AuthInfraService {
    encryptPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async verifyUserCredentials(password: string, encodedPassword: string) {
        try {
            return await bcrypt.compare(password, encodedPassword);
        } catch (e) {
            return false;
        }
    }

    authToken(paylaod: object) {
        return jwt.sign(paylaod, SERVER_CONFIG.SECRET);
    }

    verifyToken(token: string) {
        return jwt.verify(token, SERVER_CONFIG.SECRET);
    }

    hasAccessToResource(adminType: string, request: TRequest) {
        try {
            const {
                method,
                baseUrl,
                route: {path}
            } = request;

            const baseRoute = baseUrl.split("/").pop();

            return !!ACCESS_ROLES[adminType][method].find((ap: string) => ap === `${baseRoute}${path}`);
        } catch (error) {
            return false;
        }
    }
}

export default new AuthInfraService();
