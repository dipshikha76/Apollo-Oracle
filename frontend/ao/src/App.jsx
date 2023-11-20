// import './App.css'
// import LP from './lp/LP'
// import LS from './logsig/LS'
// import Sign from './sign/Sign'
import Home from './home/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'


const App = () => {
  const [user, setUser] = useState([]);;
  const getData = (data) => {
    setUser(data);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="logsig" element={<LS onSubmit={getData} />} /> */}
        {/* <Route path="sign" element={<Sign />} /> */}
        {/* <Route path="home" element={<Home {...user} />} />  */}
      </Routes>
    </BrowserRouter>
  );
}
export default App 
