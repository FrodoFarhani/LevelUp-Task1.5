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
	constructor(
		db = Database,
		productCount = 100,
		sourceFree = 5,
		sourcePremium = 5,
		offerCount = 20000
	) {
		this.db = db;
		this.sourceFree = sourceFree;
		this.sourcePremium = sourcePremium;
		this.offerCount = offerCount;
		this.productCount = productCount;
	}
	async insertData() {
		const client = await this.db.getTransaction();
		let insertStr =
			"INSERT INTO OFFER (ID, PRODUCT_ID, SOURCE_ID, ORDER_NUM) VALUES ";
		for (let i = 0; i < this.offerCount; i++) {
			insertStr += `(DEFAULT, ${this.randomNumber(
				this.productCount
			)}, ${this.randomNumber(this.sourceFree + this.sourcePremium)},NULL),`;
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
		const OFFER = "TRUNCATE TABLE OFFER;";
		try {
			await this.db.sqlExecSingleRow(client, OFFER, singleData);
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
		const OFFER =
			"CREATE TABLE OFFER (ID SERIAL PRIMARY KEY NOT NULL, PRODUCT_ID INT REFERENCES PRODUCT (ID) ON DELETE RESTRICT NOT NULL, SOURCE_ID INT REFERENCES SOURCE (ID) ON DELETE RESTRICT NOT NULL, ORDER_NUM INT);";
		try {
			await this.db.sqlExecSingleRow(client, OFFER, singleData);
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
//# sourceMappingURL=tblOffer.js.map
