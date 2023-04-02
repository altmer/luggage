// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix_html';

import axios from 'axios';
import { I18n } from 'react-i18nify';

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import EN from './config/locales/en';
import RU from './config/locales/ru';
import DE from './config/locales/de';

import renderApp from './ReactApp';

I18n.loadTranslations({ en: EN, ru: RU, de: DE });

axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('phoenixAuthToken'); // eslint-disable-line no-param-reassign
  config.headers['X-Locale'] = localStorage.getItem('luggageSessionLocale') || 'en'; // eslint-disable-line no-param-reassign
  return config;
});

renderApp();
