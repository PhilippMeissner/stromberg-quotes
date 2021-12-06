import {FunctionalComponent, h} from 'preact';
import Router, {Route} from 'preact-router';
import Badge from './Badge';
import Footer from './Footer';
import Gdpr from './Gdpr';
import Imprint from './Imprint';
import Quote from './Quote';
import Viewport from './Viewport';

const App: FunctionalComponent = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div id="preact_root" className={"overflow-hidden relative"}>
      {!isProduction && <Viewport/>}
      <Badge/>
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
        <Router>
          <Route path="/" component={Quote}/>
          <Route path="/impressum" component={Imprint}/>
          <Route path="/datenschutz" component={Gdpr}/>
        </Router>
        <Footer/>
      </div>
    </div>
  );
};

export default App;
