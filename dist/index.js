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
const server_1 = require("@apollo/server");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const graphql_1 = require("./graphql");
const mongoose_1 = __importDefault(require("mongoose"));
// load environment variables into process.env
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// (){} <>
const bootstrapApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create apollo server
    const server = new server_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
    });
    yield server.start();
    // middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/graphql", (0, express4_1.expressMiddleware)(server));
    // listen
    mongoose_1.default
        .connect(process.env.DBURI || "")
        .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Express Server ready at http://localhost:${port}`);
            console.log(`🚀 Graphql Server ready at http://localhost:${port}/graphql`);
        });
    })
        .catch((err) => console.log(err));
    // routes
    app.get("/", (req, res) => {
        res.json({ data: { routes: "Server up and running" } });
    });
});
bootstrapApp();
