import Homepage from './assets/pages/homepage'
import CustomerInfo from './assets/pages/customerInfo'
import CustomerPics from './assets/pages/cartPics'
import {Routes, Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import defaultState from './state/defaultState.js'
import React, { useState } from 'react'
import Contact from './assets/pages/contact'
import Summary from './assets/pages/summary/index.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client'
import AdminPage from './assets/pages/admin/index.jsx'
import Login from './assets/pages/login/index.jsx'
import Signup from './assets/pages/signup/index.jsx'
import Auth from './utils/auth.js'

function App() {
  const [formData, setFormData] = useState(defaultState)
  const [totalPrice, setTotalPrice] = useState('828.35')
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
          <Route path="/customerInfo" element = {<CustomerInfo formData ={formData} setFormData = {setFormData} totalPrice = {totalPrice} setTotalPrice = {setTotalPrice}/>} />
          <Route path="/customerPics" element = {<CustomerPics formData ={formData} totalPrice = {totalPrice}/>} />
          <Route path='/summary' element={<Summary formData={formData}/>}/>
          <Route path='/admin' element={Auth.loggedIn() ?(<AdminPage/>):(<Navigate to="/adminlogin" />)}></Route>
          <Route path='/adminlogin' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </ApolloProvider>
    </div>
  )
}

export default App
