import {FunctionalComponent, h} from 'preact';
import Router, {Route} from 'preact-router';
import {APP_ROUTES} from '../routes';
import Badge from './Badge';
import Footer from './Footer';
import Viewport from './Viewport';

const App: FunctionalComponent = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div id="preact_root" className={"overflow-hidden relative"}>
      {!isProduction && <Viewport />}
      <Badge />
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
