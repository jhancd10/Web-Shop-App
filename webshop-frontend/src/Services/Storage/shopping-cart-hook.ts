/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { create } from "zustand";
import { type ProductStorage } from "../../Types/types";

interface State {
    products: ProductStorage[]
    shoppingCart: ProductStorage[]
    fetchProducts: (products: ProductStorage[]) => void
    updateShoppingCart: (productId: number, quantity: number) => void
    clearShoppingCart: () => void
}

export const useShoppingCartStore = create<State>()( (set, get) => {
    
    return {

        products: [],
        shoppingCart: [],

        fetchProducts: (products: ProductStorage[]) => set({ products }),

        updateShoppingCart: (productId: number, quantity: number) => {

            const { products } = get()
            const newProducts = structuredClone(products)

            const productIndex = newProducts.findIndex( (prod) => prod.productId === productId)

            let prodData = newProducts[productIndex]
            prodData.quantity += quantity

            if (prodData.quantity < 0) prodData.quantity = 0
            if (prodData.quantity > prodData.availableStock) prodData.quantity = prodData.availableStock

            newProducts[productIndex] = { ...prodData }

            set({ products: newProducts, 
                shoppingCart: newProducts.filter(p => p.quantity !== 0) })
        },

        clearShoppingCart: () => {

            const { products } = get()
            
            const newProducts = products.map( (prod) => {
                return {
                    ...prod,
                    quantity: 0
                }
            })

            set({ products: newProducts, shoppingCart: [] })
        }
    }
})