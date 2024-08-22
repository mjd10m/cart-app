import Homepage from './assets/pages/homepage'
import CustomerInfo from './assets/pages/customerInfo'
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element = {<Homepage/>} />
        <Route path="/customerInfo" element = {<CustomerInfo/>} />
      </Routes>
    </div>
  )
}

export default App
