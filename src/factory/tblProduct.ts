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
	private productCount: number;

	private customerRange: number;

	constructor(
		private readonly db = Database,
		productCount = 100,
		customerRange = 10
	) {
		this.productCount = productCount;
		this.customerRange = customerRange;
	}

	async insertData(): Promise<void> {
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

	async truncateTable(): Promise<void> {
		const singleData: string[][] = [];
		const client: PoolClient = await this.db.getTransaction();

		const PRODUCT = "TRUNCATE TABLE PRODUCT;";

		try {
			await this.db.sqlExecSingleRow(client, PRODUCT, singleData);
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

		const PRODUCT =
			"CREATE TABLE PRODUCT (ID SERIAL PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, CUSTOMER_ID INT REFERENCES CUSTOMER (ID) ON DELETE RESTRICT NOT NULL);";
		try {
			await this.db.sqlExecSingleRow(client, PRODUCT, singleData);
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
