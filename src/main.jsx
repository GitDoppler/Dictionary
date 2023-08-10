import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Main from "./components/Main.jsx";
import Index from "./components/Index.jsx";
import Error from "./components/Error.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { wordLoader } from "../src/exports/loaders.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "/:wordID",
                element: <Main />,
                loader: wordLoader,
                errorElement: <Error />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
