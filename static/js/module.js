"use strict";

let dialog, domReady;

import share from './modules/share.js';
import vcard from './modules/vcard.js';
import qrcode from './modules/qrcode.js';
import Profile from './modules/profile.js';

qrcode.instance = qrcode(vcard({ fn: Profile.name, tel: Profile.tel }));
dialog = {
  openDial() {
    location.assign(`tel:${Profile.tel}`);
  },

  openShare() {
    share({
      url: location,
      text: Profile.name + ' ' + Profile.tel,
      title: Profile.name
    });
  },

  openVCard() {
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
  },

  openSocial(label) { location.assign(Profile.social[label]); }
};

domReady = () => {
  if (navigator.isMobile()) {
    Profile.social.whatsapp = 'whatsapp://' + (new URL(Profile.social.whatsapp)).pathname.slice(1);
    Profile.social.telegram = 'tg:resolve?domain=' + (new URL(Profile.social.telegram)).pathname.slice(1);
  }

  if (share.support) $('[data-btn="share"]').parent().removeAttr('hidden');

  $('[data-btn]').click(function(evt) {
    evt.preventDefault();
    if (this.dataset.btn === 'tel') dialog.openDial();
    else if (this.dataset.btn === 'share') dialog.openShare();
    else if (this.dataset.btn === 'qrcode') dialog.openVCard();
    else if (/^(telegram|whatsapp)$/.test(this.dataset.btn)) dialog.openSocial(this.dataset.btn);
  });

  $('[data-page-splash]').fadeOut();
};

$(window).on('load', function(evt) {
  $(document.body).prepend($('[data-template="profile"]').html());
  qrcode.instance.getRawData().then(blob => {
    $(document.head).append($('<style></style>').append(`.qr-code { background-image: url("${URL.createObjectURL(blob)}"); }`));
    $(document.body).waitForImages(domReady);
  });
});