import * as pg from "pg";
import logger from "../libs/logger";
import * as Database from "../database/database";

export default class UpdateOffer {
	private TblProductCount: number;

	private TblSourceCount: number;

	private TblSourceFreeIds: Array<number>;

	constructor(
		TblProductCount: number,
		TblSourceCount: number,
		TblSourceFreeIds: Array<number>
	) {
		this.TblProductCount = TblProductCount;
		this.TblSourceCount = TblSourceCount;
		this.TblSourceFreeIds = TblSourceFreeIds;
	}

	async updateTblOffer(): Promise<string> {
		try {
			await this.queryOffers(1);
			return "Updating table SOURCE is Done !";
		} catch (error) {
			logger.error(error.message);
			throw new Error(error.message);
		}
	}

	private async queryOffers(productId = 1) {
		const stream = await Database.streamRead(
			`SELECT * FROM offer product_id=${productId}`
		);
		stream
			.on("data", async (data: { source_id: number }) => {
				await this.updateOffers(data.source_id, productId);
			})
			.on("error", (error: Error) => logger.error(error.message))
			.on("end", () => {
				if (productId <= this.TblProductCount) {
					this.queryOffers(++productId);
				}
				Promise.resolve("Done!");
			});
	}

	private async updateOffers(sourceId = 1, productId = 1) {
		const poolClient: pg.PoolClient = await Database.getTransaction();
		let orderCount = 0;

		const stream = await Database.streamRead(
			`SELECT * FROM offer product_id=${productId} and source_id=${sourceId}`
		);

		stream
			.on("data", async (data: { source_id: number; id: number }) => {
				if (this.TblSourceFreeIds.includes(data.source_id)) {
					await Database.sqlExecMultipleRows(
						poolClient,
						`UPDATE TABLE offer SET  order_num=${++orderCount} WHERE id=${
							data.id
						}`
					);
				} else {
					await Database.sqlExecMultipleRows(
						poolClient,
						`UPDATE TABLE offer SET  order_num=0 WHERE id=${data.id}`
					);
				}
				await Database.commit(poolClient);
			})
			.on("error", (error: Error) => logger.error(error.message))
			.on("end", () => {
				if (sourceId <= this.TblSourceCount) {
					this.updateOffers(++sourceId, productId);
				}
				Promise.resolve("Done!");
			});
	}
}
