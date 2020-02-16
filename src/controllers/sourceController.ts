import * as pg from "pg";
import logger from "../libs/logger";
import * as Database from "../database/database";

const sourceSelect = async () => {
	try {
		const poolClient: pg.PoolClient = await Database.getTransaction();
		const sourceObj = await Database.sqlExecSingleRow(
			poolClient,
			"SELECT * FROM source",
			[]
		);
		return sourceObj;
	} catch (error) {
		logger.error(error.message);
		throw new Error(error.message);
	}
};

export const sourceFreeIds = async () => {
	const sourceObj = await sourceSelect();
	const freeSourceIds: Array<number> = sourceObj.map(item => {
		if (item.type == 0) return item.id;
		return 0;
	});
	return freeSourceIds;
};

export const sourceCount = async () => {
	const sourceObj = await sourceSelect();
	return sourceObj.length;
};
