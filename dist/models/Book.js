"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bookSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    genre: { type: String, required: true, trim: true },
    authorId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Author",
        required: true,
        trim: true,
    },
});
const Book = mongoose_1.default.model("Book", bookSchema);
exports.default = Book;
