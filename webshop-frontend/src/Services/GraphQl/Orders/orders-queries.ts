import { gql } from "@apollo/client";

export const ALL_ORDERS = () => gql`
query getOrders {
    allOrders {
      order_Id
      order_Date
      order_Total
      customer {
        customer_Name
        customer_Email
      }
      orderDetails {
        quantity
        price
        product {
          product_Id
          product_Code
          title
        }
      }
    }
  }
`