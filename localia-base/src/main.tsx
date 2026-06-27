
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "flowbite";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        
            <RouterProvider router={router} />
       <Toaster richColors position="top-center" />
    </StrictMode>,
);