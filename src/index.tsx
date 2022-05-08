import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes, Navigate,Outlet } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Product from './pages/Product';
import './index.css';
import { StyledEngineProvider } from '@mui/material';
import store from './reducers';
import { Provider } from 'react-redux';
import AddProduct from './pages/Product/addProduct';
import EditProduct from './pages/Product/editProduct';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const ProtectedRoute = () => {
if(!localStorage.getItem('accessToken'))
    return <Navigate to="/login" replace />;

return <Outlet/>
};


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Product />} />
              <Route path="/add*" element={<AddProduct />} />
              <Route path="/edit/:sku*" element={<EditProduct />} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
