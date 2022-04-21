import React, { useContext } from 'react'

import { ShopContext } from '../context/shopContext'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Grid,
    Text,
    Flex,
    Image, Link, Box, Badge

} from '@chakra-ui/react'

import { CloseIcon } from "@chakra-ui/icons"

const Cart = () => {

    const { isCartOpen, closeCart, checkout, removeLineItem } = useContext(ShopContext)

    return (
        <>
            <Drawer
                isOpen={isCartOpen}
                placement='right'
                onClose={closeCart}
                size='sm'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Shoping Cart</DrawerHeader>

                    <DrawerBody>
                        {
                            checkout.lineItems?.length ? checkout.lineItems.map((item) => {
                                return (
                                    <Grid templateColumns='repeat(4,1fr)' gap={1} key={item.id} marginBottom="0.75rem">
                                        <Flex alignItems={`center`} justifyContent='center'>
                                            <CloseIcon cursor={`pointer`} onClick={() => removeLineItem(item.id)} />
                                        </Flex>
                                        <Flex alignItems={`center`} justifyContent='center'>
                                            <Image src={item.variant.image.src} loading='lazy' alt='' />
                                        </Flex>
                                        <Flex alignItems={`center`} justifyContent='center'>
                                            <Text>
                                                {item.title}
                                                <Badge backgroundColor="#FF38BD" borderRadius="50%">{item.quantity}</Badge>
                                            </Text>
                                        </Flex>
                                        <Flex alignItems={`center`} justifyContent='center' fontWeight='bold'>
                                            <Text>
                                                $ {item.variant.price}
                                            </Text>
                                        </Flex>
                                    </Grid>
                                )
                            }) :
                                <Box h='100%' w='100%'>
                                    <Flex flexDir='column' alignItems='center' justifyContent='center' h='100%'>
                                        <Text fontSize='3xl'>Your Cart is empty!</Text>
                                    </Flex>
                                </Box>
                        }
                    </DrawerBody>
                    {checkout.lineItems?.length ?
                        <DrawerFooter>
                            <Link href={checkout.webUrl} w="100%">
                                <Button w="100%">
                                    Checkout
                                </Button>
                            </Link>
                        </DrawerFooter> : null
                    }
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Cart