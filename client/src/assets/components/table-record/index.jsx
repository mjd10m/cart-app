import React from 'react'
import TableField from '../table-field'
import {Container, Row, Col, Button, Form, Spinner, Table } from 'react-bootstrap';

function TableRecord({customerData, handleClick, index}) {
  return (
    <>
        <tr>
            <TableField customerData={customerData} id="transactionId"/>
            <TableField customerData={customerData} id='firstName'/>
            <TableField customerData={customerData} id='lastName'/>
            <TableField customerData={customerData} id='dob'/>
            <TableField customerData={customerData} id='addr1'/>
            <TableField customerData={customerData} id='addr2'/>
            <TableField customerData={customerData} id='city'/>
            <TableField customerData={customerData} id='state'/>
            <TableField customerData={customerData} id='zip'/>
            <TableField customerData={customerData} id='email'/>
            <TableField customerData={customerData} id='phone'/>
            <TableField customerData={customerData} id='cartSize'/>
            <TableField customerData={customerData} id='cartColor'/>
            <TableField customerData={customerData} id='plate'/>
            <TableField customerData={customerData} id='plateNum'/>
            <TableField customerData={customerData} id='plateType'/>
            <td style={{ background: 'none', border: 'none', padding: '0', margin: '0' }}>
                <Button id={index} onClick={handleClick}>Download</Button>
            </td>
        </tr>
    </>
  )
}

export default TableRecord
