import { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import Badge from './Badge';
import Footer from './Footer';
import Viewport from './Viewport';

const NAVIGATION_HEIGHT_PIXELS = 150;

const App: FC = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const [scrollPos, setScrollPos] = useState(0);

  function onScroll(e: Event): void {
    const window = e.currentTarget as Window;
    setScrollPos(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return (): void => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div id="app_root" className={"overflow-hidden relative"}>
      {!isProduction && <Viewport />}
      <Badge />
        <div className={`transition-all duration-500 ${scrollPos > NAVIGATION_HEIGHT_PIXELS ? 'opacity-100 animate-bounce-limited' : 'opacity-0'} fixed bottom-8 right-6 h-8 w-8 p-1 flex items-center justify-around text-white cursor-pointer border rounded-full`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
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
