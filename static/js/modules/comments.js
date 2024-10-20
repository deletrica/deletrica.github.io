const doc = document;
const script = doc.createElement('script');
const username = 'deletrica';
const loadComments = cb => {
  if (!loadComments.loaded) {
    loadComments.loaded = true;

    $(script)
      .appendTo(doc.head || doc.body)
      .attr('data-timestamp', +new Date())
      .attr('src', `//${username}.disqus.com/embed.js`)
      .on('load', function() {
        alert()
        loadComments.loaded = true;
        $(this).off(), cb();
      })

  }
};

export default loadComments;