import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <ToastContainer
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <App />
    </BrowserRouter>,
);
