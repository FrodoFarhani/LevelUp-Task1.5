"use strict";
// import * as pg from "pg";
// import logger from "./libs/logger";
// import * as Database from "./database/database";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const productControler_1 = __importDefault(
	require("./controllers/productControler")
);
const sourceController_1 = require("./controllers/sourceController");
const fn = async () => {
	const TblProductCount = await productControler_1.default();
	const TblSourceCount = await sourceController_1.sourceCount();
	const TblSourceFreeIds = await sourceController_1.sourceFreeIds();
	console.log("TblProductCount:", TblProductCount);
	console.log("TblSourceCount:", TblSourceCount);
	console.log("TblSourceFreeIds:", TblSourceFreeIds);
};
fn();
// async function queryOffers(productId: number = 1, productCount: number, freeSourceIds: Array<number>, sourceCount: number) {
//     const stream = await Database.streamRead(`SELECT * FROM offer product_id=${productId}`);
//     stream
//         .on("data", (data: { source_id: number }) => {
//             updateOffers(data.source_id, productId, freeSourceIds, sourceCount);
//         })
//         .on("error", (error: Error) => logger.error(error.message))
//         .on("end", () => {
//             if (productId <= productCount) {
//                 queryOffers(productId++, productCount, freeSourceIds, sourceCount);
//             }
//             Promise.resolve("Done!");
//         });
// }
// async function updateOffers(sourceId: number = 1, productId: number = 1, freeSourceIds: Array<number>,sourceCount: number) {
//     const poolClient: pg.PoolClient = await Database.getTransaction();
//     const stream = await Database.streamRead(`SELECT * FROM offer product_id=${productId} and source_id=${sourceId}`);
//     let orderCount: number = 0;
//     stream
//         .on("data",async (data: { source_id: number,id: number }) => {
//             if (freeSourceIds.includes(data.source_id)) {
//                 await Database.sqlExecMultipleRows(poolClient, `UPDATE TABLE offer SET  order_num=${++orderCount} WHERE id=${data.id}`)
//             } else {
//                 await Database.sqlExecMultipleRows(poolClient, `UPDATE TABLE offer SET  order_num=0 WHERE id=${data.id}`)
//             }
//             await Database.commit(poolClient);
//         })
//         .on("error", (error: Error) => logger.error(error.message))
//         .on("end", () => {
//             if (sourceId <= sourceCount) {
//                 updateOffers(sourceId++, productId, freeSourceIds, sourceCount);
//             }
//             Promise.resolve("Done!");
//         });
// }
//# sourceMappingURL=index.js.map
