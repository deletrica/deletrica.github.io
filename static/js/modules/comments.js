const doc = document;
const script = doc.createElement('script');

export default {
  load: () => {
    script.src = '//deletrica.disqus.com/embed.js';

    script.setAttribute('data-timestamp', +new Date());
    (doc.head || doc.body).appendChild(script);
  }
};