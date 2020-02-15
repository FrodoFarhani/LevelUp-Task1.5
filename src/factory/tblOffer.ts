/* eslint-disable no-plusplus */
import { PoolClient } from "pg";
import logger from "../libs/logger";
import * as Database from "../database/database";
import * as interfaces from "./interfaces";

class Product
	implements
		interfaces.IcreateTable,
		interfaces.IinsertData,
		interfaces.ItruncateData {
	private offerCount: number;

	private sourceFree: number;

	private sourcePremium: number;

	private productCount: number;

	constructor(
		private readonly db = Database,
		productCount = 100,
		sourceFree = 5,
		sourcePremium = 5,
		offerCount = 20000
	) {
		this.sourceFree = sourceFree;
		this.sourcePremium = sourcePremium;
		this.offerCount = offerCount;
		this.productCount = productCount;
	}

	async insertData(): Promise<void> {
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

	async truncateTable(): Promise<void> {
		const singleData: string[][] = [];
		const client: PoolClient = await this.db.getTransaction();

		const OFFER = "TRUNCATE TABLE OFFER;";

		try {
			await this.db.sqlExecSingleRow(client, OFFER, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}

	async createTable(): Promise<void> {
		const singleData: string[][] = [];
		const client: PoolClient = await this.db.getTransaction();

		const OFFER =
			"CREATE TABLE OFFER (ID SERIAL PRIMARY KEY NOT NULL, PRODUCT_ID INT REFERENCES PRODUCT (ID) ON DELETE RESTRICT NOT NULL, SOURCE_ID INT REFERENCES SOURCE (ID) ON DELETE RESTRICT NOT NULL, ORDER_NUM INT);";

		try {
			await this.db.sqlExecSingleRow(client, OFFER, singleData);
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
export default Product;
