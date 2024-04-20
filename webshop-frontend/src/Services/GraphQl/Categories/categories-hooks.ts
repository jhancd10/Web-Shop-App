import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_CATEGORIES, ALL_CATEGORIES_REPORT } from "./categories-queries"

export const useCategories = () => {
    const result = useQuery(ALL_CATEGORIES)
    return result
}

export const useCategoriesReport = (skip: number, take: number) => {
    const result = useQuery(ALL_CATEGORIES_REPORT(skip, take))
    return result
}

export const useCategoriesReportLazy = (skip: number, take: number) => {
    const result = useLazyQuery(ALL_CATEGORIES_REPORT(skip, take))
    return result
}