/* eslint-disable no-var */
import * as pg from "pg";
import logger from "../libs/logger";
import config from "../config/config";

const pool = new pg.Pool({
	connectionString: config.POSTGREURL
});

logger.info(`DB Connection Settings: ${config.POSTGREURL}`);

pool.on("error", (err: Error) => {
	logger.error(`idle client error, ${err.message} | ${err.stack}`);
});

export const sqlToDB = async (sql: string, data: string[][]) => {
	logger.info(`sqlToDB() sql: ${sql} | data: ${data}`);
	let result: pg.QueryResult;
	try {
		result = await pool.query(sql, data);
		return result;
	} catch (error) {
		logger.error(error.message);
		throw new Error(error.message);
	}
};

/*
 * Retrieve a SQL client with transaction from connection pool. If the client is valid, either
 * COMMMIT or ROALLBACK needs to be called at the end before releasing the connection back to pool.
 */
export const getTransaction = async () => {
	logger.info(`getTransaction()`);
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		return client;
	} catch (error) {
		logger.error(error.message);
		throw new Error(error.message);
	}
};

/*
 * Execute a sql statment with a single row of data
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
export const sqlExecSingleRow = async (
	client: pg.PoolClient,
	sql: string,
	data: string[][]
) => {
	logger.info(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
	let result: pg.QueryResult;
	try {
		result = await client.query(sql, data);
		logger.info(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
		return result;
	} catch (error) {
		logger.error(
			`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`
		);
		logger.error(error.message);
		throw new Error(error.message);
	}
};

/*
 * Execute a sql statement with multiple rows of parameter data.
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
export const sqlExecMultipleRows = async (
	client: pg.PoolClient,
	sql: string
) => {
	var insertData = "";
	logger.info(`inside sqlExecMultipleRows()`);
	if (sql.length !== 0) {
		try {
			logger.info(`sqlExecMultipleRows() sql: ${sql}`);
			await client.query(sql + insertData);
		} catch (error) {
			logger.error(`sqlExecMultipleRows() error: ${error}`);
			throw new Error(error.message);
		}
	} else {
		logger.error(`sqlExecMultipleRows(): No data available`);
		throw new Error("sqlExecMultipleRows(): No data available");
	}
};

/*
 * Rollback transaction
 */
export const rollback = async (client: pg.PoolClient) => {
	if (typeof client !== "undefined" && client) {
		try {
			logger.info(`sql transaction rollback`);
			await client.query("ROLLBACK");
		} catch (error) {
			throw new Error(error.message);
		} finally {
			client.release();
		}
	} else {
		logger.error(`rollback() not excuted. client is not set`);
	}
};

/*
 * Commit transaction
 */
export const commit = async (client: pg.PoolClient) => {
	logger.info(`sql transaction committed`);
	try {
		await client.query("COMMIT");
	} catch (error) {
		throw new Error(error.message);
	} finally {
		client.release();
	}
};
export default { commit, rollback, sqlExecMultipleRows, sqlExecSingleRow };
