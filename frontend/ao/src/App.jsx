import './App.css'
import LP from './lp/LP'
import LS from './logsig/LS'
import Sign from './sign/Sign'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LP />} />
        <Route path="logsig" element={<LS />} />
        <Route path="sign" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
