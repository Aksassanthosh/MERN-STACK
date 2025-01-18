import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home'; // For viewing employees (Home page)
import AddEmployee from './components/AddEmployee'; // For adding new employees
import Navbar from './components/Navbar';
import Privateroutes from './components/Privateroutes';

function App() {
  return (
    <div>
      {/* Always display Navbar */}
      <Navbar />
      
      {/* Define Routes for the Application */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />  {/* Login Page */}
        <Route path="/signup" element={<Signup />} />  {/* Signup Page */}

        {/* Private Routes (For authenticated users) */}
        <Route element={<Privateroutes />}>
          {/* Home page, accessible to all logged-in users */}
          <Route path="/home" element={<Home />} />  
          {/* Add employee page (only for admins) */}
          <Route path="/add-employee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
