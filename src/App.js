import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Account from './pages/Account.jsx';
import SingleCatPage from './pages/SingleCatPage.jsx';
import MovieDetails from './pages/details/MovieDetails.jsx';
import { PageNotFound } from './pages/PageNotFound.jsx';
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedAuth from './components/ProtectedAuth.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/account' element={
          <ProtectedAuth>
            <Account />
          </ProtectedAuth>
        } />
        <Route path='/:catName' element={<SingleCatPage />} />
        <Route path=':catName/:id' element={
          <ProtectedAuth>
            <MovieDetails />
          </ProtectedAuth>
        }/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </AuthContextProvider>
    </>
  );
}

export default App;
