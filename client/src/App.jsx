import React, { useState } from 'react'
import {Routes, Route, Navigate, Outlet} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Homepage from './assets/pages/homepage'
import CustomerInfo from './assets/pages/customerInfo'
import CustomerPics from './assets/pages/cartPics'
import AdminPage from './assets/pages/admin/index.jsx'
import Login from './assets/pages/login/index.jsx'
import Signup from './assets/pages/signup/index.jsx'
import Contact from './assets/pages/contact'
import Summary from './assets/pages/summary/index.jsx'
import FormSelection from './assets/pages/formSelection/index.jsx'
import DealerCustomer from './assets/pages/dealerCustomer/index.jsx'
import defaultState from './state/defaultState.js'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client'
import Auth from './utils/auth.js'
import AdminCustomers from './assets/pages/admin/customers/index.jsx'
import AdminInvite from './assets/pages/admin/invite/index.jsx'


function App() {
  const [formData, setFormData] = useState(defaultState)
  const [totalPrice, setTotalPrice] = useState('')
  const httpLink = createUploadLink({
    //uri: 'https://tag-my-cart-app.ue.r.appspot.com/graphql',
    uri: 'http://localhost:3001/graphql'
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  return (
    <div>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element = {<Homepage/>} />
          <Route path="/contact" element = {<Contact/>} />
          <Route path="/customerinfo" element = {<CustomerInfo formData ={formData} setFormData = {setFormData} totalPrice = {totalPrice} setTotalPrice = {setTotalPrice}/>} />
          <Route path="/customerpics" element = {<CustomerPics formData ={formData} totalPrice = {totalPrice}/>} />
          <Route path='/summary' element={<Summary formData={formData}/>}/>
          <Route path='/admin' element={Auth.loggedIn() ?(<Outlet/>):(<Navigate to="/adminlogin" />)}>
            <Route path='' element={<AdminPage/>}></Route>
            <Route path='customers' element={<AdminCustomers/>} />
            <Route path='invite' element={<AdminInvite/>}/>
          </Route>
          <Route path='/adminlogin' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/intakeselection' element={<FormSelection/>}></Route>
          <Route path="/dealer/customerinfo" element = {<DealerCustomer formData ={formData} setFormData = {setFormData} totalPrice = {totalPrice} setTotalPrice = {setTotalPrice}/>} />
        </Routes>
      </ApolloProvider>
    </div>
  )
}

export default App
