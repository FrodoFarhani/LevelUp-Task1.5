import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
const config = {
	POSTGREURL: process.env.POSTGREURL || ""
};

export = config;
