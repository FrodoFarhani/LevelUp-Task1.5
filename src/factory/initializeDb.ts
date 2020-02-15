import * as interfaces from "./interfaces";

class InitializeDb
	implements
		interfaces.IcreateTable,
		interfaces.IinsertData,
		interfaces.ItruncateData {
	constructor(private readonly options: interfaces.IinitOptions) {}

	async createTable(): Promise<void> {
		this.options.create.forEach(dbCommand => {
			dbCommand.createTable();
		});
	}

	async insertData(): Promise<void> {
		this.options.insert.forEach(dbCommand => {
			dbCommand.insertData();
		});
	}

	async truncateTable(): Promise<void> {
		this.options.truncate.forEach(dbCommand => {
			dbCommand.truncateTable();
		});
	}
}
export default InitializeDb;
