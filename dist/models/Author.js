"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Blog_1 = __importDefault(require("./Blog"));
const Book_1 = __importDefault(require("./Book"));
const Schema = mongoose_1.default.Schema;
const authorSchema = new Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
});
authorSchema.post("deleteOne", function (doc) {
    console.log("Author Document", doc);
    // Delete blogs
    Blog_1.default.deleteMany({ authorId: doc.authorId });
    // Delete books
    Book_1.default.deleteMany({ authorId: doc.authorId });
});
const Author = mongoose_1.default.model("Author", authorSchema);
exports.default = Author;
