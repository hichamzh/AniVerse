import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Cgu from './pages/Cgu';
import Favoris from './pages/Favoris';
import { AnimeDetails } from './components/layouts/AnimeDetails';
import { NotFound } from './components/layouts/NotFound';
import ScrollToTop from './components/layouts/ScrollToTop';
import { FavoritesProvider } from './hooks/useFavorites';
import Catalogue from './pages/Catalogue';

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie" element={<Catalogue/>} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cgu" element={<Cgu />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </FavoritesProvider>
  );
};

export default App;


