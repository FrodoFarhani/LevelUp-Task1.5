import productCount from "../controllers/productControler";
import { sourceFreeIds, sourceCount } from "../controllers/sourceController";
import UpdateOffer from "../services/updateOffer";

const updateHandler = async () => {
	try {
		const TblProductCount = await productCount();
		const TblSourceCount = await sourceCount();
		const TblSourceFreeIds = await sourceFreeIds();

		const tableOfferObject = new UpdateOffer(
			TblProductCount,
			TblSourceCount,
			TblSourceFreeIds
		);
		const result = await tableOfferObject.updateTblOffer();
		return result;
	} catch (error) {
		throw new Error(error.message);
	}
};
export default updateHandler;
