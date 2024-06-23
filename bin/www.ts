import "reflect-metadata";
import "dotenv/config";

import fs from "fs";

import { bootstrap } from "@http/Server";

import { SERVER_CONFIG, STORAGE_PATH } from "@appUtils/Constants";

import { dataSource } from "@infrastructure/Database/postgresConnection";

import Logger from "@logger/Logger";

const createStorage = () => {
  const dirs = Object.keys(STORAGE_PATH);
  dirs.map((d) => {
    const dir = STORAGE_PATH[d];
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

(async () => {
  try {
    await dataSource.initialize();
    createStorage();
    bootstrap.listen(SERVER_CONFIG.PORT, () => {
      Logger.info(`${SERVER_CONFIG.APP_NAME} Listening on port ${SERVER_CONFIG.PORT} `);
    });
  } catch (error: unknown) {
    Logger.error(`ServerError: ${(error as Error).message}`);
  }
})();
