"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asInt = (str, varName) => {
	if (!str) {
		return 0;
	}
	const num = parseInt(str, 10);
	if (Number.isNaN(num)) {
		throw new Error(`env.${varName} is expected to be number`);
	}
	return num;
};
const asBool = (str, varName) => {
	if (!str) {
		return false;
	}
	if (str !== "true" && str !== "false") {
		throw new Error(
			`env.${varName} is expected to be either "true" or "false"`
		);
	}
	return str === "true";
};
exports.default = (varName, optional = false) => {
	const variable = process.env[varName];
	if (!variable && !optional) {
		throw new Error(`env.${varName} is not set`);
	}
	return {
		asString: () => variable || "",
		asInt: () => asInt(variable, varName),
		asBool: () => asBool(variable, varName)
	};
};
//# sourceMappingURL=processENV.js.map
