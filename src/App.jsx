import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { themeVariants } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Service Pages
import FencingPage from './pages/services/fencing';
import TreeFellingPage from './pages/services/tree-felling';
import ShedsPage from './pages/services/sheds';
import WallsPage from './pages/services/walls';
import PatiosPage from './pages/services/patios';

function App() {
  const [currentTheme, setCurrentTheme] = useState('coastal');

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themeVariants[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
    localStorage.setItem('theme', themeKey);
  };

  return (
    <ThemeProvider theme={themeVariants[currentTheme]}>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Service Routes */}
          <Route path="/services/fencing" element={<FencingPage />} />
          <Route path="/services/tree-felling" element={<TreeFellingPage />} />
          <Route path="/services/sheds" element={<ShedsPage />} />
          <Route path="/services/walls" element={<WallsPage />} />
          <Route path="/services/patios" element={<PatiosPage />} />
        </Routes>
        <Footer />
        <ThemeSwitcher 
          onThemeChange={handleThemeChange} 
          currentTheme={currentTheme}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
