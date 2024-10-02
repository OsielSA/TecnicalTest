import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TiHome } from "react-icons/ti";
import { TfiAgenda } from "react-icons/tfi";
import EmployeesPage from "./pages/EmployeesPage";
import CatalogsPage from "./pages/CatalogsPage";
import SaveEmployeePage from './pages/SaveEmployeePage';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showCatalogsPage, setShowCatalogsPage] = useState(false);
  const navigate = useNavigate(); 

  const handleShowEmployees = () => {
    navigate('/');
    setShowCatalogsPage(false);
  };

  const handleShowCatalogs = () => {
    navigate('/catalogs');
    setShowCatalogsPage(true);
  };

  return (
    <div className="bg-gray-200 h-screen">
      <nav className="navbar fixed top-0 w-full p-2 z-10 shadow-lg bg-sky-950">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <div>
            <button className='text-2xl text-neutral-50 text-justify mt-1 pl-3' onClick={handleShowEmployees}>
              <TiHome />
            </button>
          </div>
          <div className='text-lg text-neutral-50 sm:mr-3'>
            <h2>Prueba Técnica</h2>
          </div>
          <ul className="flex space-x-4">
            <li className="flex justify-center">
              <div className="relative group">
                <button className="text-lg text-neutral-50 mr-3" onClick={handleShowCatalogs}>
                  <TfiAgenda />
                </button>
                <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  Catálogos
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className='mt-[60px]'>
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/catalogs" element={<CatalogsPage />} />
          <Route path="/employee" element={<SaveEmployeePage />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
