import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
<ClerkProvider publishableKey={PUBLISHABLE_KEY}>

  <RouterProvider router={router}>

      {/* <App /> */}
  </RouterProvider>
</ClerkProvider>
  
);
