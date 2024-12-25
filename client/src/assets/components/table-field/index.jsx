import React from 'react'
import {convertDate} from '../../../utils/helper'
import { TableCell } from '@mui/material'

function TableField({customerData, id}) {
  return (
    <TableCell id={id}>{id === "dob" || id === "createdAt" ? convertDate(customerData[id]):customerData[id]}</TableCell>
  )
}

export default TableField
