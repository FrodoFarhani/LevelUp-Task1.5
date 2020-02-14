"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
class Logger {
	info(message, obj) {
		this.log(message, obj);
	}
	error(message, obj) {
		this.log(message, obj);
	}
	log(message, obj) {
		process.stdout.write(
			`${message} ${JSON.stringify(obj)}${os_1.EOL}${os_1.EOL}`
		);
	}
}
exports.default = new Logger();
//# sourceMappingURL=logger.js.map
