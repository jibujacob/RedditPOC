import React from 'react'
import { Form, Formik } from 'formik';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import Wrapper from '../components/wrapper';
import InputField from '../components/inputField';
import { useLoginMutation } from '../generated/graphql';
import {toErrorMap} from "../utils/toErrorMap";
import { useRouter } from 'next/router';

interface loginProps{}

const Login :React.FC<loginProps>= () => {
    const [,login] = useLoginMutation();
    const router = useRouter();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{username:"",password:""}}
                onSubmit={async (values,{setErrors})=>{
                    const response = await login(values);
                    if(response.data?.login.errors){
                        setErrors(toErrorMap(response.data?.login.errors))
                    }else if(response.data?.login.user){
                        router.push("/");
                    }
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
                            >Login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Login