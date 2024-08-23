import Homepage from './assets/pages/homepage'
import CustomerInfo from './assets/pages/customerInfo'
import CustomerPics from './assets/pages/cartPics'
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import defaultState from './state/defaultState.js'
import React, { useState } from 'react'

function App() {
  const [formData, setFormData] = useState(defaultState)

  return (
    <div>
      <Routes>
        <Route path="/" element = {<Homepage/>} />
        <Route path="/customerInfo" element = {<CustomerInfo formData ={formData} setFormData = {setFormData}/>} />
        <Route path="/customerPics" element = {<CustomerPics formData ={formData} setFormData = {setFormData}/>} />
      </Routes>
    </div>
  )
}

export default App
