import ProdKeys from "../config/prod";
import DevKeys from "../config/dev";
import { ProperKeys } from "../config/keys";
import logger from "../libs/logger";

const { Pool } = require("pg");

class Database {
	private keysObject: Record<string, string>;

	constructor(
		private readonly processType = process.env.NODE_ENV,
		private readonly devKeys = DevKeys,
		private readonly prodKeys = ProdKeys
	) {
		if (this.processType === "production") {
			this.keysObject = new ProperKeys(this.prodKeys).keys();
		} else {
			this.keysObject = new ProperKeys(this.devKeys).keys();
		}
	}

	private async client() {
		const pool = new Pool({
			connectionString: this.keysObject.postGreURI
		});
		pool.on("error", (err: object) => {
			logger.error("Unexpected error on idle client", err);
			process.exit(-1);
		});

		const client = await pool.connect();
		return client;
	}

	async query(query: string) {
		let result;
		const client = await this.client();
		try {
			result = await client.query(query);
		} catch (error) {
			logger.error(error);
		} finally {
			client.release();
		}
		return result;
	}
}

export default new Database();
