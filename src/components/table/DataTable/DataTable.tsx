import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
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
import { useEffect, useState } from 'react'

import InfoIcon from '~/info-details.svg'

import { FilterButton } from '../FilterButton/FilterButton.styled'
import { FilterOutlinedInput } from '../FilterButton/FilterOutlinedInput.styled'
import { SearchFilterField } from '../FilterButton/SearchFilterField'

import { Column } from '@/components/Table/interfaces'
import { OrderType } from '@/components/Table/interfaces'
import { APIListResponse } from '@/components/Table/interfaces'
import {
  tablePaperStyle,
  tableTdsStyle,
  tableThStyle
} from './DataTable.styled'

interface DataTableProps {
  openModal: (id: number) => void
  downloadData: () => void
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
  filterValues: string[]
}

export default function DataTable(props: DataTableProps) {
  const { openModal, downloadData, fetchData, columns, filterValues } = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState<OrderType>('asc')
  const [orderBy, setOrderBy] = useState<string>()
  const [searchText, setSearchText] = useState<string>()
  const [searchBy, setSearchBy] = useState<string>('')
  const [rows, setRows] = useState<any[]>([])
  const [dataCount, setDataCount] = useState(0)
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()

  useEffect(() => {
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
              <FilterButton variant="contained" onClick={downloadData}>
                Download CSV
              </FilterButton>
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
