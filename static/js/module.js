"use strict";

import share from './modules/share.js';
import vcard from './modules/vcard.js';
import qrcode from './modules/qrcode.js';
import Profile from './modules/profile.js';


let style, blobURL, domContentLoaded;
const dialog = {
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

$(window).on('load', function(evt) {
  style = document.createElement('style');
  qrcode.instance = qrcode(vcard({ fn: Profile.name, tel: Profile.tel }));
  domContentLoaded = () => {
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

  qrcode.instance.getRawData().then(blob => {
    blobURL = URL.createObjectURL(blob);
    style.innerHTML = `.qr-code { background-image: url("${blobURL}"); }`;

    $(document.head).append(style);
    $(document.body).prepend($('[data-template="profile"]').html())
      .waitForImages(domContentLoaded);
  });
});