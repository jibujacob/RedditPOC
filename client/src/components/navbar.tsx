import { Box, Button, Flex, Link as ReactLink} from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'

import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface navbarProps{}

const Navbar:React.FC<navbarProps> = () => {
    const [{data,fetching}] = useCurrentUserQuery({pause:isServer()});
    const[{fetching:logoutFetching},logout]=useLogoutMutation();
    let body=null;

    if(fetching){

    }else if(!data?.me){
        body=(
            <>
                 <Link href="/register">
                    <ReactLink mr={2}>Register</ReactLink>
                </Link>
                <Link href="/login">
                    <ReactLink>Login</ReactLink>
                </Link>
            </>
        )
    }else{
        body=(
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button 
                    variant={'link'}
                    isLoading={logoutFetching}
                    onClick={()=>logout()}>Logout
                </Button>
            </Flex>
        )
    }

    return (
        <Flex bg="tan" p={4}>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
}

export default Navbar;