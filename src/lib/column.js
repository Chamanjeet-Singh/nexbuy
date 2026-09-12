import { Chip } from '@mui/material'
import dayjs from 'dayjs'

export const DT_CATEGORY_COLUMNS = [
    {
         accessorKey: 'name', //access nested data with dot notation
        header: 'Category Name',
    },
    {
         accessorKey: 'slug', //access nested data with dot notation
        header: 'Slug',
    },
]

export const DT_PRODUCT_COLUMNS = [
    {
         accessorKey: 'name', //access nested data with dot notation
        header: 'Product Name',
    },
    {
         accessorKey: 'slug', //access nested data with dot notation
        header: 'Slug',
    },
    {
        accessorKey: 'category', //access nested data with dot notation
        header: 'Category',
    },
    {
        accessorKey: 'mrp', //access nested data with dot notation
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice', //access nested data with dot notation
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage', //access nested data with dot notation
        header: 'Discount Percentage',
    },
    
]

export const DT_PRODUCT_VARIANT_COLUMNS = [
    {
         accessorKey: 'product', //access nested data with dot notation
        header: 'Product Name',
    },
    {
         accessorKey: 'color', //access nested data with dot notation
        header: 'Color',
    },
    {
         accessorKey: 'size', //access nested data with dot notation
        header: 'Size',
    },
    {
         accessorKey: 'sku', //access nested data with dot notation
        header: 'SKU',
    },
    {
        accessorKey: 'mrp', //access nested data with dot notation
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice', //access nested data with dot notation
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage', //access nested data with dot notation
        header: 'Discount Percentage',
    },
    
]

export const DT_COUPON_COLUMNS = [
    {
         accessorKey: 'code', //access nested data with dot notation
        header: 'Coupon Code',
    },
    {
         accessorKey: 'discountPercentage', //access nested data with dot notation
        header: 'Discount Percentage',
    },
    {
         accessorKey: 'minShoppingAmount', //access nested data with dot notation
        header: 'Minimum Shopping Amount',
    },
    {
         accessorKey: 'validity', //access nested data with dot notation
        header: 'Validity',
        Cell: ({renderedCellValue}) => {
           return  new Date() > new Date(dayjs(renderedCellValue).format("DD/MM/YYYY")) ? <Chip color="error" label={dayjs(renderedCellValue).format("DD/MM/YYYY")}/> :<Chip color="success" label={renderedCellValue}/>
        }
    }
]
       