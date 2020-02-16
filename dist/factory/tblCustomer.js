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
class Customer {
	constructor(db = Database, customerRange = 10) {
		this.db = db;
		this.customerRange = customerRange;
	}
	async insertData() {
		let insertStr = "INSERT INTO CUSTOMER VALUES ";
		const client = await this.db.getTransaction();
		for (let i = 0; i < this.customerRange; i++) {
			insertStr += `(DEFAULT, 'customer_${i + 1}',''),`;
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
		const CUSTOMER = "TRUNCATE TABLE CUSTOMER;";
		try {
			await this.db.sqlExecSingleRow(client, CUSTOMER, singleData);
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
		const CUSTOMER =
			"CREATE TABLE CUSTOMER (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, PR_SOURCES TEXT);";
		try {
			await this.db.sqlExecSingleRow(client, CUSTOMER, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger_1.default.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}
}
exports.default = Customer;
//# sourceMappingURL=tblCustomer.js.map
