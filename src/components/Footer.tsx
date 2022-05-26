import {FunctionalComponent, h} from 'preact';
import {Link} from 'preact-router/match';
import {APP_ROUTES} from '../routes';

const Footer: FunctionalComponent = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-between md:justify-around items-center py-8 px-14 text-white">
      <Link activeClassName={'font-bold'} href={`/${APP_ROUTES.home.routeSlug}`}>
        {APP_ROUTES.home.label}
      </Link>
      <Link activeClassName={'font-bold'} href={`/${APP_ROUTES.imprint.routeSlug}`}>
        {APP_ROUTES.imprint.label}
      </Link>
      <Link activeClassName={'font-bold'} href={`/${APP_ROUTES.gdpr.routeSlug}`}>
        {APP_ROUTES.gdpr.label}
      </Link>
    </div>
  );
};

export default Footer;
