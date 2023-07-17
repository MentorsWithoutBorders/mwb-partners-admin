import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { OutlinedInput } from '@mui/material'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { SxProps, Theme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import * as React from 'react'

import InfoIcon from '../../../public/info-details.svg'

import { SearchFilterField } from './SearchFilterField'

import { Column } from '@/components/table/interfaces'
import { OrderType } from '@/components/table/interfaces'
import { APIListResponse } from '@/components/table/interfaces'

const FilterButton = styled(Button)(({ theme }) => ({
  height: 32,
  //   fontSize: 10,
  border: '1px solid',
  borderRadius: 10,
  borderColor: '#0046cf',
  backgroundColor: '#0046cf'
}))

const FilterOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: 10,
  fontWeight: 400,
  height: 32,
  // minWidth: 156,
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#6e6b6b',
  left: 0,
  top: 0,
  fontSize: 16,
  margin: 6,
  padding: 10,
  fieldset: { padding: 0, margin: 0 }
}))

const tablePaperStyle: SxProps<Theme> = {
  borderRadius: 6,
  borderColor: '#a29898',
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 16,
  width: '100%',
  overflow: 'hidden'
}

const labelStyle: SxProps<Theme> = {
  color: 'text.primary',
  fontWeight: 400,
  fontSize: 14,
  mb: 1
}

const tableThStyle: SxProps<Theme> = {
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: 'solid',
  borderColor: '#a29898'
}

const tableTdsStyle: SxProps<Theme> = {
  borderWidth: 0,
  fontSize: 16
}

interface DataTableProps {
  openModal: (id: number) => void
  fetchData: (
    page: number,
    rowsPerPage: number,
    order: OrderType,
    orderBy: string | undefined,
    searchText: string | undefined,
    searchBy: string | undefined,
    fromDate: string | undefined,
    toDate: string | undefined
  ) => APIListResponse
  columns: readonly Column[]
}

const filterValues = [
  'By name',
  'By email',
  'By student name',
  'By student organization'
]

export default function DataTable(props: DataTableProps) {
  const { openModal, fetchData, columns } = props
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [order, setOrder] = React.useState<OrderType>('asc')
  const [orderBy, setOrderBy] = React.useState<string>()
  const [searchText, setSearchText] = React.useState<string>()
  const [searchBy, setSearchBy] = React.useState<string>('')
  const [rows, setRows] = React.useState<any[]>([])
  const [dataCount, setDataCount] = React.useState(0)
  const [fromDate, setFromDate] = React.useState<string>()
  const [toDate, setToDate] = React.useState<string>()

  React.useEffect(() => {
    const response = fetchData(
      page,
      rowsPerPage,
      order,
      orderBy,
      searchText,
      searchBy,
      fromDate,
      toDate
    )
    setRows(response.results)
    setDataCount(response.count)
  }, [
    fetchData,
    order,
    orderBy,
    page,
    rowsPerPage,
    searchText,
    searchBy,
    fromDate,
    toDate
  ])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const onRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  const onInfoClick = (id: number) => {
    console.log(id)
    openModal(id)
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={6}>
          <SearchFilterField
            setSearchText={setSearchText}
            setSearchBy={setSearchBy}
            filterValues={filterValues}
            searchBy={searchBy}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <FilterOutlinedInput
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFromDate(event.target.value)
                    }
                  />
                }
                label="From"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <FilterOutlinedInput
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setToDate(event.target.value)
                    }
                  />
                }
                label="To"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={4}>
              <FilterButton variant="contained">Download CSV</FilterButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item xs={12}>
          <Paper sx={tablePaperStyle}>
            <TableContainer sx={{ maxHeight: 690, minHeight: 400 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={tableThStyle}
                        sortDirection={orderBy === column.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={createSortHandler(column.id)}
                        >
                          {column.label}
                          {orderBy === column.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === 'desc'
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell sx={tableThStyle}>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id]
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={tableTdsStyle}
                              >
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            )
                          })}
                          <TableCell sx={tableTdsStyle} align="center">
                            <InfoIcon onClick={() => onInfoClick(row.id)} />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={dataCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}
