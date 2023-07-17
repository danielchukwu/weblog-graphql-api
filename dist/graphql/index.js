"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const Author_1 = __importDefault(require("../models/Author"));
const Book_1 = __importDefault(require("../models/Book"));
const Blog_1 = __importDefault(require("../models/Blog"));
// (){} : ! # _
exports.typeDefs = `#graphql
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: Author!
  }
  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author!
  }
  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book]!
    blogs: [Blog]!
  }

  type Query {
    authors: [Author]!
    books: [Book]!
    blogs: [Blog]!
    author(id: ID!): Author
    book(id: ID!): Book
    blog(id: ID!): Blog
  }

  type Mutation {
    createAuthor(author: CreateAuthorInput): Author
    createBlog(blog: CreateBlogInput): Blog
    createBook(book: CreateBookInput): Book

    deleteAuthor(id: ID!): [Author]
    deleteBlog(id: ID!): [Blog]
    deleteBook(id: ID!): [Book]

    updateAuthor(id: ID!, author: UpdateAuthorInput): Author
    updateBlog(id: ID!, blog: UpdateBlogInput): Blog
    updateBook(id: ID!, book: UpdateBookInput): Book
  }

  # Required Inputs
  input CreateAuthorInput { name: String!, age: Int!,}
  input CreateBlogInput { title: String!, content: String!, authorId: String! }
  input CreateBookInput { name: String!, genre: String!, authorId: String! }

  # Not Required Inputs - just incase you want to update anyone of your choice
  input UpdateAuthorInput { name: String, age: Int }
  input UpdateBlogInput { title: String, content: String }
  input UpdateBookInput { name: String, genre: String }
`;
exports.resolvers = {
    Query: {
        authors: () => __awaiter(void 0, void 0, void 0, function* () { return yield Author_1.default.find({}); }),
        author: (_, args) => __awaiter(void 0, void 0, void 0, function* () { return yield Author_1.default.findById(args.id); }),
        books: () => __awaiter(void 0, void 0, void 0, function* () { return yield Book_1.default.find(); }),
        book: (_, args) => __awaiter(void 0, void 0, void 0, function* () { return yield Book_1.default.findById(args.id); }),
        blogs: () => __awaiter(void 0, void 0, void 0, function* () { return yield Blog_1.default.find(); }),
        blog: (_, args) => __awaiter(void 0, void 0, void 0, function* () { return yield Blog_1.default.findById(args.id); }),
    },
    Book: {
        author(parent) {
            return __awaiter(this, void 0, void 0, function* () {
                const author = yield Author_1.default.findById(parent.authorId);
                return author;
            });
        },
    },
    Blog: {
        author(parent) {
            return __awaiter(this, void 0, void 0, function* () {
                const author = yield Author_1.default.findById(parent.authorId);
                return author;
            });
        },
    },
    Author: {
        blogs(parent) {
            return __awaiter(this, void 0, void 0, function* () {
                const blogs = yield Blog_1.default.find({ authorId: parent.id });
                return blogs;
            });
        },
        books(parent) {
            return __awaiter(this, void 0, void 0, function* () {
                const books = yield Book_1.default.find({ authorId: parent.id });
                return books;
            });
        },
    },
    Mutation: {
        // Create Mutations
        createAuthor: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const author = new Author_1.default(args.author);
            return author.save();
        }),
        createBlog: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const blog = new Blog_1.default(args.blog);
            return blog.save();
        }),
        createBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const book = new Book_1.default(args.book);
            return book.save();
        }),
        // Update Mutations
        updateAuthor: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const author = yield Author_1.default.findById(args.id);
            yield (author === null || author === void 0 ? void 0 : author.updateOne(args.author));
            return yield (author === null || author === void 0 ? void 0 : author.save());
        }),
        updateBlog: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const blog = yield Blog_1.default.findById(args.id);
            yield (blog === null || blog === void 0 ? void 0 : blog.updateOne(args.blog));
            return yield (blog === null || blog === void 0 ? void 0 : blog.save());
        }),
        updateBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield Book_1.default.findById(args.id);
            yield (book === null || book === void 0 ? void 0 : book.updateOne(args.book));
            return yield (book === null || book === void 0 ? void 0 : book.save());
        }),
        // Delete Mutations
        deleteAuthor: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const author = yield Author_1.default.findById(args.id);
            yield (author === null || author === void 0 ? void 0 : author.deleteOne());
            return yield Author_1.default.find({});
        }),
        deleteBlog: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const blog = yield Blog_1.default.findById(args.id);
            yield (blog === null || blog === void 0 ? void 0 : blog.deleteOne());
            return yield Blog_1.default.find({});
        }),
        deleteBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield Book_1.default.findById(args.id);
            yield (book === null || book === void 0 ? void 0 : book.deleteOne());
            return yield Book_1.default.find({});
        }),
    },
};
