import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Cgu from './pages/Cgu';
import { AnimeDetails } from './components/layouts/AnimeDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorie" element={<></>} />
        <Route path="/favoris" element={ <></>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="/anime/:id" element={<AnimeDetails/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;


