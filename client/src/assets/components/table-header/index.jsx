import React from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'

function TableHeader() {
  return (
    <TableHead>
        <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Address 1</TableCell>
            <TableCell>Address 2</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Zip</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell># Passengers</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Plate Option</TableCell>
            <TableCell>Plate Type</TableCell>
            <TableCell>Plate Num</TableCell>
            <TableCell>Dealership Name</TableCell>
            <TableCell>Submitted Date</TableCell>
            <TableCell></TableCell>
        </TableRow>
    </TableHead>
  )
}

export default TableHeader