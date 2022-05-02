import React, { useContext, useEffect, useState } from 'react'
import {
    Grid,
    Text,
    Image, Box, Heading, Center

} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ShopContext } from '../context/shopContext'

const ProductListing = (props) => {

    const { fetchAllProducts, products, fetchAllWithProducts, } = useContext(ShopContext)

    const filterProducts = products.filter((product) => product.variants[0].id !== props.productID);

    useEffect(() => {
        fetchAllProducts()
    }, [fetchAllProducts])

    useEffect(() => {
        fetchAllWithProducts();
    }, [fetchAllWithProducts])


    if (!products) return <div>loading...</div>
    return (
        <>
            <Heading as="h3" marginBottom='2rem'>Product Listing</Heading>
            <Grid templateColumns={['repeat(1fr)', 'repeat(3, 1fr)']}>
                {filterProducts.map(product => {
                    return (
                        <Link to={`/products/${product.handle}`} key={product.id} >
                            <Box _hover={{ opacity: '80%' }} textAlign="center" position="relative">
                                <Image
                                    src={product.images[0].src} loading='lazy' alt='' w={["480px", "100%"]} h={['250px', 'auto']} className='product-image'
                                />
                                <Text fontWeight="bold" position="absolute" bottom="15%" w="100%">{product.title}</Text>
                                <Text color="gray.500" position="absolute" bottom="5%" w="100%">${product.variants[0].price}</Text>
                            </Box>
                        </Link>
                    )
                })}
            </Grid>
        </>
    )
}

export default ProductListing