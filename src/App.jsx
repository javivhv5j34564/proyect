import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import { PrivacyPolicy, CookiesPolicy, TermsAndConditions, Contact } from './pages/LegalPages';
import ToolPage from './pages/ToolPage';
import { SubmitToolPage } from './pages/SubmitToolPage';
import About from './pages/About';
import SuccessPage from './pages/Success';
import BlogDetail from './pages/BlogDetail';
import NotFound from './pages/NotFound';
import { CookieBanner } from './components/CookieBanner';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';
import Blog from './pages/Blog';
import Guides from './pages/Guides';
import GuideDetail from './pages/GuideDetail';
import Glossary from './pages/Glossary';
import CommandPalette from './components/CommandPalette';
import CompareToolsPage from './pages/CompareToolsPage';
import SurprisePage from './pages/SurprisePage';
import ScrollToTop from './components/ScrollToTop';
import AIStackBuilder from './pages/AIStackBuilder';
import AutomationRisk from './pages/AutomationRisk';
import PromptsPage from './pages/PromptsPage';
import SocialMediaGrowth from './pages/SocialMediaGrowth';
import MatchMaker from './pages/MatchMaker';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tool/:id" element={<ToolPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guide/:id" element={<GuideDetail />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/submit-tool" element={<SubmitToolPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/compare" element={<CompareToolsPage />} />
          <Route path="/surprise" element={<SurprisePage />} />
          <Route path="/stack-builder" element={<AIStackBuilder />} />
          <Route path="/automation-risk" element={<AutomationRisk />} />
          <Route path="/matchmaker" element={<MatchMaker />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/viral" element={<SocialMediaGrowth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <CommandPalette />
      <CookieBanner />
      <Footer />
    </div>
  );
}

export default App;
