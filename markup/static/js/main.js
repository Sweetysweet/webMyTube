'use strict';

/* *** --- REMOVE JQUERY --- *** */
// import $ from 'jquery';
// import debug from 'components/debug/debug';
// import addSerializeObject from 'static/js/helpers/serializeObject';
// import addIsInViewPort from 'static/js/helpers/is-in-viewport';
/* *** --- REMOVE JQUERY --- *** */

import svgInject from 'static/js/helpers/svgInject';
import run from 'static/js/helpers/run';

import googleApi from 'components/main/googleApi.js';
import scriptYou from 'components/main/scriptYou.js';





// https://www.npmjs.com/package/smoothscroll-polyfill
// for safari
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

// ajax
import { HTTP } from 'static/js/helpers/http';
import { API_ROUTES_CALLBACK } from 'static/js/constants';


/* *** --- REMOVE JQUERY --- *** */
// debug();
// addIsInViewPort();
// addSerializeObject();
/* *** --- REMOVE JQUERY --- *** */

/* example run fn */
// run('selector', fn);


/* example smoothscroll */
/*
window.scroll({
  top: element.getBoundingClientRect().top + window.scrollY,
  left: 0,
  behavior: 'smooth'
});
*/

/* example HTTP */
/*
  HTTP.post(API_ROUTES_CALLBACK, {
    body: formData,
  }).then((response) => {
    // console.log(response);
  }).catch((error) => {
    // console.log(error);
  });
*/

svgInject();
