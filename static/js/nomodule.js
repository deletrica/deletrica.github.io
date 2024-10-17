$(window).on('load', function(evt) {
  /*$.dialog({
    type: 'red',
    title: 'Your browser is out of date!',
    content: '<div class="text-secondary"><div>Your browser is not supported!</div><div>Update your browser to view this website correctly.</div></div>',
    closeIcon: false
  });*/

  if ('replace' in this.location) location.replace('/update.html');
  else this.location.href = '/update.html';
})