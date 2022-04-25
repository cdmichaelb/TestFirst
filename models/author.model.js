const mongoose = require("mongoose");

const { Schema } = mongoose;

const authorSchema = Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

authorSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "author",
	justOne: false,
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
