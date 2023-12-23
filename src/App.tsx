import './assets/Global.css'
import {BrowserRouter, Routes} from 'react-router-dom'
import Sidebar from "./layouts/sidebar/Sidebar.tsx";
import Header from "./layouts/header/Header.tsx";

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <div className='app-sidebar'><Sidebar/></div>
        <div className='app-content'>
          <Header />
          <div className='app-page'>
            <Routes>

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
