import {FunctionalComponent, h} from 'preact';
import Quote from './Quote';
import Viewport from './Viewport';

const App: FunctionalComponent = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div id="preact_root">
      {!isProduction && <Viewport/>}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900">
        <Quote/>
      </div>
    </div>
  );
};

export default App;
