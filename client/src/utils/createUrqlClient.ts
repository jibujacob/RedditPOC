import { cacheExchange } from "@urql/exchange-graphcache"
import { dedupExchange, fetchExchange } from "urql"
import { LogoutMutation, CurrentUserQuery, CurrentUserDocument, LoginMutation, RegisterMutation } from "../generated/graphql"
import { betterUpdateQuery } from "./betterUpdateQuery"

export const createUrqlClient =(ssrExchange:any)=>({
    url: 'http://localhost:5001/graphql',
    fetchOptions:{
      credentials : "include" as const
    },
    exchanges: [dedupExchange, cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation,CurrentUserQuery>(cache,
                {query:CurrentUserDocument},
                _result,
                ()=> ({me:null})
                )
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation,CurrentUserQuery>(cache,
                {query:CurrentUserDocument},
                _result,
                (result,query)=>{
                  if(result.login.errors) return query
                  else {
                    return {
                      me:result.login.user
                    }
                  }
                })
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation,CurrentUserQuery>(cache,
                {query:CurrentUserDocument},
                _result,
                (result,query)=>{
                  if(result.register.errors) return query
                  else {
                    return {
                      me:result.register.user
                    }
                  }
                })
          },
        },
      },
    }), ssrExchange,fetchExchange],
})