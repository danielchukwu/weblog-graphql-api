import { ApolloServer } from "@apollo/server";
import express from "express";
import dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs, resolvers } from "./graphql";
import mongoose from "mongoose";

// load environment variables into process.env
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// (){} <>
const bootstrapApp = async () => {
  // Create apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/graphql", expressMiddleware(server));

  // listen
  mongoose
    .connect(process.env.DBURI || "")
    .then(() => {
      app.listen(port, () => {
        console.log(`🚀 Express Server ready at http://localhost:${port}`);
        console.log(
          `🚀 Graphql Server ready at http://localhost:${port}/graphql`
        );
      });
    })
    .catch((err) => console.log(err));

  // routes
  app.get("/", (req, res) => {
    res.json({ data: { routes: "Server up and running" } });
  });
};
bootstrapApp();
