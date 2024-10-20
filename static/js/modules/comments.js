const doc = document;
const script = doc.createElement('script');

export default {
  load: () => {
    if ($('data-disqus-comments').length) $('data-disqus-comments').romove();

    $(script)
      .attr('data-disqus-comments', '')
      .attr('data-timestamp', +new Date())
      .attr('src', '//deletrica.disqus.com/embed.js')
      .appendTo(doc.head || doc.body);
  }
};