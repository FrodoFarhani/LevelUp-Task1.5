"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InitializeDb {
	constructor(options) {
		this.options = options;
	}
	async createTable() {
		this.options.create.forEach(dbCommand => {
			dbCommand.createTable();
		});
	}
	async insertData() {
		this.options.insert.forEach(dbCommand => {
			dbCommand.insertData();
		});
	}
	async truncateTable() {
		this.options.truncate.forEach(dbCommand => {
			dbCommand.truncateTable();
		});
	}
}
exports.default = InitializeDb;
//# sourceMappingURL=initializeDb.js.map
