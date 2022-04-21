import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Image, Text, Button, Heading, Flex, } from "@chakra-ui/react"

import { ShopContext } from '../context/shopContext'

const ProductPage = () => {

    const { handle } = useParams();

    const { fetchProductWithHandle, addItemToCheckout, product, } = useContext(ShopContext);

    useEffect(() => {
        fetchProductWithHandle(handle)
    }, [fetchProductWithHandle, handle])

    if (!product.title) return <div>Loading....</div>

    return (
        <Box p='1.25rem'>

            <Grid templateColumns={['repeat(1,1fr)', 'repeat(1,1fr)', 'repeat(2,1fr)']} gap='1.5rem' alignItems='center'>
                <Image src={product.images[0].src} loading='lazy' alt='' />
                <Flex alignItems='center' flexDirection='column' justifyContent='center' px='1.5rem' textAlign='center' >
                    <Heading pb="1rem">{product.title}</Heading>
                    <Text fontWeight='bold' pb="1rem">$ {product.variants[0].price}</Text>
                    <Text color='gray.500' pb="1rem">{product.description}</Text>
                    <Button onClick={() => addItemToCheckout(product.variants[0].id, 1)}
                        _hover={{ opacity: '70%' }}
                        w='10rem'
                        backgroundColor='#ff38bd'
                        color='white'
                    >Add To Cart</Button>
                </Flex>
            </Grid>
        </Box>

    )
}

export default ProductPage