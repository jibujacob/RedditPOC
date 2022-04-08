import argon2 from "argon2";
import { User } from "../entities/User";
import { MyContext } from "../Types/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";

import "express-session";
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

@InputType()
class UsernamePasswordInput{
    @Field()
    username:string;
    @Field()
    password:string;
}

@ObjectType()
class FieldError{
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse{
    @Field(()=>[FieldError],{nullable:true})
    errors?:FieldError[]

    @Field(()=>User,{nullable:true} )
    user?:User
}

@Resolver()
export class UserResolver{
    @Query(()=>User,{nullable:true})
    async me(
        @Ctx() {em,req} :MyContext
    ){
        if(!req.session.userId){
            return null;
        }

        const user = await em.findOne(User,{id:req.session.userId});
        return user;
    }


    @Mutation(()=> UserResponse)
    async register(
        @Arg("options") options:UsernamePasswordInput,
        @Ctx() {em,req} : MyContext
    ): Promise<UserResponse>{
        
        if(options.username.length <=2){
            return {errors:[
                {
                    field:"username",
                    message:"Username must be greater than 2 characters"
                }
            ],}
        }

        if(options.password.length <=6){
            return {errors:[
                {
                    field:"password",
                    message:"Password must be greater than 6 characters"
                }
            ],}
        }

        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User,{username:options.username,password:hashedPassword});
        try {
            await em.persistAndFlush(user);
        } catch (error) {
            console.log(error.message);
            if(error.code==='23505' || error.detail.includes("already exists")){
                return {
                    errors:[{
                        field:"username",
                        message:"Username already exists"
                    }]
                }
            }
        }

        req.session.userId = user.id;

        return {user};
    }

    @Mutation(()=> UserResponse)
    async login(
        @Arg("options") options:UsernamePasswordInput,
        @Ctx() {em,req} : MyContext
    ): Promise<UserResponse>{
        const user = await em.findOne(User,{username:options.username});

        if(!user){
            return {errors:[
                {
                    field:"username",
                    message:"Username does not exists"
                }
            ]}
        }

        const valid = await argon2.verify(user.password,options.password);
        
        if(!valid){
            return {errors:[
                {
                    field:"password",
                    message:"Password does not match"
                }
            ]}
        }

        req.session.userId = user.id;

        return {user};
    }

}