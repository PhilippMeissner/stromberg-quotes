import { FC, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import Badge from './Badge';
import Footer from './Footer';
import Viewport from './Viewport';
import { useEventListener, useScrollToTop } from '../hooks';
import { ArrowUpIcon } from '../icons';

const NAVIGATION_HEIGHT_PIXELS = 150;

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
      {!isProduction && <Viewport />}
      <Badge />
        <div className={`transition-all duration-500 ${scrollPos > NAVIGATION_HEIGHT_PIXELS ? 'opacity-100 animate-bounce-limited' : 'opacity-0'} fixed bottom-8 right-6 h-8 w-8 p-1 flex items-center justify-around text-white cursor-pointer border rounded-full`} onClick={scrollToTop}>
        <ArrowUpIcon />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
        <Routes>
          <Route path={`/${APP_ROUTES.home.routeSlug}`} element={<APP_ROUTES.home.component />} />
          <Route path={`/${APP_ROUTES.imprint.routeSlug}`} element={<APP_ROUTES.imprint.component />} />
          <Route path={`/${APP_ROUTES.gdpr.routeSlug}`} element={<APP_ROUTES.gdpr.component />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
