import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Error: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h4 className="text-4xl mb-4">Page Not Found</h4>
            <Link
                to="/dashboard"
                className="text-white bg-secondary py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors duration-300 ease-in-out"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default Error;
