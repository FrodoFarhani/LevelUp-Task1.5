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
class InitializeDb {
	constructor(
		db = Database,
		// customerRange = 10,
		productCount = 100,
		sourceFree = 5,
		sourcePremium = 5,
		offerCount = 20000
	) {
		this.db = db;
		// this.customerRange = customerRange;
		this.productCount = productCount;
		this.sourceFree = sourceFree;
		this.sourcePremium = sourcePremium;
		this.offerCount = offerCount;
		this.initializeDb();
	}
	async initializeDb() {
		// await this.customerData();
		// await this.sourceData();
		// await this.productData();
		await this.offerData();
	}
	// private async customerData(): Promise<void> {
	// 	 const dropTable = "DROP TABLE CUSTOMER;";
	// 	let insertStr = "INSERT INTO CUSTOMER VALUES ";
	// 	const createTable =
	// 		"CREATE TABLE CUSTOMER (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, PR_SOURCES TEXT);";
	// 	const singleData: string[][] = [];
	// 	const client: PoolClient = await this.db.getTransaction();
	// 	for (let i = 0; i < this.customerRange; i++) {
	// 		insertStr += `(DEFAULT, 'customer_${i + 1}',''),`;
	// 	}
	// 	try {
	// 		await this.db.sqlExecSingleRow(client, dropTable, singleData);
	// 		await this.db.sqlExecSingleRow(client, createTable, singleData);
	// 		await this.db.sqlExecMultipleRows(client, insertStr.slice(0, -1));
	// 		await this.db.commit(client);
	// 	} catch (error) {
	// 		await this.db.rollback(client);
	// 		logger.error(`sampleTransactionModel error: ${error.message}`);
	// 		throw new Error(error.message);
	// 	}
	// }
	// private async sourceData(): Promise<void> {
	// 	await this.db.query("DROP TABLE SOURCE;");
	// 	const tblSource =
	// 		"CREATE TABLE SOURCE (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, TYPE INT NOT NULL);";
	// 	await this.db.query(tblSource);
	// 	for (let i = 0; i < this.sourceFree; i++) {
	// 		await this.db.query(
	// 			`INSERT INTO SOURCE (ID,NAME,TYPE) VALUES (DEFAULT,'source_free_${i +
	// 				1}', 0)`
	// 		);
	// 		console.log("source free:", i);
	// 		await this.sleep(200);
	// 	}
	// 	for (let i = 0; i < this.sourcePremium; i++) {
	// 		await this.db.query(
	// 			`INSERT INTO SOURCE (ID,NAME,TYPE) VALUES (DEFAULT,'source_premium_${i +
	// 				1}', 1)`
	// 		);
	// 		console.log("source premium:", i);
	// 		await this.sleep(200);
	// 	}
	// }
	// private async productData(): Promise<void> {
	// 	await this.db.query("DROP TABLE PRODUCT;");
	// 	const tblProduct =
	// 		"CREATE TABLE PRODUCT (ID SERIAL PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, CUSTOMER_ID INT REFERENCES CUSTOMER (ID) ON DELETE RESTRICT NOT NULL);";
	// 	await this.db.query(tblProduct);
	// 	for (let i = 0; i < this.productCount; i++) {
	// 		await this.db.query(
	// 			`INSERT INTO PRODUCT (ID,NAME,CUSTOMER_ID) VALUES (DEFAULT, 'product_${i +
	// 				1}', ${this.randomNumber(this.customerRange)})`
	// 		);
	// 		console.log("product:", i);
	// 		await this.sleep(200);
	// 	}
	// }
	async offerData() {
		// await this.db.query("DROP TABLE OFFER;");
		// const tblOffer =
		// 	"CREATE TABLE OFFER (ID SERIAL PRIMARY KEY NOT NULL, PRODUCT_ID INT REFERENCES PRODUCT (ID) ON DELETE RESTRICT NOT NULL, SOURCE_ID INT REFERENCES SOURCE (ID) ON DELETE RESTRICT NOT NULL, ORDER_NUM INT);";
		// await this.db.query(tblOffer);
		const client = await this.db.getTransaction();
		let insertStr =
			"INSERT INTO OFFER (ID, PRODUCT_ID, SOURCE_ID, ORDER_NUM) VALUES ";
		for (let i = 10000; i < this.offerCount; i++) {
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
	// private async sleep(millis: number) {
	// 	return new Promise(resolve => setTimeout(resolve, millis));
	// }
	randomNumber(max) {
		return Math.floor(Math.random() * (max - 1) + 1);
	}
}
exports.default = new InitializeDb();
//# sourceMappingURL=initializeDb.js.map
