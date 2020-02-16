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
class Product {
	constructor(db = Database, productCount = 100, customerRange = 10) {
		this.db = db;
		this.productCount = productCount;
		this.customerRange = customerRange;
	}
	async insertData() {
		let insertStr = "INSERT INTO PRODUCT (ID,NAME,CUSTOMER_ID) VALUES ";
		const client = await this.db.getTransaction();
		for (let i = 0; i < this.productCount; i++) {
			insertStr += `(DEFAULT, 'product_${i + 1}', ${this.randomNumber(
				this.customerRange
			)}),`;
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
		const PRODUCT = "TRUNCATE TABLE PRODUCT;";
		try {
			await this.db.sqlExecSingleRow(client, PRODUCT, singleData);
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
		const PRODUCT =
			"CREATE TABLE PRODUCT (ID SERIAL PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, CUSTOMER_ID INT REFERENCES CUSTOMER (ID) ON DELETE RESTRICT NOT NULL);";
		try {
			await this.db.sqlExecSingleRow(client, PRODUCT, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger_1.default.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}
	randomNumber(max) {
		return Math.floor(Math.random() * (max - 1) + 1);
	}
}
exports.default = Product;
//# sourceMappingURL=tblProduct.js.map
