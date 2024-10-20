"use strict";

let dialog, domReady;

import share from './modules/share.js';
import vcard from './modules/vcard.js';
import banana from './modules/banana.js';
import qrcode from './modules/qrcode.js';
import social from './modules/social.js';
import profile from './modules/profile.js';
import comments from './modules/comments.js';

qrcode.instance = qrcode(vcard({ fn: profile.common_name, tel: profile.phone_number }));
dialog = {
  openDial() {
    location.assign(`tel:${profile.phone_number}`);
  },

  openShare() {
    share({
      url: location,
      text: profile.common_name + ' ' + profile.formatted_phone_number,
      title: profile.common_name
    });
  },

  openVCard() {
    $.dialog({
      title: false,
      content: $('[data-template-qrcode]').html(),
      buttons: {
        download: {
          btnClass: 'text-bg-goldenrod',
          action: () => qrcode.instance.download({ name: profile.common_name + ' ' + profile.formatted_phone_number })
        },

        ok: { btnClass: 'text-bg-goldenrod' }
      },

      backgroundDismiss: true
    })
  },

  openSocial(label) {
    if (navigator.isMobile()) location.assign(social[label].app_chat);
    else location.assign(social[label].web_chat);
  }
};

domReady = () => {
  if (share.support) $('[data-dialog-btn="share"]').parent().removeAttr('hidden');

  $('[data-dialog-btn]').click(function(evt) {
    evt.preventDefault();

    if (this.dataset.dialogBtn === 'tel') dialog.openDial();
    else if (this.dataset.dialogBtn === 'share') dialog.openShare();
    else if (this.dataset.dialogBtn === 'qrcode') dialog.openVCard();
    else if (/^(telegram|whatsapp)$/.test(this.dataset.dialogBtn)) dialog.openSocial(this.dataset.dialogBtn);
  });

  $('[data-btn="load-comments"]').click(function(evt) {
    $(this).fadeOut(undefined, function(evt) {
      $(this).parent().html(banana.i18n('loading_comments'));
      comments.load();
    });
  });

  $('[data-page-splash]').fadeOut();
};

function updateUI() {
  const data = Object.assign(profile, banana.messageStore.sourceMap.get(banana.messageStore.sourceMap.has(banana.locale) ? banana.locale : banana.finalFallback));

  if (!['pt', 'pt-br'].includes(banana.localw)) data.local_address += ', ' + data.brazil;

  const html = $('[data-template-card]').html();
  const compile = Handlebars.compile(html);

  $('[data-ui]').html(compile(data));
}

$(window).on('load', function(evt) {
  qrcode.instance.getRawData().then(blob => {
    $(document.head).append($('<style></style>').append(`.qr-code { background-image: url("${URL.createObjectURL(blob)}"); }`));
    updateUI();
    $(document.body).waitForImages(domReady);
  });
});