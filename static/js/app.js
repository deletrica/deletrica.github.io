function dialogSocial(evt) {
  evt.preventDefault();

  if (this.id === 'btnSignal') location.assign('https://signal.me/#eu/JxNPlMl9PayTPSGVFeLg8bsCkhsuTH9Whom2DK7_Jm7lNsiufgdAx7xo6aY0C8W1');
  else if (this.id === 'btnTelegram') location.assign('https://t.me/deletric');
  else if (this.id === 'btnWhatsApp') location.assign('https://wa.me/message/NJFMCEDAZEMTN1');
}

$(window).on('load', () => {
  $('.social-link').click(dialogSocial);
  $(document.body).waitForImages(() => $(splashScreen).fadeOut());
});