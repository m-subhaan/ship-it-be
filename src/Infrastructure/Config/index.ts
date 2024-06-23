import path from "path";

import "dotenv/config";

export { server } from "@infraConfig/server";
export { database } from "@infraConfig/database";
export { sendGrid } from "@infraConfig/sendGrid";
export { aws } from "@infraConfig/aws";

export const storagePath = path.resolve(__dirname, "../../../storage/");
