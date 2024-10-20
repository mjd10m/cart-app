import Homepage from './assets/pages/homepage'
import CustomerInfo from './assets/pages/customerInfo'
import CustomerPics from './assets/pages/cartPics'
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import defaultState from './state/defaultState.js'
import React, { useState } from 'react'
import Contact from './assets/pages/contact'
import Summary from './assets/pages/summary/index.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client'

function App() {
  const [formData, setFormData] = useState(defaultState)
  const [totalPrice, setTotalPrice] = useState('828.35')
  const httpLink = createUploadLink({
    uri: 'https://tag-my-cart-app.ue.r.appspot.com/graphql',
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
        </Routes>
      </ApolloProvider>
    </div>
  )
}

export default App
