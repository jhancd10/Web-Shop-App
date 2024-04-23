import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_PRODUCTS, ALL_PRODUCTS_FILTER } from "./products-queries"

export const useAllProducts = () => {
    const result = useQuery(ALL_PRODUCTS())
    return result
}

export const useProducts = (skip: number, take: number, categoryId: number | null, price: number | null) => {
    const result = useQuery(ALL_PRODUCTS_FILTER(skip, take, categoryId, price))
    return result
}

export const useProductsLazy = (skip: number, take: number, categoryId: number | null, price: number | null) => {
    const result = useLazyQuery(ALL_PRODUCTS_FILTER(skip, take, categoryId, price))
    return result
}