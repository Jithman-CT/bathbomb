import React, { Component } from 'react'
import Client from 'shopify-buy'


const ShopContext = React.createContext();

const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
});

class ShopProvider extends Component {

    state = {
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false,
        collections: [],
        collection: {}
    }

    componentDidMount() {
        if (localStorage.checkout_id) {
            this.fetchCheckout(localStorage.checkout_id)
        }
        else {
            this.createCheckout()
        }
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create();
        localStorage.setItem('checkout_id', checkout.id);
        this.setState({ checkout: checkout })
    }

    fetchCheckout = (checkoutId) => {
        client.checkout
            .fetch(checkoutId)
            .then((checkout) => {
                this.setState({ checkout: checkout })
            }).catch(e => {
                console.error(e);
            })
    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
            {
                variantId: variantId,
                quantity: parseInt(quantity, 10)
            }
        ]

        const checkout = await client.checkout.addLineItems(
            this.state.checkout.id,
            lineItemsToAdd
        )
        this.setState({ checkout: checkout })

        this.openCart();
    }

    removeLineItem = async (lineItemIdsToRemove) => {
        const checkoutId = this.state.checkout.id

        client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove)
            .then(checkout => this.setState({ checkout: checkout })
            )
    }

    fetchAllWithProducts = async () => {
        const collections = await client.collection.fetchAllWithProducts()
        this.setState({ collections: collections })
        return collections
    }
    fetchCollectionWithProducts = async (handle) => {
        const collection = await client.collection.fetchByHandle(handle);
        this.setState({ collection: collection })
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        this.setState({ products: products })

    }

    fetchProductWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle);
        this.setState({ product: product })
        return product;
    }

    closeCart = () => {
        this.setState({ isCartOpen: false });
    };
    openCart = () => {
        this.setState({ isCartOpen: true });
    };

    closeMenu = () => {
        this.setState({ isMenuOpen: false })
    }
    openMenu = () => {
        this.setState({ isMenuOpen: true })
    }


    render() {

        return (
            <ShopContext.Provider
                value={{
                    ...this.state,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchProductWithHandle: this.fetchProductWithHandle,
                    fetchAllWithProducts: this.fetchAllWithProducts,
                    fetchCollectionWithProducts: this.fetchCollectionWithProducts,
                    closeCart: this.closeCart,
                    closeMenu: this.closeMenu,
                    openCart: this.openCart,
                    openMenu: this.openMenu,
                    addItemToCheckout: this.addItemToCheckout,
                    removeLineItem: this.removeLineItem
                }}
            >
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}


const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider