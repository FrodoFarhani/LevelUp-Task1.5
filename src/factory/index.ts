import Customer from "./tblCustomer";
import Source from "./tblSource";
import Product from "./tblProduct";
import Offer from "./tblOffer";
import InitializeDb from "./initializeDb";

const instantiateDb = async () => {
	const initObject = new InitializeDb({
		insert: [new Customer(), new Source(), new Product(), new Offer()],
		truncate: [new Customer(), new Source(), new Product(), new Offer()],
		create: [new Customer(), new Source(), new Product(), new Offer()]
	});
	await initObject.createTable();
	await initObject.insertData();
};

export default instantiateDb();
