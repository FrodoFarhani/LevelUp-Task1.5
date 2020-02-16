"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var __importStar =
	(this && this.__importStar) ||
	function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
		result["default"] = mod;
		return result;
	};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../libs/logger"));
const Database = __importStar(require("../database/database"));
class Source {
	constructor(db = Database, sourceFree = 5, sourcePremium = 5) {
		this.db = db;
		this.sourceFree = sourceFree;
		this.sourcePremium = sourcePremium;
	}
	async insertData() {
		let insertStr = "INSERT INTO SOURCE (ID,NAME,TYPE) VALUES ";
		const client = await this.db.getTransaction();
		for (let i = 0; i < this.sourceFree; i++) {
			insertStr += `(DEFAULT,'source_free_${i + 1}', 0),`;
		}
		for (let i = 0; i < this.sourcePremium; i++) {
			insertStr += `(DEFAULT,'source_premium_${i + 1}', 1),`;
		}
		try {
			await this.db.sqlExecMultipleRows(client, insertStr.slice(0, -1));
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger_1.default.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}
	async truncateTable() {
		const singleData = [];
		const client = await this.db.getTransaction();
		const SOURCE = "TRUNCATE TABLE SOURCE;";
		try {
			await this.db.sqlExecSingleRow(client, SOURCE, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger_1.default.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}
	async createTable() {
		const singleData = [];
		const client = await this.db.getTransaction();
		const SOURCE =
			"CREATE TABLE SOURCE (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, TYPE INT NOT NULL);";
		try {
			await this.db.sqlExecSingleRow(client, SOURCE, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger_1.default.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}
}
exports.default = Source;
//# sourceMappingURL=tblSource.js.map
