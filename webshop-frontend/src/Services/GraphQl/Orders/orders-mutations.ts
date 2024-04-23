import { gql } from "@apollo/client";
import { OrderDetail } from "../../../Interfaces/OrderDetail";

export const CREATE_ORDER = (total: number, orderDetail: OrderDetail[]) => {
    return gql`
        mutation {
            createOrder(
                orderInput: {
                    total: ${total},
                    orderDetail: ${orderDetail}
                }) {
                order_Id 
            }
        }
    `
}

export const CREATE_NEW_ORDER = gql`
mutation orderCreation($orderInput: OrderInputTypeInput!) {
    createOrder(
      orderInput: $orderInput
    ) {
     order_Id 
    }
  }
`