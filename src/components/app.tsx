import {FunctionalComponent, h} from 'preact';
import Router, {Route} from 'preact-router';
import {useEffect, useState} from 'preact/compat';
import {APP_ROUTES} from '../routes';
import Badge from './Badge';
import Footer from './Footer';
import Viewport from './Viewport';

const NAVIGATION_HEIGHT_PIXELS = 150;

type Coordination = {x: number; y: number};

const App: FunctionalComponent = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const [scrollPos, setScrollPos] = useState(0);
  const [mousePos, setMousePos] = useState<Coordination | null>(null);

  // TODO: Remove any
  const onScroll = (e: any): void => {
    const window = e.currentTarget;
    setScrollPos(window.pageYOffset);
  }

  // TODO: Remove any
  const onMouseMove = (e: any) => {
    setMousePos({x: e.pageX, y: e.pageY});
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove',  onMouseMove);

    return (): void => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove',  onMouseMove);
    };
  }, []);

  const mouseCursorStyle = {
    left: `${mousePos?.x}px`,
    top: `${mousePos?.y}px`,
  }

  return (
    <div id="preact_root" className={"overflow-hidden relative"}>
      <div
        class="absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 filter blur-[60px] opacity-100 transition-opacity duration-300 w-20 h-20 bg-[rgb(81,49,141)]"
        style={mouseCursorStyle} />
      {!isProduction && <Viewport />}
      <Badge />
      <div
        className={`transition-all duration-500 ${scrollPos > NAVIGATION_HEIGHT_PIXELS ? 'opacity-100 animate-bounce-limited' : 'opacity-0'} fixed bottom-8 right-6 h-8 w-8 p-1 flex items-center justify-around text-white cursor-pointer border rounded-full`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
        <Router>
          <Route path={`/${APP_ROUTES.home.routeSlug}`} component={APP_ROUTES.home.component} />
          <Route path={`/${APP_ROUTES.imprint.routeSlug}`} component={APP_ROUTES.imprint.component} />
          <Route path={`/${APP_ROUTES.gdpr.routeSlug}`} component={APP_ROUTES.gdpr.component} />
        </Router>
        <Footer />
      </div>
    </div>
  );
};

export default App;
