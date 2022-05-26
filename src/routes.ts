import Gdpr from './components/Gdpr';
import Imprint from './components/Imprint';
import Quote from './components/Quote';

export const APP_ROUTES = {
  home: {
    routeSlug: '',
    component: Quote,
    label: 'Startseite',
  },
  imprint: {
    routeSlug: 'impressum',
    component: Imprint,
    label: 'Impressum',
  },
  gdpr: {
    routeSlug: 'datenschutz',
    component: Gdpr,
    label: 'Datenschutz',
  },
}
