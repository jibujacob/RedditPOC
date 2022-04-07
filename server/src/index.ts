import { MikroORM} from "@mikro-orm/core";
import 'dotenv/config';

import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";



const setup = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();

    const post = orm.em.create(Post,{title : "my first post"});
    await orm.em.persistAndFlush(post);

    // const posts = await orm.em.find(Post,{});
    // console.log(posts);
    
    
}

setup();