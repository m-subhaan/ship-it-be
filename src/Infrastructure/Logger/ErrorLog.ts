import { ZodError } from "zod";

import Logger from "@logger/Logger";

const ErrorLog = (error: unknown, prefixMessage?: string) => {
  if (prefixMessage) {
    (error as Error).message = `${prefixMessage}: ${(error as Error).message}`;
  }

  if (error instanceof ZodError) {
    Logger.error(error.message);

    return JSON.parse(JSON.stringify(error));
  }

  if (error instanceof Error) {
    Logger.error(error.message);

    return error.message;
  }
};

export default ErrorLog;
