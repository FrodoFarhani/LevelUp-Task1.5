import * as pg from "pg";
import logger from "../libs/logger";
import * as Database from "../database/database";

const productCount = async () => {
	try {
		const poolClient: pg.PoolClient = await Database.getTransaction();
		const ProductObj = await Database.sqlExecSingleRow(
			poolClient,
			"SELECT COUNT(id) FROM product",
			[]
		);
		return ProductObj[0].count;
	} catch (error) {
		logger.error(error.message);
		throw new Error(error.message);
	}
};
export default productCount;
