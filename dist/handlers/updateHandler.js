"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const productControler_1 = __importDefault(
	require("../controllers/productControler")
);
const sourceController_1 = require("../controllers/sourceController");
const updateOffer_1 = __importDefault(require("../services/updateOffer"));
const updateHandler = async () => {
	try {
		const TblProductCount = await productControler_1.default();
		const TblSourceCount = await sourceController_1.sourceCount();
		const TblSourceFreeIds = await sourceController_1.sourceFreeIds();
		const tableOfferObject = new updateOffer_1.default(
			TblProductCount,
			TblSourceCount,
			TblSourceFreeIds
		);
		const result = await tableOfferObject.updateTblOffer();
		return result;
	} catch (error) {
		throw new Error(error.message);
	}
};
exports.default = updateHandler;
//# sourceMappingURL=updateHandler.js.map
