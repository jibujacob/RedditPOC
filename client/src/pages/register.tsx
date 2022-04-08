import React from 'react'
import { Form, Formik } from 'formik';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import Wrapper from '../components/wrapper';
import InputField from '../components/inputField';
import { useMutation } from 'urql';

interface registerProps{}

const REGISTER_MUTATION = `
mutation Mutation($username:String! ,$password:String!) {
    register(options: {
      username:$username,
      password:$password
    }) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        username
      }
    }
  }
`

const Register :React.FC<registerProps>= () => {
    const [,register] = useMutation(REGISTER_MUTATION);

    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{username:"",password:""}}
                onSubmit={(values)=>{
                    return register(values);
                }}
            >
                {({isSubmitting})=>(
                    <Form>
                       <InputField 
                            name="username" 
                            label="username" 
                            placeholder="username"/>
                        <Box mt={4}>
                            <InputField 
                                name="password" 
                                label="password" 
                                placeholder="password"
                                type="password"/>
                        </Box>
                        <Button mt={4} 
                            type="submit" 
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            >Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Register