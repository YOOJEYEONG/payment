import './App.css';
import {Routes, Route} from 'react-router-dom'

import PaymentRequest from "./pages/PaymentResquest";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentResult from "./pages/PaymentResult";

import {Container, CssBaseline} from "@mui/material";


function App() {
  return (
    <div>
        <CssBaseline />
        <Container maxWidth="sm">
            <Routes>
                <Route path='/' element={<PaymentRequest />} />
                <Route path='/cancel' element={<PaymentCancel />} />
                <Route path='/result' element={<PaymentResult />} />
            </Routes>
        </Container>
    </div>
  );
}

export default App;
