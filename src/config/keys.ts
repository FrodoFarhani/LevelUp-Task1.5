export interface Ikeys {
	keys(): Record<string, string>;
}

export class ProperKeys implements Ikeys {
	constructor(private readonly key: Ikeys) {}

	keys(): Record<string, string> {
		return this.key.keys();
	}
}
