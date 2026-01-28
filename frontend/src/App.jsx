import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Loader from './components/Loader.jsx';
import Home from './pages/Home.jsx';
import History from './pages/History.jsx';
import Rooms from './pages/Rooms.jsx';
import Services from './pages/Services.jsx';
import Restaurant from './pages/Restaurant.jsx';
import Reservations from './pages/Reservations.jsx';
import Contact from './pages/Contact.jsx';

// Base path for deployment with proxy
const basePath = '/hotel-sanmiguel';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load, then hide loader
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <MainLayout>
        <Routes>
          <Route path={`${basePath}/`} element={<Home />} />
          <Route path={`${basePath}/historia`} element={<History />} />
          <Route path={`${basePath}/habitaciones`} element={<Rooms />} />
          <Route path={`${basePath}/servicios`} element={<Services />} />
          <Route path={`${basePath}/restaurante`} element={<Restaurant />} />
          <Route path={`${basePath}/reservaciones`} element={<Reservations />} />
          <Route path={`${basePath}/contacto`} element={<Contact />} />
        </Routes>
      </MainLayout>
    </>
  );
}
