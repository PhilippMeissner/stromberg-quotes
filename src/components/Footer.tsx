import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../routes';

const Footer: FC = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-between md:justify-around items-center gap-2 py-8 px-14 text-white">
      <NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to={`/${APP_ROUTES.home.routeSlug}`}>
        {APP_ROUTES.home.label}
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to={`/${APP_ROUTES.imprint.routeSlug}`}>
        {APP_ROUTES.imprint.label}
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? 'font-bold' : ''} to={`/${APP_ROUTES.gdpr.routeSlug}`}>
        {APP_ROUTES.gdpr.label}
      </NavLink>
    </div>
  );
};

export default Footer;
