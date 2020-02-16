"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./libs/logger"));
const updateHandler_1 = __importDefault(require("./handlers/updateHandler"));
updateHandler_1
	.default()
	.then(result => logger_1.default.info(result))
	.catch(error => logger_1.default.error(error));
//# sourceMappingURL=index.js.map
