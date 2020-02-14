import { Ikeys } from "./keys";

class DevKeys implements Ikeys {
	keys(): Record<string, string> {
		return {
			postGreURI: "postgresql://mof:123@localhost:5432/StreamData"
		};
	}
}
export default new DevKeys();
