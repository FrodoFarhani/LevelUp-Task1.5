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
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: ".env" });
const config = {
	POSTGREURL: process.env.POSTGREURL || ""
};
module.exports = config;
//# sourceMappingURL=config.js.map
