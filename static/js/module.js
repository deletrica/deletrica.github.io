"use strict";

import share from './modules/share.js';
import vcard from './modules/vcard.js';
import qrcode from './modules/qrcode.js';
import Profile from './modules/profile.js';

function openDial() {
  location.assign(`tel:${Profile.tel}`);
}

function openShare() {
  share({
    url: location,
    text: Profile.name + ' ' + Profile.tel,
    title: Profile.name
  });
}

function openVCard() {
  $.dialog({
    title: false,
    content: $('[data-template="qrcode"]').html(),
    buttons: {
      download: {
        btnClass: 'text-bg-goldenrod',
        action: () => qrcode.instance.download({ name: Profile.name + ' ' + Profile.tel })
      },

      ok: { btnClass: 'text-bg-goldenrod' }
    },

    backgroundDismiss: true
  })
}

function openSocial(label) { location.assign(Profile.social[label]); }

$(window).on('load', function(evt) {
  qrcode.instance = qrcode(vcard({ fn: Profile.name, tel: Profile.tel }));

  if (share.support) $('[data-btn="share"]').removeAttr('hidden');
  $('[data-btn]').click(function(evt) {
    evt.preventDefault();
    if (this.dataset.btn === 'tel') openDial();
    else if (this.dataset.btn === 'share') openShare();
    else if (this.dataset.btn === 'qrcode') openVCard();
    else if (/^(telegram|whatsapp)$/.test(this.dataset.btn)) openSocial(this.dataset.btn);
  });

  $(document.body).waitForImages(function() {
    qrcode.instance.getRawData()
      .then(blob => {
        $('<img/>').on('load error', function(evt) {
          $($('[data-template="qrcode"]')[0].content).find('[data-bg="qrcode"]').css('background-image', `url("${this.src}")`);
          $('[data-splash]').fadeOut();
        }).attr('src', URL.createObjectURL(blob));
      })
  });
});