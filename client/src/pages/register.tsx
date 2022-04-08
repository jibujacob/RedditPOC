import React from 'react'
import { Form, Formik } from 'formik';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import Wrapper from '../components/wrapper';
import InputField from '../components/inputField';
import { useRegisterMutation } from '../generated/graphql';

interface registerProps{}

const Register :React.FC<registerProps>= () => {
    const [,register] = useRegisterMutation();

    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{username:"",password:""}}
                onSubmit={async (values,{setErrors})=>{
                    const response = await  register(values);
                    if(response.data?.register.errors){
                      setErrors({
                        
                      })
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
                            >Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default Register