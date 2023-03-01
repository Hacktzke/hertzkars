import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import ThemeContextProvider from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import AllVehiclesPage from './pages/AllVehiclesPage';
import Register from './pages/Register';
import Login from './pages/Login';
import NewVehicle from './pages/NewVehicle';
import VehiclePage from './pages/VehiclePage';
import EditVehiclePage from './pages/EditVehiclePage';

import UserPage from './pages/UserPage';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path={'/'} element={<Homepage />} />
              <Route path={'/vehicles'} element={<AllVehiclesPage />} />
              <Route path={'/vehicles/:id'} element={<VehiclePage />} />
              <Route
                path={'/vehicles/:id/edit'}
                element={<EditVehiclePage />}
              />
              <Route path={'/vehicles/new'} element={<NewVehicle />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/register'} element={<Register />} />
              <Route path={`/users/:id`} element={<UserPage />} />
              <Route path={`/users/:id/edit`} element={<EditUser />} />
            </Routes>
          </BrowserRouter>
        </ThemeContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
