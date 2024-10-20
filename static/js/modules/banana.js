import locales from './locales.js';

const banana = new Banana('pt-br', {
  wikilinks: true,
  finalFallback: 'pt-br'
});

banana.load(locales);
//banana.setLocale('en') //navigator.language.toLowerCase());

export default banana;