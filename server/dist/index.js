"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
require("dotenv/config");
const Post_1 = require("./entities/Post");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const setup = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    const post = orm.em.create(Post_1.Post, { title: "my first post" });
    await orm.em.persistAndFlush(post);
};
setup();
//# sourceMappingURL=index.js.map