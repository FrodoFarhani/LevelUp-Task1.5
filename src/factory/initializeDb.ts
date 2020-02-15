/* eslint-disable no-plusplus */
import { PoolClient } from "pg";
import logger from "../libs/logger";
import * as Database from "../database/database";

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
		offerCount = 20000
	) {
		this.customerRange = customerRange;
		this.productCount = productCount;
		this.sourceFree = sourceFree;
		this.sourcePremium = sourcePremium;
		this.offerCount = offerCount;
		this.createTables();
		this.insertData();
	}

	private async insertData(): Promise<void> {
		await this.InsertCustomerData();
		await this.InsertSourceData();
		await this.InsertProductData();
		await this.InsertOfferData();
	}

	async truncateData(): Promise<void> {
		const singleData: string[][] = [];
		const client: PoolClient = await this.db.getTransaction();

		const CUSTOMER = "TRUNCATE TABLE CUSTOMER;";
		const SOURCE = "TRUNCATE TABLE SOURCE;";
		const PRODUCT = "TRUNCATE TABLE PRODUCT;";
		const OFFER = "TRUNCATE TABLE OFFER;";

		try {
			await this.db.sqlExecSingleRow(client, CUSTOMER, singleData);
			await this.db.sqlExecSingleRow(client, SOURCE, singleData);
			await this.db.sqlExecSingleRow(client, PRODUCT, singleData);
			await this.db.sqlExecSingleRow(client, OFFER, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}

	async createTables(): Promise<void> {
		const singleData: string[][] = [];
		const client: PoolClient = await this.db.getTransaction();

		const CUSTOMER =
			"CREATE TABLE CUSTOMER (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, PR_SOURCES TEXT);";
		const SOURCE =
			"CREATE TABLE SOURCE (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, TYPE INT NOT NULL);";
		const PRODUCT =
			"CREATE TABLE PRODUCT (ID SERIAL PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, CUSTOMER_ID INT REFERENCES CUSTOMER (ID) ON DELETE RESTRICT NOT NULL);";
		const OFFER =
			"CREATE TABLE OFFER (ID SERIAL PRIMARY KEY NOT NULL, PRODUCT_ID INT REFERENCES PRODUCT (ID) ON DELETE RESTRICT NOT NULL, SOURCE_ID INT REFERENCES SOURCE (ID) ON DELETE RESTRICT NOT NULL, ORDER_NUM INT);";

		try {
			await this.db.sqlExecSingleRow(client, CUSTOMER, singleData);
			await this.db.sqlExecSingleRow(client, SOURCE, singleData);
			await this.db.sqlExecSingleRow(client, PRODUCT, singleData);
			await this.db.sqlExecSingleRow(client, OFFER, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}

	private async InsertCustomerData(): Promise<void> {
		let insertStr = "INSERT INTO CUSTOMER VALUES ";
		const client: PoolClient = await this.db.getTransaction();

		for (let i = 0; i < this.customerRange; i++) {
			insertStr += `(DEFAULT, 'customer_${i + 1}',''),`;
		}
		try {
			await this.db.sqlExecMultipleRows(client, insertStr.slice(0, -1));
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}

	private async InsertSourceData(): Promise<void> {
		let insertStr = "INSERT INTO SOURCE (ID,NAME,TYPE) VALUES ";

		const client: PoolClient = await this.db.getTransaction();

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
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}

	private async InsertProductData(): Promise<void> {
		let insertStr = "INSERT INTO PRODUCT (ID,NAME,CUSTOMER_ID) VALUES ";

		const client: PoolClient = await this.db.getTransaction();

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
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}

	private async InsertOfferData(): Promise<void> {
		const client: PoolClient = await this.db.getTransaction();
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
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}

	private randomNumber(max: number): number {
		return Math.floor(Math.random() * (max - 1) + 1);
	}
}
export default new InitializeDb();
