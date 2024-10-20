import locales from './locales.js';

const banana = new Banana('pt-br', {
  finalFallback: 'pt-br'
});

banana.load(locales);

export default banana;