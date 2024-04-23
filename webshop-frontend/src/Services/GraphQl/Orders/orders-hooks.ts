import { useMutation, useQuery } from "@apollo/client"
import { ALL_ORDERS } from "./orders-queries"
import { CREATE_NEW_ORDER, CREATE_ORDER } from "./orders-mutations"
import { OrderDetail } from "../../../Interfaces/OrderDetail"
import { ALL_PRODUCTS, ALL_PRODUCTS_FILTER } from "../Products/products-queries"

export const useOrders = () => {
    const result = useQuery(ALL_ORDERS())
    return result
}

export const useCreateOrder = (total: number, orderDetail: OrderDetail[]) => {

    console.log(total, orderDetail)

    return useMutation(CREATE_ORDER(total, orderDetail), {
        refetchQueries: [ 
            { query: ALL_PRODUCTS_FILTER(0, 10, null, null) },
            { query: ALL_PRODUCTS()},
            { query: ALL_ORDERS()} 
        ]
    })
}

export const useCreateNewOrder = () => {

    const result = useMutation(CREATE_NEW_ORDER, {
        refetchQueries: [ 
            { query: ALL_PRODUCTS_FILTER(0, 10, null, null) },
            { query: ALL_PRODUCTS()},
            { query: ALL_ORDERS()} 
        ]
    })

    return result
}