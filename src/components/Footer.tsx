import {FunctionalComponent, h} from 'preact';
import {Link} from 'preact-router/match';

const Footer: FunctionalComponent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center py-8 text-white">
      <Link activeClassName={"font-bold"} href="/">
        Startseite
      </Link>
      <Link activeClassName={"font-bold"} href="/imprint">
        Impressum
      </Link>
      <Link activeClassName={"font-bold"} href={'/gdpr'}>
        Datenschutz
      </Link>
    </div>
  );
};

export default Footer;
