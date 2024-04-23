/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Toolbar, Typography, } from "@mui/material"
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions"
import { useEffect, useState } from "react"
import { format } from "date-fns"

export default function OrdersTable(props: any) {

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [rows, setRows] = useState([] as any[])

	useEffect(() => {

		setRows(props.data)

	}, [props])

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%" }}>
				<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
					<Typography
						sx={{ flex: "1 1 100%" }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						Orders
					</Typography>
				</Toolbar>

				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Id</TableCell>
								<TableCell align="center">Date</TableCell>
								<TableCell align="center">Customer</TableCell>
								<TableCell align="center">Total&nbsp;Value</TableCell>
								<TableCell align="center">Total&nbsp;Products</TableCell>
								<TableCell align="center">Total&nbsp;Items</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{(rowsPerPage > 0
								? rows.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								: rows
							).map((row) => (
								<TableRow key={row.order_Id}>
									<TableCell align="center">{row.order_Id}</TableCell>

									<TableCell align="center">{format(row.order_Date, 'yyyy/MM/dd kk:mm:ss')}</TableCell>

									<TableCell align="center">
										{row.customer.customer_Name}
									</TableCell>

									<TableCell align="center">$&nbsp;{row.order_Total}</TableCell>

									<TableCell align="center">
										{row.orderDetails.length}
									</TableCell>

									<TableCell align="center">
										{row.orderDetails.reduce(
											(sum: any, current: any) => sum + current.quantity,
											0
										)}
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
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									slotProps={{
										select: {
											inputProps: {
												"aria-label": "rows per page",
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
