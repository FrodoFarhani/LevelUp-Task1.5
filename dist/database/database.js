"use strict";
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
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-var */
const pg = __importStar(require("pg"));
const logger_1 = __importDefault(require("../libs/logger"));
const config_1 = __importDefault(require("../config/config"));
const QueryStream = require("pg-query-stream");
const pool = new pg.Pool({
	connectionString: config_1.default.POSTGREURL
});
logger_1.default.info(`DB Connection Settings: ${config_1.default.POSTGREURL}`);
pool.on("error", err => {
	logger_1.default.error(`idle client error, ${err.message} | ${err.stack}`);
});
exports.streamRead = async sql => {
	const client = new pg.Client(config_1.default.POSTGREURL);
	client.connect();
	const result = client.query(new QueryStream(sql));
	logger_1.default.info(
		`DB Connected with URI: ${config_1.default.POSTGREURL}`
	);
	return result;
};
exports.sqlToDB = async (sql, data) => {
	logger_1.default.info(`sqlToDB() sql: ${sql} | data: ${data}`);
	let result;
	try {
		result = await pool.query(sql, data);
		return result;
	} catch (error) {
		logger_1.default.error(error.message);
		throw new Error(error.message);
	}
};
/*
 * Retrieve a SQL client with transaction from connection pool. If the client is valid, either
 * COMMMIT or ROALLBACK needs to be called at the end before releasing the connection back to pool.
 */
exports.getTransaction = async () => {
	logger_1.default.info(`getTransaction()`);
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		return client;
	} catch (error) {
		logger_1.default.error(error.message);
		throw new Error(error.message);
	}
};
/*
 * Execute a sql statment with a single row of data
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
exports.sqlExecSingleRow = async (client, sql, data) => {
	logger_1.default.info(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
	let result;
	try {
		result = await client.query(sql, data);
		logger_1.default.info(
			`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`
		);
		return result.rows;
	} catch (error) {
		logger_1.default.error(
			`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`
		);
		logger_1.default.error(error.message);
		throw new Error(error.message);
	}
};
/*
 * Execute a sql statement with multiple rows of parameter data.
 * @param sql: the query for store data
 * @param data: the data to be stored
 * @return result
 */
exports.sqlExecMultipleRows = async (client, sql) => {
	var insertData = "";
	logger_1.default.info(`inside sqlExecMultipleRows()`);
	if (sql.length !== 0) {
		try {
			logger_1.default.info(`sqlExecMultipleRows() sql: ${sql}`);
			await client.query(sql + insertData);
		} catch (error) {
			logger_1.default.error(`sqlExecMultipleRows() error: ${error}`);
			throw new Error(error.message);
		}
	} else {
		logger_1.default.error(`sqlExecMultipleRows(): No data available`);
		throw new Error("sqlExecMultipleRows(): No data available");
	}
};
/*
 * Rollback transaction
 */
exports.rollback = async client => {
	if (typeof client !== "undefined" && client) {
		try {
			logger_1.default.info(`sql transaction rollback`);
			await client.query("ROLLBACK");
		} catch (error) {
			throw new Error(error.message);
		} finally {
			client.release();
		}
	} else {
		logger_1.default.error(`rollback() not excuted. client is not set`);
	}
};
/*
 * Commit transaction
 */
exports.commit = async client => {
	logger_1.default.info(`sql transaction committed`);
	try {
		await client.query("COMMIT");
	} catch (error) {
		throw new Error(error.message);
	} finally {
		client.release();
	}
};
exports.default = {
	commit: exports.commit,
	rollback: exports.rollback,
	sqlExecMultipleRows: exports.sqlExecMultipleRows,
	sqlExecSingleRow: exports.sqlExecSingleRow
};
//# sourceMappingURL=database.js.map
