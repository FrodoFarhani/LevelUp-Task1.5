"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database/database"));
const fn = async () => {
	const res = await database_1.default.query("SELECT * from  test");
	console.log(res.rows[0]);
};
fn();
//# sourceMappingURL=index.js.map
