import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  genre: { type: String, required: true, trim: true },
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "Author",
    required: true,
    trim: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
