import { Box } from '@chakra-ui/react'
import React from 'react'

interface wrapperProps {
    variant?: "small" | "regular"
}

const Wrapper :React.FC<wrapperProps> = ({children,variant="regular"}) => {
  return (
    <Box 
        maxW={variant === "regular" ? "800px" : "400px" } 
        w="90%" 
        mt={8} 
        mx="auto">
        {children}
    </Box>
  )
}

export default Wrapper