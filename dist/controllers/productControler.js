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
const productCount = async () => {
	try {
		const poolClient = await Database.getTransaction();
		const ProductObj = await Database.sqlExecSingleRow(
			poolClient,
			"SELECT COUNT(id) FROM product",
			[]
		);
		return ProductObj[0].count;
	} catch (error) {
		logger_1.default.error(error.message);
		throw new Error(error.message);
	}
};
exports.default = productCount;
//# sourceMappingURL=productControler.js.map
