/* eslint-disable no-plusplus */
import { PoolClient } from "pg";
import logger from "../libs/logger";
import * as Database from "../database/database";
import * as interfaces from "./interfaces";

class Source
	implements
		interfaces.IcreateTable,
		interfaces.IinsertData,
		interfaces.ItruncateData {
	private sourceFree: number;

	private sourcePremium: number;

	constructor(
		private readonly db = Database,
		sourceFree = 5,
		sourcePremium = 5
	) {
		this.sourceFree = sourceFree;
		this.sourcePremium = sourcePremium;
	}

	async insertData(): Promise<void> {
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

	async truncateTable(): Promise<void> {
		const singleData: string[][] = [];
		const client: PoolClient = await this.db.getTransaction();

		const SOURCE = "TRUNCATE TABLE SOURCE;";

		try {
			await this.db.sqlExecSingleRow(client, SOURCE, singleData);
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

		const SOURCE =
			"CREATE TABLE SOURCE (ID SERIAL PRIMARY KEY  NOT NULL, NAME TEXT NOT NULL, TYPE INT NOT NULL);";
		try {
			await this.db.sqlExecSingleRow(client, SOURCE, singleData);
			await this.db.commit(client);
		} catch (error) {
			await this.db.rollback(client);
			logger.error(`sampleTransactionModel error: ${error.message}`);
			throw new Error(error.message);
		}
	}
}
export default Source;
