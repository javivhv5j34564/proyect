import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import { PrivacyPolicy, CookiesPolicy, LegalNotice, Contact } from './pages/LegalPages';
import ToolPage from './pages/ToolPage';
import { SubmitToolPage } from './pages/SubmitToolPage';
import About from './pages/About';
import { CookieBanner } from './components/CookieBanner';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/aviso-legal" element={<LegalNotice />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/herramienta/:id" element={<ToolPage />} />
          <Route path="/enviar-ia" element={<SubmitToolPage />} />
        </Routes>
      </div>
      <CookieBanner />
      <Footer />
    </div>
  );
}

export default App;
