import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContainer from './components/Auth/AuthContainer';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthContainer />} />
        {/* Catch-all route to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
