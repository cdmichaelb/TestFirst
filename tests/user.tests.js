const chai = require("chai");
const dotenv = require("dotenv");

const { app } = require("../server");
dotenv.config();

describe("User Routes and Models", () => {
	it("Should disallow a short username", async () => {
		const response = await chai.request(app).post("/user/signup").send({
			username: "Hoi",
			password: "notthebatcave123",
			passwordCheck: "notthebatcave123",
		});

		chai.expect(response.status).to.be.eq(400);
	});

	it("Should disallow nonmatching passwords", async () => {
		const response = await chai.request(app).post("/user/signup").send({
			username: "Batmobile35",
			password: "notthebatcave123",
			passwordCheck: "notthesamepassword123",
		});

		chai.expect(response.status).to.be.eq(401);
	});

	it("Should disallow short passwords", async () => {
		const response = await chai.request(app).post("/user/signup").send({
			username: "Batmobile35",
			password: "short",
			passwordCheck: "short",
		});

		chai.expect(response.status).to.be.eq(400);
	});

	it("Should allow a valid user to signup", async () => {
		const response = await chai.request(app).post("/user/signup").send({
			username: "Batmobile35",
			password: "notthebatcave123",
			passwordCheck: "notthebatcave123",
		});

		chai.expect(response.body.username).to.exist;
		chai.expect(response.body.password).to.not.exist;
		chai.expect(response.status).to.be.eq(201);
	});

	it("Should disallow a duplicate username", async () => {
		const response = await chai.request(app).post("/user/signup").send({
			username: "Batmobile35",
			password: "notthebatcave123",
			passwordCheck: "notthebatcave123",
		});

		chai.expect(response.status).to.be.eq(409);
	});

	it("Should allow a valid user to sign in", async () => {
		const response = await chai.request(app).post("/user/login").send({
			username: "Batmobile35",
			password: "notthebatcave123",
		});

		this.token = response.body.token;
		chai.expect(response.body.token).to.exist;
		chai.expect(response.status).to.be.eq(200);
	});

	it("Should allow a user to visit their profile", async () => {
    const response = await chai
      .request(app)
      .get("/user/profile")
      .set("Authorization", `Bearer ${this.token}`);

    chai.expect(response.status).to.eq(200);
    chai.expect(response.body.isAdmin).to.be.eq(false);
    chai.expect(response.body.username).to.be.eq("Batmobile35");
		chai.expect(response.body.books).to.exist;
    chai.expect(response.body.password).to.not.exist;
  });
});
