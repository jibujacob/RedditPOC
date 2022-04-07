import { MikroORM} from "@mikro-orm/core";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import 'dotenv/config';

import { __prod__ } from "./constants";
//import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";



const setup = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const port = process.env.SERVER_PORT || 5001;
    const app = express();

    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers : [HelloResolver,PostResolver],
            validate : false
        }),
        context : () => ({em:orm.em})
    })
    
    await apolloServer.start();
    apolloServer.applyMiddleware({app});

    app.listen(port,()=>{
        console.log(`Server Listening on port :${port}`);         
    }); 
}

setup();