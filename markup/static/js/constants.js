export const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*'
};



export const MEDIA = {
  DESKTOP: window.matchMedia('screen and (min-width: 1025px)').matches,
  MOBILE: window.matchMedia('screen and (max-width: 767px)').matches,
  TABLET: window.matchMedia('screen and (min-width: 768px) and (max-width: 1023px)').matches,
  XL: window.matchMedia('screen and (min-width: 1920px)').matches
};



export const {
  api: {
    root: API_ROOT = 'http://127.0.0.1:3000/',
    csfr: CSFR_TOKEN = '',
    routes: {
      callback: API_ROUTES_CALLBACK = 'callback', // default
    } = {}
  } = {},
  svg: {
    root: IMG_ROOT = '/static/img/',
    filename: SVG_FILENAME = 'svg-symbols.svg',
    revision: SVG_REVISION = Math.floor(Math.random() * (20)),
  } = {},

  arrayFormat: ARRAY_FORMAT = 'repeat',

} = window.config || {};
