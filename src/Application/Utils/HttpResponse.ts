import { RESPONSE_MESSAGES } from "@appUtils/Constants";
import { HttpStatus, HttpStatusCode } from "@appUtils/Http";

import type { TResponse } from "@typings/Express";

type TStatus = { status?: string; message: string };

class HttpResponse<Entity> {
  readonly statusCode: number;
  readonly body: Entity;

  constructor(statusCode: number, body: Entity) {
    this.statusCode = statusCode;
    this.body = body;
  }

  static create<Entity>(responseCode: number, body: Entity) {
    return new HttpResponse(responseCode, body);
  }

  static ok<Entity extends object>(body: Entity) {
    if ("message" in body) {
      return new HttpResponse(HttpStatusCode.OK, { status: HttpStatus.SUCCESS, ...body });
    }

    return new HttpResponse(HttpStatusCode.OK, body);
  }

  static created<Entity>(body: Entity) {
    return new HttpResponse(HttpStatusCode.CREATED, body);
  }

  static accepted<Entity>(body: Entity) {
    return new HttpResponse(HttpStatusCode.ACCEPTED, body);
  }

  static noContent() {
    return new HttpResponse(HttpStatusCode.NO_CONTENT, HttpStatus.EMPTY);
  }

  static error(body: TStatus = { message: RESPONSE_MESSAGES.ERROR }) {
    return new HttpResponse(HttpStatusCode.ERROR, { status: HttpStatus.ERROR, ...body });
  }

  static notAuthorized(body: TStatus = { message: RESPONSE_MESSAGES.NOT_AUTHORIZED }) {
    return new HttpResponse(HttpStatusCode.NOT_AUTHORIZED, { status: HttpStatus.ERROR, ...body });
  }

  static forbidden(body: TStatus = { message: RESPONSE_MESSAGES.FORBIDDEN }) {
    return new HttpResponse(HttpStatusCode.FORBIDDEN, { status: HttpStatus.ERROR, ...body });
  }

  static notFound(body: TStatus = { message: RESPONSE_MESSAGES.NOT_FOUND }) {
    return new HttpResponse(HttpStatusCode.NOT_FOUND, { status: HttpStatus.ERROR, ...body });
  }

  static passwordExpired(body: TStatus = { message: RESPONSE_MESSAGES.PASSWORD_EXPIRED }) {
    return new HttpResponse(HttpStatusCode.PASSWORD_EXPIRED, { status: HttpStatus.ERROR, ...body });
  }

  static conflict(body: TStatus = { message: RESPONSE_MESSAGES.CONFLICT }) {
    return new HttpResponse(HttpStatusCode.CONFLICT, { status: HttpStatus.ERROR, ...body });
  }

  static redirect(response: TResponse, url: string) {
    return response.redirect(url);
  }

  static convertToExpress(response: TResponse, httpResponse): TResponse {
    return response.status(httpResponse.statusCode).json(httpResponse.body);
  }
}

export default HttpResponse;
