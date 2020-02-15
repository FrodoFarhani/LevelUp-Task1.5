export interface IinsertData {
	insertData(): Promise<void>;
}
export interface ItruncateData {
	truncateTable(): Promise<void>;
}
export interface IcreateTable {
	createTable(): Promise<void>;
}
export interface IinitOptions {
	insert: IinsertData[];
	truncate: ItruncateData[];
	create: IcreateTable[];
}
