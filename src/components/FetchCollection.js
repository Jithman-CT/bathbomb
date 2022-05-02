import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Grid, Text, Image } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

import { ShopContext } from '../context/shopContext'

// const url = `https://ct-jithman.myshopify.com//admin/api/2020-04/collections/288315900079.json/`



const FetchCollection = () => {

    // const fetchCustomCollection = useCallback(async () => {
    //     fetch(url)
    //         .then(res => {
    //             console.log(res.json())
    //             return res.json()
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    const { fetchAllWithProducts, collections } = useContext(ShopContext)

    useEffect(() => {
        fetchAllWithProducts();
    }, [fetchAllWithProducts])

    // useEffect(() => {
    //     fetchCustomCollection();
    // }, [fetchCustomCollection])


    if (!collections) return <div>Loading...</div>

    return (
        <>
            <Box>
                {collections.map((collection) => {
                    return (
                        <Link to={`/collections/${collection.handle}`} key={collection.id} >
                            <Box border='1px solid red' marginBottom="50px">
                                <h1 >
                                    {collection.title}
                                </h1>
                                {/* {collection.products.map((product) => {
                                    return (
                                        <div key={product.id}>
                                            <h2>{product.title}</h2>
                                            <p>{product.description}</p>
                                            <Image src={product.images[0].src} alt={product.images[0].alt} loading='lazy' />
                                        </div>
                                    )
                                })} */}
                            </Box>
                        </Link>

                    )
                })}
            </Box>
        </>

    )
}

export default FetchCollection