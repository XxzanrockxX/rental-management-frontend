import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NewContract from './pages/NewContract';
import Archives from './pages/Archives';
import Vehicles from './pages/Vehicles';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contrato" element={<NewContract />} />
      <Route path="/archivos" element={<Archives />} />
      <Route path="/vehiculos" element={<Vehicles />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
