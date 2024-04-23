export interface Category {
    name: string
    icon: string
}

export interface Product {
    productId: number
    productCode: string
    title: string
    description: string
    price: number
    availableStock: number
    categories: Category[]
}