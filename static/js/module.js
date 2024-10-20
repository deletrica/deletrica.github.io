"use strict";

let dialog, domReady;

import share from './modules/share.js';
import vcard from './modules/vcard.js';
import banana from './modules/banana.js';
import qrcode from './modules/qrcode.js';
import social from './modules/social.js';
import profile from './modules/profile.js';
import comments from './modules/comments.js';

dialog = {
  openDial(el) {
    location.assign(`tel:${$('[data-dialog-btn="tel"]').data('phone-number')}`);
  },

  openShare() {
    share({
      url: location,
      text: profile.common_name + ' ' + $('[data-dialog-btn="tel"]').text(),
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
          action: () => qrcode.instance.download({ name: profile.common_name + ' ' + $('[data-dialog-btn="tel"]').text() })
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

  $('[data-btn-translate]').click(function(evt) {

    if (this.value !== $('html').attr('lang')) {
      $('html').attr('lang', this.value);
      updateUI(this.value);
    }
  });

  $('[data-dialog-btn]').click(function(evt) {
    evt.preventDefault();

    if (this.dataset.dialogBtn === 'tel') dialog.openDial(this);
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

function updateUI(locale) {
  let data, html, compile;

  locale = typeof locale === 'string' && locale.toLowerCase().trim();

  if (locale && locale !== 'pt-br' && banana.messageStore.sourceMap.has(locale)) {
    banana.setLocale(locale);

    data = Object.assign({}, banana.messageStore.sourceMap.get(locale));
    data.phone_number = `+55${data.phone_number}`;
    data.local_address += `, ${data.brazil}`;
    data.formatted_phone_number = `+55 ${data.formatted_phone_number}`;
  } else data = banana.messageStore.sourceMap.get('pt-br');

  html = $('[data-template-card]').html();
  compile = Handlebars.compile(html);

  $('[data-ui]').html(compile(data));

  qrcode(vcard({ fn: profile.common_name, tel: $('[data-dialog-btn="tel"]').data('phone-number') }))
    .getRawData().then(blob => {
      $(document.head).append($('<style></style>').append(`.qr-code { background-image: url("${URL.createObjectURL(blob)}"); }`));
      $(document.body).waitForImages(domReady);
    });
}

$(window).on('load', function(evt) {
  updateUI();
});