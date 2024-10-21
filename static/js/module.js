import share from './modules/share.js';
import vcard from './modules/vcard.js';
import banana from './modules/banana.js';
import qrcode from './modules/qrcode.js';
import social from './modules/social.js';
import profile from './modules/profile.js';
import comments from './modules/comments.js';

const dialog = {
  openDial(el) {
    location.assign(`tel:${updateUI.data.phone_number}`);
  },

  openShare() {
    share({
      url: location,
      text: `${profile.common_name} ${updateUI.data.formatted_phone_number}`,
      title: profile.common_name
    });
  },

  openVCard() {
    $.dialog({
      title: false,
      content: dialog.qrcodeTemplate,
      backgroundDismiss: true
    })
  },

  openSocial(label) {
    if (navigator.isMobile()) location.assign(social[label].app_chat);
    else location.assign(social[label].web_chat);
  }
};

const domReady = () => {
  $('[data-btn-translate]').click(function(evt) {
    if (this.value !== $('html').attr('lang')) {
      $('html').attr('lang', this.value), updateUI(this.value);
    }
  });

  $('[data-dialog-btn]').click(function(evt) {
    evt.preventDefault();

    if (this.dataset.dialogBtn === 'tel') dialog.openDial(this);
    else if (this.dataset.dialogBtn === 'share') dialog.openShare();
    else if (this.dataset.dialogBtn === 'qrcode') dialog.openVCard();
    else if (/^(telegram|whatsapp)$/.test(this.dataset.dialogBtn)) dialog.openSocial(this.dataset.dialogBtn);
  });

  $('[data-page-splash]').fadeOut();
};

function updateUI(locale) {
  let compile, template, data = banana.messageStore.sourceMap.get('pt-br');

  locale = typeof locale === 'string' && locale.toLowerCase().trim();

  if (locale && locale !== 'pt-br' && banana.messageStore.sourceMap.has(locale)) {
    banana.setLocale(locale);

    data = Object.assign({}, banana.messageStore.sourceMap.get(locale));
    data.phone_number = data.int_phone_number;
    data.local_address = data.int_local_address;
    data.formatted_phone_number = data.int_formatted_phone_number;
  }

  updateUI.data = data;
  document.title = `${data.common_name} — ${data.summary_message}`;
  template = $('[data-template-card]').html();
  compile = Handlebars.compile(template);
  template = compile(data);

  $('#qrCodeStyle').remove();
  $('[data-ui] div').remove();
  $('[data-ui]').html(template);

  dialog.qrcodeTemplate = $('[data-template-qrcode]').html();

  if (share.support) $('[data-ui]').find('[data-dialog-btn="share"]').parent().removeAttr('hidden');

  qrcode(vcard({ fn: profile.common_name, tel: data.phone_number }))
    .getRawData().then(blob => {
      $(document.head).append($('<style id="qrCodeStyle"></style>').append(`.qr-code { background-image: url("${URL.createObjectURL(blob)}"); }`));
      $(document.body).waitForImages(domReady);
    });
}

$(window).on('load', updateUI);