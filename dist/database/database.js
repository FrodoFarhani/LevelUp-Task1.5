"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const prod_1 = __importDefault(require("../config/prod"));
const dev_1 = __importDefault(require("../config/dev"));
const keys_1 = require("../config/keys");
const logger_1 = __importDefault(require("../libs/logger"));
const { Pool } = require("pg");
class Database {
	constructor(
		processType = process.env.NODE_ENV,
		devKeys = dev_1.default,
		prodKeys = prod_1.default
	) {
		this.processType = processType;
		this.devKeys = devKeys;
		this.prodKeys = prodKeys;
		if (this.processType === "production") {
			this.keysObject = new keys_1.ProperKeys(this.prodKeys).keys();
		} else {
			this.keysObject = new keys_1.ProperKeys(this.devKeys).keys();
		}
	}
	async client() {
		const pool = new Pool({
			connectionString: this.keysObject.postGreURI
		});
		pool.on("error", err => {
			logger_1.default.error("Unexpected error on idle client", err);
			process.exit(-1);
		});
		const client = await pool.connect();
		return client;
	}
	async query(query) {
		let result;
		const client = await this.client();
		try {
			result = await client.query(query);
		} catch (error) {
			logger_1.default.error(error);
			client.release();
		} finally {
			await client.release();
		}
		return result;
	}
}
exports.default = new Database();
//# sourceMappingURL=database.js.map
