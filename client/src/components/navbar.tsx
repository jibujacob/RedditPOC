import { Box, Button, Flex, Link as ReactLink} from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
import { useCurrentUserQuery } from '../generated/graphql';

interface navbarProps{}

const Navbar:React.FC<navbarProps> = () => {
    const [{data,fetching}] = useCurrentUserQuery();

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
                <Button variant={'link'}>Logout</Button>
            </Flex>
        )
    }

    return (
        <Flex bg="tomato" p={4}>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
}

export default Navbar;