import './App.css';
import { Department } from './components/Department.tsx';
import { Home } from './components/Home.tsx';
import {Employee} from './components/Employee.tsx';
import {Routes, Route, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="department" element={<Department/>}></Route>
        <Route path="employee" element={<Employee/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
