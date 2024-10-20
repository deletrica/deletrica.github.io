import locales from './locales.js';

const banana = new Banana('pt-br', {
  finalFallback: 'pt-br'
});

banana.load(locales);
banana.setLocale('en');

export default banana;