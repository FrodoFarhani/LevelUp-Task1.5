"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const tblCustomer_1 = __importDefault(require("./tblCustomer"));
const tblSource_1 = __importDefault(require("./tblSource"));
const tblProduct_1 = __importDefault(require("./tblProduct"));
const tblOffer_1 = __importDefault(require("./tblOffer"));
const initializeDb_1 = __importDefault(require("./initializeDb"));
const instantiateDb = async () => {
	const initObject = new initializeDb_1.default({
		insert: [
			new tblCustomer_1.default(),
			new tblSource_1.default(),
			new tblProduct_1.default(),
			new tblOffer_1.default()
		],
		truncate: [
			new tblCustomer_1.default(),
			new tblSource_1.default(),
			new tblProduct_1.default(),
			new tblOffer_1.default()
		],
		create: [
			new tblCustomer_1.default(),
			new tblSource_1.default(),
			new tblProduct_1.default(),
			new tblOffer_1.default()
		]
	});
	await initObject.createTable();
	await initObject.insertData();
};
exports.default = instantiateDb();
//# sourceMappingURL=index.js.map
