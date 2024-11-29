import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/home';
import Login from './routes/Login/login';
// import Signup from './Components/Signup/signup';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
