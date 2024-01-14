import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HideSidebarProvider } from './context/HideSidebarContext.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HideSidebarProvider>
      <App />
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </HideSidebarProvider>
  </React.StrictMode>
);
