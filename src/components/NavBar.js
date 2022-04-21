import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Flex, Icon, Image, Badge, Box } from '@chakra-ui/react'
import { ShopContext } from "../context/shopContext"
import { MdMenu, MdShoppingBasket } from 'react-icons/md'

const NavBar = () => {
    const { openCart, openMenu, checkout } = useContext(ShopContext)

    return (
        <Flex flexDir='row' justifyContent='space-between' p='2rem' backgroundColor='#ffa8e2'>
            <Icon fill="white" cursor="pointer" onClick={() => openMenu()} as={MdMenu} w={30} h={30}></Icon>
            <Link to="/"><Image src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540" w={100} h={100} loading='lazy' alt='' objectFit='contain' /></Link>
            <Box>
                <Icon fill="white" cursor="pointer" onClick={() => openCart()} as={MdShoppingBasket} w={30} h={30}></Icon>
                <Badge backgroundColor="#FF38BD" borderRadius="50%">{checkout?.lineItems?.length}</Badge>
            </Box>
        </Flex>
    )
}

export default NavBar