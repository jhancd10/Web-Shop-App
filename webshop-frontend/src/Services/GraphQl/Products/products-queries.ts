import { gql } from "@apollo/client"

const getWhereCondition = (categoryId: number | null, price: number | null) => {

    let whereCondition: string = ')'

    if (categoryId || price) {

        whereCondition = ', where: { '

        const categoryCondition: string = `category: { some: { category_Id: { eq: ${categoryId} } } } }`
        const priceCondition: string = `price: { gte: ${price} } }`
        
        if (categoryId && price) whereCondition += `and: [ { ${categoryCondition}, { ${priceCondition} ] } )`

        else {
            whereCondition += categoryId ? categoryCondition : ''
            whereCondition += price ? priceCondition : ''
            whereCondition += ' ) '
        }
    }

    return whereCondition
}

export const ALL_PRODUCTS = () => gql`
query getProducts {
    allProductsTotal {
      product_Id
      product_Code
      title
      description
      price
      available_Stock
    }
}
`

export const ALL_PRODUCTS_FILTER = 
(skip: number, take: number, categoryId: number | null, price: number | null) => gql`

query getProductsFilter {
    allProducts(
    skip: ${skip}, 
    take: ${take}
    ${getWhereCondition(categoryId, price)} {
        items {
            product_Id
            product_Code
            title
            description
            price
            available_Stock
            category {
                category_Name
                category_Icon
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