import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="950320349366-m5h26n58guha44p1d0ri8ijkjdp31g7v.apps.googleusercontent.com">
        <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
    </GoogleOAuthProvider>
);
