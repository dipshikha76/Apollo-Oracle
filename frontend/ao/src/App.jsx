import './index.css'
import LP from './components/lp/LP'
import LS from "./components/logsig/LS";
import Sign from "./components/sign/Sign";
import Home from "./components/home/home";
import Quiz from './components/quiz/Quiz';
import Result from './components/result/Result';
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
        <Route path="/" element={<LP />} />
        <Route path="/logsig" element={<LS onSubmit={getData} />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/quiz" element={<Quiz {...user} />} />
        <Route path="/result" element={<Result {...user} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App 
