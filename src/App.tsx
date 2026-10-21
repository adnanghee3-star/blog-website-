import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { BlogListPage } from './pages/BlogListPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { CategoriesOverviewPage } from './pages/CategoriesOverviewPage';
import { ToolsPage } from './pages/ToolsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { SeoAuditPage } from './pages/SeoAuditPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ARTICLES } from './data/articles';
import { CATEGORIES } from './data/categories';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Route matching logic
  const renderCurrentPage = () => {
    const path = currentPath.replace(/\/$/, '') || '/';

    // 1. Home
    if (path === '/') {
      return <HomePage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    // 2. Blog Archive
    if (path === '/blog') {
      return <BlogListPage onNavigate={navigate} />;
    }

    // 3. Article Detail (/blog/:slug)
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        return <ArticleDetailPage article={article} onNavigate={navigate} />;
      }
      return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    // 4. Categories Overview (/categories)
    if (path === '/categories') {
      return <CategoriesOverviewPage onNavigate={navigate} />;
    }

    // 5. Category Detail (/category/:slug)
    if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '');
      const category = CATEGORIES.find((c) => c.slug === slug);
      if (category) {
        return <CategoryPage category={category} onNavigate={navigate} />;
      }
      return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    // 6. Tools (/tools)
    if (path === '/tools') {
      return <ToolsPage onNavigate={navigate} />;
    }

    // 7. About (/about)
    if (path === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 8. Contact (/contact)
    if (path === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // 9. Legal Pages (/disclaimer, /privacy, /terms)
    if (path === '/disclaimer') {
      return <LegalPage initialTab="disclaimer" onNavigate={navigate} />;
    }
    if (path === '/privacy') {
      return <LegalPage initialTab="privacy" onNavigate={navigate} />;
    }
    if (path === '/terms') {
      return <LegalPage initialTab="terms" onNavigate={navigate} />;
    }

    // 10. SEO Matrix Audit Hub (/seo-matrix)
    if (path === '/seo-matrix') {
      return <SeoAuditPage onNavigate={navigate} />;
    }

    // 11. 404
    return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Global Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}
