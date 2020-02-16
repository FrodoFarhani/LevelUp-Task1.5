"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../libs/logger"));
const Database = __importStar(require("../database/database"));
class UpdateOffer {
	constructor(TblProductCount, TblSourceCount, TblSourceFreeIds) {
		this.TblProductCount = TblProductCount;
		this.TblSourceCount = TblSourceCount;
		this.TblSourceFreeIds = TblSourceFreeIds;
	}
	async updateTblOffer() {
		try {
			await this.queryOffers(1);
			return "Updating table SOURCE is Done !";
		} catch (error) {
			logger_1.default.error(error.message);
			throw new Error(error.message);
		}
	}
	async queryOffers(productId = 1) {
		const stream = await Database.streamRead(
			`SELECT * FROM offer WHERE product_id=${productId}`
		);
		stream
			.on("data", async data => {
				stream.pause();
				await this.updateOffers(data.source_id, productId);
				await this.sleep();
				stream.resume();
			})
			.on("error", error => logger_1.default.error(error.message))
			.on("end", () => {
				if (productId <= this.TblProductCount) {
					this.queryOffers(++productId);
				}
				Promise.resolve("Done!");
			});
	}
	async updateOffers(sourceId = 1, productId = 1) {
		const poolClient = await Database.getTransaction();
		let orderCount = 0;
		const stream = await Database.streamRead(
			`SELECT * FROM offer WHERE product_id=${productId} and source_id=${sourceId}`
		);
		stream
			.on("data", async data => {
				stream.pause();
				if (this.TblSourceFreeIds.includes(data.source_id)) {
					await Database.sqlExecMultipleRows(
						poolClient,
						`UPDATE  offer SET  order_num=${++orderCount} WHERE id=${data.id}`
					);
				} else {
					await Database.sqlExecMultipleRows(
						poolClient,
						`UPDATE  offer SET  order_num=0 WHERE id=${data.id}`
					);
				}
				await this.sleep();
				stream.resume();
			})
			.on("error", error => logger_1.default.error(error.message))
			.on("end", async () => {
				if (sourceId <= this.TblSourceCount) {
					this.updateOffers(++sourceId, productId);
				}
				await Database.commit(poolClient);
				Promise.resolve("Done!");
			});
	}
	async sleep() {
		console.log(
			"SLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEP"
		);
		return new Promise(function(resolve) {
			setTimeout(function() {
				resolve();
			}, 3000);
		});
	}
}
exports.default = UpdateOffer;
//# sourceMappingURL=updateOffer.js.map
