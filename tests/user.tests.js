const chai = require("chai");
const dotenv = require("dotenv");

const { app } = require("../server");
dotenv.config();

describe("User Routes and Models", () => {
	it("Should allow a valid user to signup", async () => {
		const response = await chai.request(app).post("/user/signup").send({
			username: "Batmobile35",
			password: "notthebatcave123",
			passwordcheck: "notthebatcave123",
		});
	});
});
