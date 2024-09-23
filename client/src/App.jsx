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
  const httpLink = createUploadLink({
    uri: 'http://localhost:3001/graphql',
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
          <Route path="/customerInfo" element = {<CustomerInfo formData ={formData} setFormData = {setFormData}/>} />
          <Route path="/customerPics" element = {<CustomerPics formData ={formData} setFormData = {setFormData}/>} />
          <Route path='/summary' element={<Summary formData={formData}/>}/>
        </Routes>
      </ApolloProvider>
    </div>
  )
}

export default App
