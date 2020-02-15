/* eslint-disable no-plusplus */
import { PoolClient } from "pg";
import logger from "../libs/logger";
import * as Database from "../database/database";
import * as interfaces from "./interfaces";

class Customer
	implements
		interfaces.IcreateTable,
		interfaces.IinsertData,
		interfaces.ItruncateData {
	private customerRange: number;

	constructor(private readonly db = Database, customerRange = 10) {
		this.customerRange = customerRange;
	}

	async insertData(): Promise<void> {
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

	async truncateTable(): Promise<void> {
		const singleData: string[][] = [];
		const client: PoolClient = await this.db.getTransaction();

		const CUSTOMER = "TRUNCATE TABLE CUSTOMER;";

		try {
			await this.db.sqlExecSingleRow(client, CUSTOMER, singleData);
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

		const CUSTOMER =
			"CREATE TABLE CUSTOMER (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, PR_SOURCES TEXT);";

		try {
			await this.db.sqlExecSingleRow(client, CUSTOMER, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}
}
export default Customer;
