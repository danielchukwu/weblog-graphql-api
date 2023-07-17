import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true },
  content: { type: String, required: true, trim: true },
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "Author",
    required: true,
    trim: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
