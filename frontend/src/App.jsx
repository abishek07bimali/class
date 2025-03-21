import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Homepage from './pages/Homepage';
import LoginForm from './pages/login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="" element={<Homepage></Homepage>} />
        <Route path="/login" element={<LoginForm></LoginForm>} />
      </Routes>
    </Router>
  )
}

export default App
