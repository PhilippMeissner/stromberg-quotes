import { FC, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import Badge from './Badge';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';
import Viewport from './Viewport';
import { useEventListener, useScrollToTop } from '../hooks';
import { LAYOUT } from '../constants';
import { ArrowUpIcon } from '../icons';

const App: FC = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const [scrollPos, setScrollPos] = useState(0);
  const scrollToTop = useScrollToTop();

  const handleScroll = useCallback((e: Event) => {
    const window = e.currentTarget as Window;
    setScrollPos(window.pageYOffset);
  }, []);

  useEventListener('scroll', handleScroll);

  return (
    <div id="app_root" className={"overflow-hidden relative"}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded"
      >
        Zum Hauptinhalt springen
      </a>
      {!isProduction && <Viewport />}
      <Badge />
      <button
        onClick={scrollToTop}
        aria-label="Nach oben scrollen"
        className={`transition-all duration-500 ${scrollPos > LAYOUT.SCROLL_NAV_HEIGHT_PIXELS ? 'opacity-100 animate-bounce-limited' : 'opacity-0 pointer-events-none'} fixed bottom-8 right-6 h-8 w-8 p-1 flex items-center justify-around text-white cursor-pointer border rounded-full`}
      >
        <ArrowUpIcon />
      </button>
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
        <ErrorBoundary>
          <Routes>
            <Route path={`/${APP_ROUTES.home.routeSlug}`} element={<APP_ROUTES.home.component />} />
            <Route path={`/${APP_ROUTES.imprint.routeSlug}`} element={<APP_ROUTES.imprint.component />} />
            <Route path={`/${APP_ROUTES.gdpr.routeSlug}`} element={<APP_ROUTES.gdpr.component />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </main>
    </div>
  );
};

export default App;
