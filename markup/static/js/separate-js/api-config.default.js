window.config = window.config || {};

/** https://github.com/ljharb/qs query string parsing format */
/**  'indices' -> 'a[0]=b&a[1]=c' */
/**  'brackets' -> 'a[]=b&a[]=c' */
/**  'repeat' -> ''a=b&a=c' */

// window.config.arrayFormat = 'repeat';

/* api urls */

window.config.api = {
  root: '/api/',
  csfr: window.csfrToken || '',
  limit: 20,
  routes: {
    callback: 'callback' // kinda defaults
  }
};

window.config.svg = {
  root: '/static/img/',
  filename: 'svg-symbols.svg',
  revision: window.svgRevision || Math.floor(Math.random() * (20)),
};

window.config.arrayFormat = 'repeat';
