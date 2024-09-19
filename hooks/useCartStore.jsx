import { create } from 'zustand'


export const useCartStore = create((set) => ({
    cart: [],
    isLoading: true,
    counter: 0,
    getCart: async (wixClient) => {
        try {
            const cart = await wixClient.currentCart.getCurrentCart()
            set({ cart: (cart || []), isLoading: false, counter: cart?.lineItems.length || 0 })
        } catch (error) {
            console.log(error);
        }
    },
    addItem: async (wixClient, productId, variantId, quantity) => {
        set((state) => ({ ...state, isLoading: true }))
        try {
            const res = await wixClient.currentCart.addToCurrentCart({
                lineItems: [
                    {
                        catalogReference: {
                            appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
                            catalogItemId: productId,
                            ...(variantId && { options: { variantId } })
                        },
                        quantity: quantity
                    }
                ]
            })
            set({
                cart: res.cart,
                isLoading: false,
                counter: res.cart.lineItems.length
            })
        } catch (error) {
            console.log(error);
        }

    },
    removeItem: async (wixClient, itemId) => {
        set((state) => ({ ...state, isLoading: true }))
        try {
            const res = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId])
            set({
                cart: res.cart,
                isLoading: false,
                counter: res.cart.lineItems.length
            })
        } catch (error) {
            console.log(error);
        }
    },
    updateQuantity: async (wixClient, item, quantity) => {
        set((state) => ({ ...state, isLoading: true }));
        try {
            const res = await wixClient.currentCart.updateCurrentCartLineItemQuantity([{
                id: item._id,  // Ensure this is the correct field for the line item ID
                quantity
            }]);
            console.log(res);
            set({
                cart: res.cart,
                isLoading: false,
                counter: res.cart.lineItems.length
            });
        } catch (error) {
            console.log(error);
        }
    }

}))