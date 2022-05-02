import './App.css';
import FormsPage from './pages/FormsPage';
import PaymentPage from './pages/PaymentPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './Context/Context'

function App() {

  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<FormsPage />}/>
            <Route path='/paymentPage' element={<PaymentPage />}/>
          </Routes>    
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
