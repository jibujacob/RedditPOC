import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post{
    [OptionalProps]?:  "updatedAt" | "createdAt";

    @Field()
    @PrimaryKey()
    id !: number;

    @Field(()=> String)
    @Property({type: "date",onCreate : ()=> new Date()})
    createdAt = new Date();

    @Field(()=> String)
    @Property({type: "date", onUpdate : () => new Date()})
    updatedAt = new Date();

    @Field()
    @Property({type:"text"})
    title !: string;
}