// components
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

// styles
import {
  tablePaperStyle,
  tableThStyle,
  tableTdsStyle
} from '../DataTable/DataTable.styled'
import { StudentTableRows } from '@/types/students/table-types'

// hooks
import { useState } from 'react'

const TABLE_HEADERS = [
  { label: 'Name' },
  { label: 'Email' },
  { label: 'WhatsApp Number', align: 'center' },
  { label: 'Status', align: 'center' },
  { label: 'Courses', align: 'center' },
  { label: 'Testimonials', align: 'center' }
]

const rows: StudentTableRows[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'fake@email.com',
    whatsapp: '1234567890',
    status: 'Certificate sent',
    courses: 2,
    testimonials: ['test1', 'test2']
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'FAKE@dd.com',
    whatsapp: '1234567890',
    status: 'In progress',
    courses: 10,
    testimonials: ['test1', 'test2']
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@test.com',
    whatsapp: '1234567890',
    status: 'Cancelled',
    courses: 2,
    testimonials: ['test1', 'test2']
  }
]

export default function StudentsTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  return (
    <Grid container direction="row" sx={{ mt: '20px' }}>
      <Grid item xs={12}>
        <Paper sx={tablePaperStyle}>
          <TableContainer sx={{ maxHeight: 690, minHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {TABLE_HEADERS.map((header) => (
                    <TableCell
                      key={header.label}
                      align={header.align as any}
                      sx={tableThStyle}
                    >
                      {header.label}
                    </TableCell>
                  ))}
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
                        <TableCell sx={tableTdsStyle}>{row.name}</TableCell>
                        <TableCell sx={tableTdsStyle}>{row.email}</TableCell>
                        <TableCell sx={tableTdsStyle} align="center">
                          <a href={`whatsapp://send?phone=${row.whatsapp}`}>
                            {row.whatsapp}
                          </a>
                        </TableCell>
                        <TableCell sx={tableTdsStyle} align="center">
                          {row.status}
                        </TableCell>
                        <TableCell sx={tableTdsStyle} align="center">
                          {row.courses}
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(+event.target.value)
              setPage(0)
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}
