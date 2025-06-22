import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Homepage from './pages/Homepage';


function App() {

  return (
     <Router>
      <Routes>
        <Route path="" element={<Homepage></Homepage>} />
      </Routes>
    </Router>
  )
}

export default App
