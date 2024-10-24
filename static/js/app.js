function dialogSocial(evt) {
  evt.preventDefault();

  if (this.id === 'btnTelegram') location.assign('https://t.me/deletric');
  else if (this.id === 'btnWhatsApp') location.assign('https://wa.me/message/NJFMCEDAZEMTN1');
}

$(window).on('load', () => {
  $('.social-link').click(dialogSocial);
  $(document.body).waitForImages(() => $(splashScreen).fadeOut());
});