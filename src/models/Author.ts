import mongoose from "mongoose";
import Blog from "./Blog";
import Book from "./Book";

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, trim: true },
});

authorSchema.post("deleteOne", function (doc) {
  console.log("Author Document", doc);
  // Delete blogs
  Blog.deleteMany({ authorId: doc.authorId });

  // Delete books
  Book.deleteMany({ authorId: doc.authorId });
});

const Author = mongoose.model("Author", authorSchema);
export default Author;
