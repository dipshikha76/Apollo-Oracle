import './App.css'
import LP from './lp/LP'
import LS from './logsig/LS'
import Sign from './sign/Sign'
import Home from './home/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LP />} />
        <Route path="logsig" element={<LS />} />
        <Route path="sign" element={<Sign />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
