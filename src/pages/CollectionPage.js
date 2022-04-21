import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Grid, Text, Image, Heading } from "@chakra-ui/react"

import { ShopContext } from '../context/shopContext'

const CollectionPage = () => {

    const { handle } = useParams();

    const { fetchCollectionWithProducts, collection } = useContext(ShopContext)

    useEffect(() => {
        fetchCollectionWithProducts(handle);
    }, [fetchCollectionWithProducts, handle])

    console.log(collection)
    if (!collection.title) return <div>Loading...</div>

    return (
        <>
            <Box textAlign='center' maxWidth={960} margin='15px auto'>
                <Heading as='h1' marginBlock='2rem'>{collection.title}</Heading>
                {
                    collection.products.map((item, i) => {
                        return (
                            <Box marginBottom='50px' key={i}>
                                <Image src={item.images[0].src} alt={item.images[0].alt} marginBottom="0.5rem" loading='lazy' />
                                <Heading as='h2' size='md' marginBottom="0.5rem">{item.title}</Heading>
                                <Text marginBottom="0.5rem">{item.description}</Text>
                            </Box>
                        )
                    })
                }
            </Box>
        </>

    )
}

export default CollectionPage