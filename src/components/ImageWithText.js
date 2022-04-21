import React from 'react'
import { Box, Flex, Button, Text, Image, Heading } from "@chakra-ui/react"


const ImageWithText = ({ button, reverse, image, heading, text }) => {

    const reverseSection = reverse ? 'row-reverse' : 'row';

    return (
        <Box>

            <Flex flexDir={['column', reverseSection]} w="100%">
                <Image objectFit="cover" w={["480px", "50%"]} src={image} loading='lazy' alt='' h={["250px", "auto"]} />
                <Box w={["100%", "50%"]} display="flex" flexDir="column" justifyContent="center" alignItems="center" p="2rem">
                    <Heading pb="2rem">
                        {heading && heading}
                    </Heading>
                    <Text pb="2rem">
                        {text && text}
                    </Text>
                    {button ?
                        <Button w="10rem" backgroundColor="#FF38BD" color="#020101" _hover={{ opacity: '70%' }} >Buy Now</Button> : null
                    }
                </Box>
            </Flex>
        </Box>
    )
}

export default ImageWithText