/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import { TablePaginationActions } from '../../Components/Table/TablePaginationActions'
import { Box, Chip, TableHead, Toolbar, Typography } from '@mui/material'
import MIcon from '../../Components/IconUi'
import { useCategoriesReportLazy } from '../../Services/GraphQl/Categories/categories-hooks'
import { CategoryBodyProps } from '../../Interfaces/CategoryBodyProps'

export default function CategoriesTable(props: any | null) {
    
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState([] as CategoryBodyProps[])
  const [total, setTotal] = useState(0)

  console.log(props)

  const [getCategories, result] = useCategoriesReportLazy(rowsPerPage * page, rowsPerPage)

  const refetchCategories = () => {
    getCategories()
  }

  useEffect( () => {

    const newRows: CategoryBodyProps[] = props.data.items.map( (cat: any) => {
      return ({
        id: cat.category_Id,
        name: cat.category_Name,
        icon: cat.category_Icon,
        productsTotal: cat.product.length
      })
    })

    setRows(newRows)
    setTotal(props.data.totalCount)

  }, [props])

  useEffect( () => {

    if (result.data) {

      console.log(result.data)

      const newRows: CategoryBodyProps[] = result.data.allCategories.items.map( (cat: any) => {
        return ({
          id: cat.category_Id,
          name: cat.category_Name,
          icon: cat.category_Icon,
          productsTotal: cat.product.length
        })
      })

      setRows(rows.concat(newRows))
      console.log(newRows)
    }

  }, [result])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
    refetchCategories()
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    refetchCategories()
  }

  return (

    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            Categories
          </Typography>
      </Toolbar>

      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">

        <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Associated&nbsp;Products</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>

                <TableCell align="center">
                  {row.id}
                </TableCell>
                
                <TableCell align="center">
                  {row.name}
                </TableCell>

                <TableCell align="center">
                  {<MIcon name={row.icon} sx={{ mr: 0.5 }}/>}
                </TableCell>
                
                <TableCell align="center">
                  {row.productsTotal == 0 ?
                    <Chip label={row.productsTotal} color="error" />
                    : row.productsTotal! > 0 && row.productsTotal! <= 20 ?
                      <Chip label={row.productsTotal} color="warning" />
                      : row.productsTotal! > 20 && row.productsTotal! <= 30 ?
                        <Chip label={row.productsTotal} color="primary" />
                        : <Chip label={row.productsTotal} color="success" />
                  }
                </TableCell>

              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                colSpan={3}
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      </Paper>
    </Box>
  )
}