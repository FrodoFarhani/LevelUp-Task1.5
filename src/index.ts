import logger from "./libs/logger";
import updateHandler from "./handlers/updateHandler";

updateHandler()
	.then(result => logger.info(result))
	.catch(error => logger.error(error));
