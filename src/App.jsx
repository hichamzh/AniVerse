import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
// import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/categorie" element={<></>} />
        <Route path="/favoris" element={ <></>} />
        <Route path="/contact" element={<></>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;


