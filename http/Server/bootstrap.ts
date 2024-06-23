import cors from "cors";
import express from "express";

import { NODE_ENV, SERVER_CONFIG } from "@appUtils/Constants";

const limit = {
  limit: "50mb",
  extended: true
};

const corsOptions =
  SERVER_CONFIG.NODE_ENV === NODE_ENV.PROD ? {} : { origin: [SERVER_CONFIG.APP_URL], credentials: true };

export const bootstrap = express();

bootstrap.use(express.json(limit));

bootstrap.use(express.urlencoded(limit));

bootstrap.use(cors(corsOptions));

bootstrap.set("trust proxy", 1);
