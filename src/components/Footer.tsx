import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../routes';

const Footer: FC = memo(() => {
  return (
    <footer className="py-8 px-14 text-white">
      <nav aria-label="Hauptnavigation" className="flex flex-col sm:flex-row flex-wrap justify-between md:justify-around items-center gap-2">
        {Object.values(APP_ROUTES).map((route) => (
          <NavLink
            key={route.routeSlug}
            className={({ isActive }) => isActive ? 'font-bold' : ''}
            to={`/${route.routeSlug}`}
          >
            {route.label}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
});

export default Footer;
