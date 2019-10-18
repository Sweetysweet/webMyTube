const names = require('./names.js');
const tags = require('./words.js');
const countries = require('./countries.js');
const cities = require('./cities.js');

const rand = {
  letter: function () {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);
  },
  boolean: function (param = 0.5) {
    return Math.random() >= param ? true : false;
  },
  img: function (data = {}) {
    const {
      width = 100,
      height = 100,
      randomId = Math.floor(Math.random() * 20),
      theme = false,
    } = data;

    return `https://loremflickr.com/${width}/${height}${theme ? `/${theme}` : '' }/?lock=${randomId}`;
  },
  color: function () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  },
  name: function (data = {}) {
    const {
      id = Math.floor(Math.random() * names.length)
    } = data;
    return names[id];
  },
  tag: function (data = {}) {
    const {
      id = Math.floor(Math.random() * tags.length)
    } = data;
    return tags[id];
  },
  country: function (data = {}) {
    const {
      id = Math.floor(Math.random() * countries.length)
    } = data;
    return countries[id];
  },
  city: function (data = {}) {
    const {
      id = Math.floor(Math.random() * cities.length)
    } = data;
    return cities[id];
  },
};

module.exports = rand;
