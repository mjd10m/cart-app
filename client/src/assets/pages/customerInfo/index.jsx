import React, { useEffect, useState } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as yup from 'yup'
import * as formik from 'formik'
import { customAlphabet } from 'nanoid'
import Topbar from '../../components/topbar'
import {plateOptions, passengerOptions} from "../../../state/dropdownOptions"
import { useNavigate } from 'react-router-dom'
import IntakeFormGroup from '../../components/intake-form-group';
import { capitalizeWords } from '../../../utils/helper';
import { calcPrice } from '../../../utils/helper';

function CustomerInfo({formData, setFormData, totalPrice, setTotalPrice }) {
  const {Formik} = formik
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    dob: yup.date().required('Required'),
    addr1: yup.string().required('Required'),
    addr2: yup.string(),
    city: yup.string().required('Required'),
    state: yup.string().required('Required'),
    zip: yup.string().required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    phone: yup.string().required('Required'),
    cartSize: yup.string().required('Required'),
    cartColor: yup.string().required('Required'),
    plate: yup.string().required('Required'),
    plateNum: yup.string().when('plate', {
      is: (plate) => {return plate == 'plateTransfer' || plate == 'custPlate'},
      then: () => yup.string().required('Required'),
      otherwise: () => yup.string().notRequired(),
    }),
    plateType: yup.string().when('plate', {
      is: (plate) => {return plate === 'specPlate' || plate === 'custPlate'},
      then:() => yup.string().required('Required'),
      otherwise:() => yup.string().notRequired(),
    })
  })
  const navigate = useNavigate()
  const nanoid = customAlphabet('1234567890', 10)
  const handleSubmit = async (values) => {
    const id = nanoid()
    await setFormData({
      ...formData, 
      ...values, 
      firstName:capitalizeWords(values.firstName), 
      lastName:capitalizeWords(values.lastName), 
      addr1:capitalizeWords(values.addr1),
      addr2:capitalizeWords(values.addr2),
      city:capitalizeWords(values.city), 
      cartColor:capitalizeWords(values.cartColor), 
      transactionId:id,
      status:'New'
    })
    navigate('/customerPics')
  }
  useEffect(() => {
    console.log('formData updated:', formData);
  }, [formData]);
  useEffect(() => {
    setTotalPrice('828.35');
  }, [setTotalPrice]);
    
  return(
    <Container fluid style={{ padding: 0, margin: 0 }}>
      <Topbar totalPrice = {totalPrice}/>
      <Container>
      <Row className="mb-4 text-center">
        <Col xs={12}>
          <h2 className="mb-3">Please complete the form below</h2>
          <p className="lead mb-2">
            Looking for a specialty Florida plate for your cart?{' '}
            <a href="https://www.flhsmv.gov/pdf/specialtyplates/tagbrochure.pdf" target="_blank" rel="noopener noreferrer">
              Browse all available options here
            </a>
          </p>
          <p className="lead mb-0">
            Considering a customized Florida plate?{' '}
            <a href="https://services.flhsmv.gov/MVCheckPersonalPlate/" target="_blank" rel="noopener noreferrer">
                Check availability
            </a>
          </p>
        </Col>
      </Row>
      <Formik validationSchema={validationSchema} onSubmit={handleSubmit} initialValues={{...formData}}>
      {({handleSubmit, handleChange, values, touched, errors  }) => (
        <Form noValidate onSubmit={handleSubmit} className='p-3'>
          <Row className="mb-3">
            <IntakeFormGroup label={"First Name"} type="text" xs={12} md={4} controlId="firstName" name="firstName" value={values.firstName} onChange={handleChange} isInvalid={touched.firstName && !!errors.firstName} errorMessage={errors.firstName}/>
            <IntakeFormGroup label={"Last Name"} type="text" xs={12} md={4} controlId="lastName" name="lastName" value={values.lastName} onChange={handleChange} isInvalid={touched.lastName && !!errors.lastName} errorMessage={errors.lastName}/>
            <IntakeFormGroup label={"Date of Birth"} type="date" xs={12} md={4} controlId="dob" name="dob" value={values.dob} onChange={handleChange} isInvalid={touched.dob && !!errors.dob} errorMessage={errors.dob}/>
          </Row>
          <Row>
            <IntakeFormGroup label={"Address Line 1"} type="text" xs={12} md={7} controlId="address1" name="addr1" value={values.addr1} onChange={handleChange} isInvalid={touched.addr1 && !!errors.addr1} errorMessage={errors.addr1}/>
            <IntakeFormGroup label={"Address Line 2"} type="text" xs={12} md={5} controlId="address2" name="addr2" value={values.addr2} onChange={handleChange} isInvalid={touched.addr1 && !!errors.addr1} errorMessage={errors.addr1}/>
          </Row>    
          <Row className="mb-3">
            <IntakeFormGroup label={"City"} type="text" xs={12} md={7} controlId="city" name="city" value={values.city} onChange={handleChange} isInvalid={touched.city && !!errors.city} errorMessage={errors.city}/>
            <IntakeFormGroup label={"State"} type="text" xs={12} md={2} controlId="state" name="state" value={values.state} onChange={handleChange} isInvalid={touched.state && !!errors.state} errorMessage={errors.state}/>
            <IntakeFormGroup label={"Zipcode"} type="text" xs={12} md={3} controlId="zip" name="zip" value={values.zip} onChange={handleChange} isInvalid={touched.zip && !!errors.zip} errorMessage={errors.zip}/>
          </Row>
          <Row className="mb-3">
            <IntakeFormGroup label={"Email"} type="email" xs={12} md={9} controlId="email" name="email" value={values.email} onChange={handleChange} isInvalid={touched.email && !!errors.email} errorMessage={errors.email}/>
            <IntakeFormGroup label={"Phone Number"} type="phone" xs={12} md={3} controlId="phone" name="phone" value={values.phone} onChange={handleChange} isInvalid={touched.phone && !!errors.phone} errorMessage={errors.phone}/>
          </Row>
          <Row className="mb-3">
            <IntakeFormGroup label={"Number of Passengers"} type="text" xs={12} md={4} controlId="cartSize" name="cartSize" value={values.cartSize} onChange={handleChange} isInvalid={touched.cartSize && !!errors.cartSize} errorMessage={errors.cartSize} dropdown={true} dropdownData={passengerOptions}/>
            <IntakeFormGroup label={"Cart Color"} type="text" xs={12} md={2} controlId="cartColor" name="cartColor" value={values.cartColor} onChange={handleChange} isInvalid={touched.cartColor && !!errors.cartColor} errorMessage={errors.cartColor}/>
            <IntakeFormGroup label={"Plate Options"} type="text" xs={12} md={6} controlId="plate" name="plate" value={values.plate} onChange={(e)=> {calcPrice(e.target.value,'indv',setTotalPrice); handleChange(e)}} isInvalid={touched.plate && !!errors.plate} errorMessage={errors.plate} dropdown={true} dropdownData={plateOptions}/>
          </Row>
          {values.plate === "plateTransfer" ?(
            <Row className="mb-3 justify-content-center">
              <IntakeFormGroup label={"Plate Number"} type="text" xs={12} md={4} controlId="plateNum" name="plateNum" value={values.plateNum} onChange={handleChange} isInvalid={touched.plateNum && !!errors.plateNum} errorMessage={errors.plateNum}/>
            </Row>
          ): null }
          {values.plate === "specPlate" ?(
            <Row className="mb-3 justify-content-center">
              <IntakeFormGroup label={"Plate Type"} type="text" xs={12} md={4} controlId="plateType" name="plateType" value={values.plateType} onChange={handleChange} isInvalid={touched.plateType && !!errors.plateType} errorMessage={errors.plateType}/>
            </Row>
          ): null }
          {values.plate === "perPlate" ?(
            <Row className="mb-3 justify-content-center">
              <IntakeFormGroup label={"Plate Number"} type="text" xs={12} md={4} controlId="plateNum" name="plateNum" value={values.plateNum} onChange={handleChange} isInvalid={touched.plateNum && !!errors.plateNum} errorMessage={errors.plateNum}/>
            </Row>
          ): null }
          {values.plate === "perSpecPlate" ?(
            <Row className="mb-3 justify-content-center">
              <IntakeFormGroup label={"Plate Number"} type="text" xs={12} md={4} controlId="plateNum" name="plateNum" value={values.plateNum} onChange={handleChange} isInvalid={touched.plateNum && !!errors.plateNum} errorMessage={errors.plateNum}/>
              <IntakeFormGroup label={"Plate Type"} type="text" xs={12} md={4} controlId="plateType" name="plateType" value={values.plateType} onChange={handleChange} isInvalid={touched.plateType && !!errors.plateType} errorMessage={errors.plateType}/>
            </Row>
          ): null }
          <Row className="justify-content-center mb-3">
            <Col xs="2" className='text-center'>
              <Button className='button w-100' type="submit">
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      </Formik>
      </Container>
      <div style={{ height: '50px' }}></div> {/* Spacer */}
    </Container>
  )
}

export default CustomerInfo