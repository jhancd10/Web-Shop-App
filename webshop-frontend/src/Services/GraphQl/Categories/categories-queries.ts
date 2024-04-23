import { gql } from "@apollo/client";

export const ALL_CATEGORIES = gql`
query getCategories {
    allCategories {
      items {
        category_Id
        category_Name
      }
    }
}
`

export const ALL_CATEGORIES_REPORT = (skip: number, take: number) => {
    return gql`
        query getCategoriesReport {
            allCategories(skip: ${skip}, take: ${take}) {
                items {
                    category_Id
                    category_Name
                    category_Icon
                    product {
                    product_Id
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                totalCount
            }
        }
    `
}