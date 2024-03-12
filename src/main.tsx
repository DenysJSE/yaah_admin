import App from './App.tsx';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HideSidebarProvider } from './context/HideSidebarContext.tsx';
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HideSidebarProvider>
      <App />
      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </HideSidebarProvider>
  </Provider>
);
