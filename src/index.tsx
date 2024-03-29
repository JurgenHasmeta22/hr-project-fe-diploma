import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const container = document.getElementById("root");

if (container) {
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
}
