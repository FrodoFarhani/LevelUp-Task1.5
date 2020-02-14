/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import Database from "../database/database";

class InitializeDb {
	private customerRange: number;

	private productCount: number;

	private sourceFree: number;

	private sourcePremium: number;

	private offerCount: number;

	constructor(
		private readonly db = Database,
		customerRange = 10,
		productCount = 100,
		sourceFree = 5,
		sourcePremium = 5,
		offerCount = 10000
	) {
		this.customerRange = customerRange;
		this.productCount = productCount;
		this.sourceFree = sourceFree;
		this.sourcePremium = sourcePremium;
		this.offerCount = offerCount;
		this.initializeDb();
	}

	private async initializeDb(): Promise<void> {
		await this.customerData();
		await this.sourceData();
		await this.productData();
		await this.offerData();
	}

	private async customerData(): Promise<void> {
		await this.db.query("DROP TABLE CUSTOMER;");
		const tblCustomer =
			"CREATE TABLE CUSTOMER (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, PR_SOURCES TEXT);";
		await this.db.query(tblCustomer);

		for (let i = 0; i < this.customerRange; i++) {
			await this.db.query(
				`INSERT INTO CUSTOMER (ID,NAME,PR_SOURCES) VALUES (DEFAULT,'customer_${i +
					1}', '')`
			);
			console.log("customer:", i);
			await this.sleep(200);
		}
	}

	private async sourceData(): Promise<void> {
		await this.db.query("DROP TABLE SOURCE;");
		const tblSource =
			"CREATE TABLE SOURCE (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, TYPE INT NOT NULL);";
		await this.db.query(tblSource);

		for (let i = 0; i < this.sourceFree; i++) {
			await this.db.query(
				`INSERT INTO SOURCE (ID,NAME,TYPE) VALUES (DEFAULT,'source_free_${i +
					1}', 0)`
			);
			console.log("source free:", i);
			await this.sleep(200);
		}
		for (let i = 0; i < this.sourcePremium; i++) {
			await this.db.query(
				`INSERT INTO SOURCE (ID,NAME,TYPE) VALUES (DEFAULT,'source_premium_${i +
					1}', 1)`
			);
			console.log("source premium:", i);
			await this.sleep(200);
		}
	}

	private async productData(): Promise<void> {
		await this.db.query("DROP TABLE PRODUCT;");
		const tblProduct =
			"CREATE TABLE PRODUCT (ID SERIAL PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, CUSTOMER_ID INT REFERENCES CUSTOMER (ID) ON DELETE RESTRICT NOT NULL);";
		await this.db.query(tblProduct);

		for (let i = 0; i < this.productCount; i++) {
			await this.db.query(
				`INSERT INTO PRODUCT (ID,NAME,CUSTOMER_ID) VALUES (DEFAULT, 'product_${i +
					1}', ${this.randomNumber(this.customerRange)})`
			);
			console.log("product:", i);
			await this.sleep(200);
		}
	}

	private async offerData(): Promise<void> {
		await this.db.query("DROP TABLE OFFER;");
		const tblOffer =
			"CREATE TABLE OFFER (ID SERIAL PRIMARY KEY NOT NULL, PRODUCT_ID INT REFERENCES PRODUCT (ID) ON DELETE RESTRICT NOT NULL, SOURCE_ID INT REFERENCES SOURCE (ID) ON DELETE RESTRICT NOT NULL, ORDER_NUM INT);";
		await this.db.query(tblOffer);

		for (let i = 0; i < this.offerCount; i++) {
			await this.db.query(
				`INSERT INTO OFFER (ID, PRODUCT_ID, SOURCE_ID, ORDER_NUM) VALUES (DEFAULT, ${this.randomNumber(
					this.productCount
				)}, ${this.randomNumber(this.sourceFree + this.sourcePremium)},NULL)`
			);
			console.log("offer:", i);
			await this.sleep(200);
		}
	}

	private async sleep(millis: number) {
		return new Promise(resolve => setTimeout(resolve, millis));
	}

	private randomNumber(max: number): number {
		return Math.floor(Math.random() * (max - 1) + 1);
	}
}
export default new InitializeDb();
