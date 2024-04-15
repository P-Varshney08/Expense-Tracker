import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./src/typeDef/typeDef.js";
import resolvers from "./src/resolver/resolver.js";
import cors from 'cors';
// import mongoose from "mongoose";

// const app=express()

async function initServer() {
  const app = express();
  app.use(cors())
;  const apolloServer = new ApolloServer({ typeDefs:typeDefs, resolvers:resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
//   const MONGO_URI = 'mongodb://localhost:27017/graph-todo';


  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

initServer();