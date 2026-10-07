import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SkipLink from './components/SkipLink';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Service from './pages/Service';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <SkipLink />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:slug" element={<Service />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
