import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckoutForm from './CheckoutForm'; // CheckoutForm component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </Router>
  );
}

export default App;
