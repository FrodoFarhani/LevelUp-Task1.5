"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const database_1 = __importDefault(require("../database/database"));
class InitializeDb {
	constructor(db = database_1.default) {
		this.db = db;
		// private customerRange = 10;
		this.productCount = 100;
		this.sourceFree = 5;
		this.sourcePremium = 5;
		this.offerCount = 10000;
		this.initializeDb();
	}
	async initializeDb() {
		// await this.customerData();
		// await this.sourceData();
		// await this.productData();
		await this.offerData();
	}
	// private async customerData(): Promise<void> {
	// 	const tblCustomer =
	// 		"CREATE TABLE CUSTOMER (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, PR_SOURCES TEXT);";
	// 	await this.db.query(tblCustomer);
	// 	for (let i = 0; i < this.customerRange; i++) {
	// 		await this.db.query(
	// 			`INSERT INTO CUSTOMER (ID,NAME,PR_SOURCES) VALUES (DEFAULT,'customer_${i +
	// 				1}', '')`
	// 		);
	// 	}
	// }
	// private async sourceData(): Promise<void> {
	// 	const tblSource =
	// 		"CREATE TABLE SOURCE (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, TYPE INT NOT NULL);";
	// 	await this.db.query(tblSource);
	// 	for (let i = 0; i < this.sourceFree; i++) {
	// 		await this.db.query(
	// 			`INSERT INTO SOURCE (ID,NAME,TYPE) VALUES (DEFAULT,'source_free_${i +
	// 				1}', 0)`
	// 		);
	// 	}
	// 	for (let i = 0; i < this.sourcePremium; i++) {
	// 		await this.db.query(
	// 			`INSERT INTO SOURCE (ID,NAME,TYPE) VALUES (DEFAULT,'source_premium_${i +
	// 				1}', 1)`
	// 		);
	// 	}
	// }
	// private async productData(): Promise<void> {
	// 	// const tblProduct =
	// 	// 	"CREATE TABLE PRODUCT (ID SERIAL PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, CUSTOMER_ID INT REFERENCES CUSTOMER (ID) ON DELETE RESTRICT NOT NULL);";
	// 	// await this.db.query(tblProduct);
	// 	for (let i = 73; i < this.productCount; i++) {
	// 		await this.db.query(
	// 			`INSERT INTO PRODUCT (ID,NAME,CUSTOMER_ID) VALUES (DEFAULT, 'product_${i +
	// 				1}', ${this.randomNumber(this.customerRange)})`
	// 		);
	// 	}
	// }
	async offerData() {
		// const tblOffer =
		// 	"CREATE TABLE OFFER (ID SERIAL PRIMARY KEY NOT NULL, PRODUCT_ID INT REFERENCES PRODUCT (ID) ON DELETE RESTRICT NOT NULL, SOURCE_ID INT REFERENCES SOURCE (ID) ON DELETE RESTRICT NOT NULL, ORDER_NUM INT);";
		// await this.db.query(tblOffer);
		for (let i = 701; i < this.offerCount; i++) {
			await this.db.query(
				`INSERT INTO OFFER (ID, PRODUCT_ID, SOURCE_ID, ORDER_NUM) VALUES (DEFAULT, ${this.randomNumber(
					this.productCount
				)}, ${this.randomNumber(this.sourceFree + this.sourcePremium)},NULL)`
			);
			console.log("index:", i);
			await this.sleep(200);
		}
	}
	async sleep(millis) {
		return new Promise(resolve => setTimeout(resolve, millis));
	}
	randomNumber(max) {
		return Math.floor(Math.random() * (max - 1) + 1);
	}
}
exports.default = new InitializeDb();
//# sourceMappingURL=initializeDb.js.map
