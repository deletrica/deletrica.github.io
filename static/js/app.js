function dialogSocial(evt) {
  evt.preventDefault();

  if (this.title === 'Telegram') location.assign('https://t.me/deletric');
  else if (this.title === 'WhatsApp') location.assign('https://wa.me/message/NJFMCEDAZEMTN1');
}

$(window).on('load', () => {
  $('.social-link').click(dialogSocial);
  $(document.body).waitForImages(() => $(splashScreen).fadeOut());
});