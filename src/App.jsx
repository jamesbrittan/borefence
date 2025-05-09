import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { themeVariants } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import Home from './pages/Home';
import Contact from './pages/Contact';

// Service Pages
import FencingPage from './pages/services/fencing';
import ShedsPage from './pages/services/sheds';
import GatesPage from './pages/services/gates';
import RailingPage from './pages/services/railings';
import TreeFellingPage from './pages/services/tree-felling';

function App() {
  const [currentTheme, setCurrentTheme] = useState('coastal');

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themeVariants[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);


  return (
    <ThemeProvider theme={themeVariants[currentTheme]}>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Service Routes */}

          {/* Fencing */}
          <Route path="/services/fencing" element={<FencingPage />} />
          {/* Railings */}
          <Route path="/services/railings" element={<RailingPage />} />
          {/* Gates */} 
          <Route path="/services/gates" element={<GatesPage />} />
          {/* Bespoke sheds */}
          <Route path="/services/sheds" element={<ShedsPage />} />
          {/* Tree Felling & Hedge Removal */}
          <Route path="/services/tree-felling" element={<TreeFellingPage />} />
          {/* Reviews */}
          {/* <Route path="/services/reviews" element={<ReviewsPage />} /> */}

        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
