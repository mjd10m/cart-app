import React from 'react'
import {Col, Form} from 'react-bootstrap'

function CartPicInput({id, label, multi, handleFileChange}) {
  return (
    <Form.Group as={Col} xs={12} md={6} controlId = {id} >
      <Form.Label>{label}</Form.Label>
      <Form.Control type="file" name={id} onChange={handleFileChange} multiple = {multi}/>
    </Form.Group>
  )
}

export default CartPicInput
