import Author from "../models/Author";
import Book from "../models/Book";
import Blog from "../models/Blog";

// (){} : ! # _
export const typeDefs = `#graphql
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

export const resolvers = {
  Query: {
    authors: async () => await Author.find({}),
    author: async (_: any, args: any) => await Author.findById(args.id),

    books: async () => await Book.find(),
    book: async (_: any, args: any) => await Book.findById(args.id),

    blogs: async () => await Blog.find(),
    blog: async (_: any, args: any) => await Blog.findById(args.id),
  },
  Book: {
    async author(parent: any) {
      const author = await Author.findById(parent.authorId);
      return author;
    },
  },
  Blog: {
    async author(parent: any) {
      const author = await Author.findById(parent.authorId);
      return author;
    },
  },
  Author: {
    async blogs(parent: any) {
      const blogs = await Blog.find({ authorId: parent.id });
      return blogs;
    },
    async books(parent: any) {
      const books = await Book.find({ authorId: parent.id });
      return books;
    },
  },

  Mutation: {
    // Create Mutations
    createAuthor: async (_: any, args: { author: {} }) => {
      const author = new Author(args.author);
      return author.save();
    },
    createBlog: async (_: any, args: { blog: {} }) => {
      const blog = new Blog(args.blog);
      return blog.save();
    },
    createBook: async (_: any, args: { book: {} }) => {
      const book = new Book(args.book);
      return book.save();
    },

    // Update Mutations
    updateAuthor: async (_: any, args: { id: String; author: {} }) => {
      const author = await Author.findById(args.id);
      await author?.updateOne(args.author);
      return await author?.save();
    },
    updateBlog: async (_: any, args: { id: String; blog: {} }) => {
      const blog = await Blog.findById(args.id);
      await blog?.updateOne(args.blog);
      return await blog?.save();
    },
    updateBook: async (_: any, args: { id: String; book: {} }) => {
      const book = await Book.findById(args.id);
      await book?.updateOne(args.book);
      return await book?.save();
    },

    // Delete Mutations
    deleteAuthor: async (_: any, args: { id: String }) => {
      const author = await Author.findById(args.id);
      await author?.deleteOne();
      return await Author.find({});
    },
    deleteBlog: async (_: any, args: { id: String }) => {
      const blog = await Blog.findById(args.id);
      await blog?.deleteOne();
      return await Blog.find({});
    },
    deleteBook: async (_: any, args: { id: String }) => {
      const book = await Book.findById(args.id);
      await book?.deleteOne();
      return await Book.find({});
    },
  },
};
