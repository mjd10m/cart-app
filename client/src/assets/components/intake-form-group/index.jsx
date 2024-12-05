import React from 'react'
import { Form, Col } from 'react-bootstrap';

function IntakeFormGroup({label, name, value, onChange, isInvalid, errorMessage, type, controlId, md, xs, dropdown, dropdownData}) {
  return (
    <Form.Group as={Col} xs={xs} md={md} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      {dropdown ? (
        <Form.Select type={type} name={name} value = {value} onChange={onChange} isInvalid={isInvalid}>
          {dropdownData.map((item, index) => {
            return(<option key={item.option + index} value={item.value}>{item.option}</option>)
          })}
        </Form.Select>
      ):(
        <Form.Control type={type} name={name} value = {value} onChange={onChange} isInvalid={isInvalid}/>
      )}
      <Form.Control.Feedback type='invalid'>{errorMessage}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default IntakeFormGroup
