const { expect } = require("chai");
const chai = require("chai");
const dotenv = require("dotenv");
const jwtMiddleware = require("../helpers/jwt-middleware");

const { app } = require("../server");
dotenv.config();

describe("Book Routes and Models", async () => {
	it("Should allow admin to add a book", async () => {
		const response = chai
			.request(app)
			.post("/")
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
			.send({
				title: "Test Title",
				author: "Test Author",
				user: null,
			});

		expect(res.status).to.eq(201);
		expect(res.body["title"]).to.eq("Test Title");
		expect(res.author).to.exist;
		expect(res.user).to.eq(null);
		expect(res.body["_id"]).to.exist;
		this.bookID = res.body["_id"];
	});

	it("Should not allow a book to created with no title", async () => {
		const response = chai
			.request(app)
			.post("/")
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
			.send({
				title: null,
				author: "Test Author",
				user: null,
			});

		expect(res.status).to.eq(405);
		expect(res.body).to.not.exist;
	});

	it("Should read the data from a book's ID", async () => {
		const response = chai
			.request(app)
			.get(`/${this.bookID}/`)
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);

		expect(res.status).to.eq(200);
		expect(res.body).to.eq("Test Title");
		expect(res.author).to.exist;
	});

	it("Should not read a book that does not exist", async () => {
		const response = chai
			.request(app)
			.get("/se42as4sw4/")
			.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);
	});

	expect(res.status).to.eq(404);

	it("Should delete a book"),
		async () => {
			const response = chai
				.request(app)
				.delete(`${this.bookID}`)
				.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);
		};

	expect(res.status).to.eq(200);

	it("Should list all books"),
		async () => {
			const response = chai
				.request(app)
				.get("/")
				.set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);

			expect(res.status).to.eq(200);
			expect(res.body).to.be.an("array");
		};
});
