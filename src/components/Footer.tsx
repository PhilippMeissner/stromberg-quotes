import {FunctionalComponent, h} from 'preact';
import {Link} from 'preact-router/match';

const Footer: FunctionalComponent = () => {
  return (
    <div className="flex flex-row flex-wrap justify-between md:justify-around items-center p-8 text-white">
      <Link activeClassName={'font-bold'} href="/">
        Startseite
      </Link>
      <Link activeClassName={'font-bold'} href="/impressum">
        Impressum
      </Link>
      <Link activeClassName={'font-bold'} href={'/datenschutz'}>
        Datenschutz
      </Link>
    </div>
  );
};

export default Footer;
